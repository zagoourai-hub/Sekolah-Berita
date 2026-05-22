"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import type { Galeri, GaleriPayload } from "@/types/school";
import {
  galeriDefaultValues,
  galeriSchema,
  type GaleriFormValues,
} from "@/validation/galeri.schema";

import {
  useCreateGaleriMutation,
  useDeleteGaleriMutation,
  useUpdateGaleriMutation,
} from "./use-galeri-query";

function cleanPayload(values: GaleriFormValues): GaleriPayload {
  return {
    title: values.title,
    imageUrl: values.imageUrl,
    description: values.description || undefined,
  };
}

function toFormValues(data: Galeri): GaleriFormValues {
  return {
    title: data.title ?? "",
    imageUrl: data.imageUrl ?? "",
    description: data.description ?? "",
  };
}

export function useGaleriForm() {
  const [editingGaleri, setEditingGaleri] = useState<Galeri | null>(null);
  const [message, setMessage] = useState("");

  const createMutation = useCreateGaleriMutation();
  const updateMutation = useUpdateGaleriMutation();
  const deleteMutation = useDeleteGaleriMutation();

  const form = useForm<GaleriFormValues>({
    resolver: zodResolver(galeriSchema),
    defaultValues: galeriDefaultValues,
  });

  function handleSubmit(values: GaleriFormValues) {
    const payload = cleanPayload(values);

    if (editingGaleri) {
      updateMutation.mutate(
        { id: editingGaleri.id, payload },
        {
          onSuccess: () => {
            form.reset(galeriDefaultValues);
            setEditingGaleri(null);
            setMessage("Galeri berhasil diperbarui.");
          },
        },
      );

      return;
    }

    createMutation.mutate(payload, {
      onSuccess: () => {
        form.reset(galeriDefaultValues);
        setMessage("Galeri berhasil ditambahkan.");
      },
    });
  }

  function handleEdit(data: Galeri) {
    setEditingGaleri(data);
    form.reset(toFormValues(data));
    setMessage("Mode edit galeri aktif.");
  }

  function handleCancelEdit() {
    setEditingGaleri(null);
    form.reset(galeriDefaultValues);
    setMessage("");
  }

  function handleDelete(id: string) {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        setMessage("Galeri berhasil dihapus.");
      },
    });
  }

  return {
    form,
    editingGaleri,
    message,
    isSubmitting: createMutation.isPending || updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    handleSubmit,
    handleEdit,
    handleCancelEdit,
    handleDelete,
  };
}