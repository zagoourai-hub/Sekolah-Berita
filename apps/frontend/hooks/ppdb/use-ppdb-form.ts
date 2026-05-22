"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import type { Ppdb, PpdbPayload } from "@/types/school";
import {
  ppdbDefaultValues,
  ppdbSchema,
  type PpdbFormValues,
} from "@/validation/ppdb.schema";

import {
  useCreatePpdbMutation,
  useDeletePpdbMutation,
  useUpdatePpdbMutation,
} from "./use-ppdb-query";

function cleanPayload(values: PpdbFormValues): PpdbPayload {
  return {
    title: values.title,
    content: values.content,
    status: values.status,

    slug: values.slug || undefined,
    bannerUrl: values.bannerUrl || undefined,
    startDate: values.startDate || undefined,
    endDate: values.endDate || undefined,
  };
}

function toFormValues(data: Ppdb): PpdbFormValues {
  return {
    title: data.title ?? "",
    slug: data.slug ?? "",
    content: data.content ?? "",
    bannerUrl: data.bannerUrl ?? "",
    startDate: data.startDate ?? "",
    endDate: data.endDate ?? "",
    status: data.status ?? "DRAFT",
  };
}

export function usePpdbForm() {
  const [editingPpdb, setEditingPpdb] = useState<Ppdb | null>(null);
  const [message, setMessage] = useState("");

  const createMutation = useCreatePpdbMutation();
  const updateMutation = useUpdatePpdbMutation();
  const deleteMutation = useDeletePpdbMutation();

  const form = useForm<PpdbFormValues>({
    resolver: zodResolver(ppdbSchema),
    defaultValues: ppdbDefaultValues,
  });

  function handleSubmit(values: PpdbFormValues) {
    const payload = cleanPayload(values);

    if (editingPpdb) {
      updateMutation.mutate(
        {
          id: editingPpdb.id,
          payload,
        },
        {
          onSuccess: () => {
            form.reset(ppdbDefaultValues);
            setEditingPpdb(null);
            setMessage("PPDB berhasil diperbarui.");
          },
          onError: (error) => {
            setMessage(
              error instanceof Error ? error.message : "Gagal memperbarui PPDB.",
            );
          },
        },
      );

      return;
    }

    createMutation.mutate(payload, {
      onSuccess: () => {
        form.reset(ppdbDefaultValues);
        setEditingPpdb(null);
        setMessage("PPDB berhasil ditambahkan.");
      },
      onError: (error) => {
        setMessage(
          error instanceof Error ? error.message : "Gagal menambahkan PPDB.",
        );
      },
    });
  }

  function handleEdit(data: Ppdb) {
    setEditingPpdb(data);
    form.reset(toFormValues(data));
    setMessage("Mode edit PPDB aktif.");
  }

  function handleCancelEdit() {
    setEditingPpdb(null);
    form.reset(ppdbDefaultValues);
    setMessage("");
  }

  function handleDelete(id: string) {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        setMessage("PPDB berhasil dihapus.");

        if (editingPpdb?.id === id) {
          setEditingPpdb(null);
          form.reset(ppdbDefaultValues);
        }
      },
      onError: (error) => {
        setMessage(
          error instanceof Error ? error.message : "Gagal menghapus PPDB.",
        );
      },
    });
  }

  return {
    form,
    editingPpdb,
    message,

    isSubmitting: createMutation.isPending || updateMutation.isPending,
    isDeleting: deleteMutation.isPending,

    handleSubmit,
    handleEdit,
    handleCancelEdit,
    handleDelete,
  };
}