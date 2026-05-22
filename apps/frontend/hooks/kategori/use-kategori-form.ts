"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import type { Kategori, KategoriPayload } from "@/types/school";
import {
  kategoriDefaultValues,
  kategoriSchema,
  type KategoriFormValues,
} from "@/validation/kategori.schema";

import {
  useCreateKategoriMutation,
  useDeleteKategoriMutation,
  useUpdateKategoriMutation,
} from "./use-kategori-query";

function cleanPayload(values: KategoriFormValues): KategoriPayload {
  return {
    name: values.name,
    slug: values.slug || undefined,
    color: values.color || undefined,
    description: values.description || undefined,
  };
}

function toFormValues(data: Kategori): KategoriFormValues {
  return {
    name: data.name ?? "",
    slug: data.slug ?? "",
    color: data.color ?? "",
    description: data.description ?? "",
  };
}

export function useKategoriForm() {
  const [editingKategori, setEditingKategori] = useState<Kategori | null>(null);
  const [message, setMessage] = useState("");

  const createMutation = useCreateKategoriMutation();
  const updateMutation = useUpdateKategoriMutation();
  const deleteMutation = useDeleteKategoriMutation();

  const form = useForm<KategoriFormValues>({
    resolver: zodResolver(kategoriSchema),
    defaultValues: kategoriDefaultValues,
  });

  function handleSubmit(values: KategoriFormValues) {
    const payload = cleanPayload(values);

    if (editingKategori) {
      updateMutation.mutate(
        {
          id: editingKategori.id,
          payload,
        },
        {
          onSuccess: () => {
            form.reset(kategoriDefaultValues);
            setEditingKategori(null);
            setMessage("Kategori berhasil diperbarui.");
          },
          onError: (error) => {
            setMessage(
              error instanceof Error
                ? error.message
                : "Gagal memperbarui kategori.",
            );
          },
        },
      );

      return;
    }

    createMutation.mutate(payload, {
      onSuccess: () => {
        form.reset(kategoriDefaultValues);
        setEditingKategori(null);
        setMessage("Kategori berhasil ditambahkan.");
      },
      onError: (error) => {
        setMessage(
          error instanceof Error ? error.message : "Gagal menambahkan kategori.",
        );
      },
    });
  }

  function handleEdit(data: Kategori) {
    setEditingKategori(data);
    form.reset(toFormValues(data));
    setMessage("Mode edit kategori aktif.");
  }

  function handleCancelEdit() {
    setEditingKategori(null);
    form.reset(kategoriDefaultValues);
    setMessage("");
  }

  function handleDelete(id: string) {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        setMessage("Kategori berhasil dihapus.");

        if (editingKategori?.id === id) {
          setEditingKategori(null);
          form.reset(kategoriDefaultValues);
        }
      },
      onError: (error) => {
        setMessage(
          error instanceof Error ? error.message : "Gagal menghapus kategori.",
        );
      },
    });
  }

  return {
    form,
    editingKategori,
    message,

    isSubmitting: createMutation.isPending || updateMutation.isPending,
    isDeleting: deleteMutation.isPending,

    handleSubmit,
    handleEdit,
    handleCancelEdit,
    handleDelete,
  };
}