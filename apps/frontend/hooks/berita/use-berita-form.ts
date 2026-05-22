"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import type { Berita, BeritaPayload } from "@/types/school";
import {
  beritaDefaultValues,
  beritaSchema,
  type BeritaFormValues,
} from "@/validation/berita.schema";

import {
  useCreateBeritaMutation,
  useDeleteBeritaMutation,
  useUpdateBeritaMutation,
} from "./use-berita-query";

function cleanPayload(values: BeritaFormValues): BeritaPayload {
  return {
    title: values.title,
    content: values.content,
    status: values.status,

    slug: values.slug || undefined,
    summary: values.summary || undefined,
    thumbnailUrl: values.thumbnailUrl || undefined,
    category: values.category || undefined,

    isFeatured: values.isFeatured ?? false,
    isBreakingNews: values.isBreakingNews ?? false,
  };
}

function toFormValues(data: Berita): BeritaFormValues {
  return {
    title: data.title ?? "",
    slug: data.slug ?? "",
    summary: data.summary ?? "",
    content: data.content ?? "",
    thumbnailUrl: data.thumbnailUrl ?? "",
    category: data.category ?? "",
    status: data.status ?? "DRAFT",
    isFeatured: data.isFeatured ?? false,
    isBreakingNews: data.isBreakingNews ?? false,
  };
}

export function useBeritaForm() {
  const [editingBerita, setEditingBerita] = useState<Berita | null>(null);
  const [message, setMessage] = useState("");

  const createMutation = useCreateBeritaMutation();
  const updateMutation = useUpdateBeritaMutation();
  const deleteMutation = useDeleteBeritaMutation();

  const form = useForm<BeritaFormValues>({
    resolver: zodResolver(beritaSchema),
    defaultValues: beritaDefaultValues,
  });

  function handleSubmit(values: BeritaFormValues) {
    const payload = cleanPayload(values);

    if (editingBerita) {
      updateMutation.mutate(
        {
          id: editingBerita.id,
          payload,
        },
        {
          onSuccess: () => {
            form.reset(beritaDefaultValues);
            setEditingBerita(null);
            setMessage("Berita berhasil diperbarui.");
          },
          onError: (error) => {
            setMessage(
              error instanceof Error
                ? error.message
                : "Gagal memperbarui berita.",
            );
          },
        },
      );

      return;
    }

    createMutation.mutate(payload, {
      onSuccess: () => {
        form.reset(beritaDefaultValues);
        setEditingBerita(null);
        setMessage("Berita berhasil ditambahkan.");
      },
      onError: (error) => {
        setMessage(
          error instanceof Error ? error.message : "Gagal menambahkan berita.",
        );
      },
    });
  }

  function handleEdit(data: Berita) {
    setEditingBerita(data);
    form.reset(toFormValues(data));
    setMessage("Mode edit berita aktif.");
  }

  function handleCancelEdit() {
    setEditingBerita(null);
    form.reset(beritaDefaultValues);
    setMessage("");
  }

  function handleDelete(id: string) {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        setMessage("Berita berhasil dihapus.");

        if (editingBerita?.id === id) {
          setEditingBerita(null);
          form.reset(beritaDefaultValues);
        }
      },
      onError: (error) => {
        setMessage(
          error instanceof Error ? error.message : "Gagal menghapus berita.",
        );
      },
    });
  }

  return {
    form,
    editingBerita,
    message,

    isSubmitting: createMutation.isPending || updateMutation.isPending,
    isDeleting: deleteMutation.isPending,

    handleSubmit,
    handleEdit,
    handleCancelEdit,
    handleDelete,
  };
}