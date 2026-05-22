"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import type { Prestasi, PrestasiPayload } from "@/types/school";
import {
  prestasiDefaultValues,
  prestasiSchema,
  type PrestasiFormValues,
} from "@/validation/prestasi.schema";

import {
  useCreatePrestasiMutation,
  useDeletePrestasiMutation,
  useUpdatePrestasiMutation,
} from "./use-prestasi-query";

function cleanPayload(values: PrestasiFormValues): PrestasiPayload {
  return {
    title: values.title,
    status: values.status,

    slug: values.slug || undefined,
    description: values.description || undefined,
    winner: values.winner || undefined,
    level: values.level || undefined,
    imageUrl: values.imageUrl || undefined,
    achievementDate: values.achievementDate || undefined,
  };
}

function toFormValues(data: Prestasi): PrestasiFormValues {
  return {
    title: data.title ?? "",
    slug: data.slug ?? "",
    description: data.description ?? "",
    winner: data.winner ?? "",
    level: data.level ?? "",
    imageUrl: data.imageUrl ?? "",
    achievementDate: data.achievementDate ?? "",
    status: data.status ?? "PUBLISHED",
  };
}

export function usePrestasiForm() {
  const [editingPrestasi, setEditingPrestasi] = useState<Prestasi | null>(null);
  const [message, setMessage] = useState("");

  const createMutation = useCreatePrestasiMutation();
  const updateMutation = useUpdatePrestasiMutation();
  const deleteMutation = useDeletePrestasiMutation();

  const form = useForm<PrestasiFormValues>({
    resolver: zodResolver(prestasiSchema),
    defaultValues: prestasiDefaultValues,
  });

  function handleSubmit(values: PrestasiFormValues) {
    const payload = cleanPayload(values);

    if (editingPrestasi) {
      updateMutation.mutate(
        {
          id: editingPrestasi.id,
          payload,
        },
        {
          onSuccess: () => {
            form.reset(prestasiDefaultValues);
            setEditingPrestasi(null);
            setMessage("Prestasi berhasil diperbarui.");
          },
          onError: (error) => {
            setMessage(
              error instanceof Error
                ? error.message
                : "Gagal memperbarui prestasi.",
            );
          },
        },
      );

      return;
    }

    createMutation.mutate(payload, {
      onSuccess: () => {
        form.reset(prestasiDefaultValues);
        setEditingPrestasi(null);
        setMessage("Prestasi berhasil ditambahkan.");
      },
      onError: (error) => {
        setMessage(
          error instanceof Error
            ? error.message
            : "Gagal menambahkan prestasi.",
        );
      },
    });
  }

  function handleEdit(data: Prestasi) {
    setEditingPrestasi(data);
    form.reset(toFormValues(data));
    setMessage("Mode edit prestasi aktif.");
  }

  function handleCancelEdit() {
    setEditingPrestasi(null);
    form.reset(prestasiDefaultValues);
    setMessage("");
  }

  function handleDelete(id: string) {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        setMessage("Prestasi berhasil dihapus.");

        if (editingPrestasi?.id === id) {
          setEditingPrestasi(null);
          form.reset(prestasiDefaultValues);
        }
      },
      onError: (error) => {
        setMessage(
          error instanceof Error ? error.message : "Gagal menghapus prestasi.",
        );
      },
    });
  }

  return {
    form,
    editingPrestasi,
    message,

    isSubmitting: createMutation.isPending || updateMutation.isPending,
    isDeleting: deleteMutation.isPending,

    handleSubmit,
    handleEdit,
    handleCancelEdit,
    handleDelete,
  };
}