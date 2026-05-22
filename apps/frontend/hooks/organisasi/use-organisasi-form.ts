"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  organisasiDefaultValues,
  organisasiSchema,
  type OrganisasiFormValues,
} from "@/validation/organisasi.schema";

import {
  useCreateOrganisasiMutation,
  useDeleteOrganisasiMutation,
  useUpdateOrganisasiMutation,
} from "./use-organisasi";

import {
  type CreateOrganisasiPayload,
  type Organisasi,
} from "@/types/school";

/**
 * Mengubah data dari React Hook Form menjadi payload frontend.
 *
 * Karena schema kamu:
 * photo: FileList | undefined
 *
 * Maka file diambil dari:
 * values.photo?.[0]
 */
function cleanPayload(values: OrganisasiFormValues): CreateOrganisasiPayload {
  const photo = values.photo?.[0];

  return {
    name: values.name,
    position: values.position,
    sortOrder: Number(values.sortOrder ?? 0),
    isActive: values.isActive ?? true,
    kelas: values.kelas?.trim() ? values.kelas.trim() : null,
    photo: photo instanceof File ? photo : null,
    photoUrl: values.photoUrl?.trim() ? values.photoUrl.trim() : null,
  };
}

/**
 * Mengubah data dari backend menjadi value form.
 * Dipakai saat klik edit.
 *
 * File input tidak bisa diisi otomatis dari photoUrl,
 * jadi photo tetap undefined.
 */
function toFormValues(data: Organisasi): OrganisasiFormValues {
  return {
    name: data.name ?? "",
    position: data.position ?? "",
    sortOrder: data.sortOrder ?? 0,
    kelas: data.kelas ?? "",
    isActive: data.isActive ?? true,
    photo: undefined,
    photoUrl: data.photoUrl?.startsWith("http") ? data.photoUrl : "",
  };
}

export function useOrganisasiForm() {
  const [editingOrganisasi, setEditingOrganisasi] =
    useState<Organisasi | null>(null);

  const createMutation = useCreateOrganisasiMutation();
  const updateMutation = useUpdateOrganisasiMutation();
  const deleteMutation = useDeleteOrganisasiMutation();

  const form = useForm<OrganisasiFormValues>({
    resolver: zodResolver(organisasiSchema),
    defaultValues: organisasiDefaultValues,
  });

  function handleSubmit(values: OrganisasiFormValues) {
    const payload = cleanPayload(values);

    if (editingOrganisasi) {
      updateMutation.mutate(
        {
          id: editingOrganisasi.id,
          payload,
        },
        {
          onSuccess: () => {
            form.reset(organisasiDefaultValues);
            setEditingOrganisasi(null);
          },
        },
      );

      return;
    }

    createMutation.mutate(payload, {
      onSuccess: () => {
        form.reset(organisasiDefaultValues);
        setEditingOrganisasi(null);
      },
    });
  }

  function handleEdit(data: Organisasi) {
    setEditingOrganisasi(data);
    form.reset(toFormValues(data));
  }

  function handleCancelEdit() {
    setEditingOrganisasi(null);
    form.reset(organisasiDefaultValues);
  }

  function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Yakin ingin menghapus data organisasi ini?",
    );

    if (!confirmed) return;

    deleteMutation.mutate(id, {
      onSuccess: () => {
        if (editingOrganisasi?.id === id) {
          setEditingOrganisasi(null);
          form.reset(organisasiDefaultValues);
        }
      },
    });
  }

  return {
    form,
    editingOrganisasi,

    isSubmitting: createMutation.isPending || updateMutation.isPending,
    isDeleting: deleteMutation.isPending,

    handleSubmit,
    handleEdit,
    handleCancelEdit,
    handleDelete,
  };
}