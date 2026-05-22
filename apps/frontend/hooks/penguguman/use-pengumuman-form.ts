"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import type { Pengumuman, PengumumanPayload } from "@/types/school";
import {
  pengumumanDefaultValues,
  pengumumanSchema,
  type PengumumanFormValues,
} from "@/validation/pengumuman.schema";
import { useCreatePengumumanMutation, useDeletePengumumanMutation, useUpdatePengumumanMutation } from "./use-pengumuman-query";
import { sweetAlert } from "@/components/alert/alert";



function cleanPayload(values: PengumumanFormValues): PengumumanPayload {
  return {
    title: values.title,
    content: values.content,
    status: values.status,
    slug: values.slug || undefined,
    attachmentUrl: values.attachmentUrl || undefined,
    isImportant: values.isImportant ?? false,
  };
}

function toFormValues(data: Pengumuman): PengumumanFormValues {
  return {
    title: data.title ?? "",
    slug: data.slug ?? "",
    content: data.content ?? "",
    attachmentUrl: data.attachmentUrl ?? "",
    status: data.status ?? "DRAFT",
    isImportant: data.isImportant ?? false,
  };
}

export function usePengumumanForm() {
  const [editingPengumuman, setEditingPengumuman] =
    useState<Pengumuman | null>(null);
  const [message, setMessage] = useState("");

  const createMutation = useCreatePengumumanMutation();
  const updateMutation = useUpdatePengumumanMutation();
  const deleteMutation = useDeletePengumumanMutation();

  const form = useForm<PengumumanFormValues>({
    resolver: zodResolver(pengumumanSchema),
    defaultValues: pengumumanDefaultValues,
  });

  function handleSubmit(values: PengumumanFormValues) {
    const payload = cleanPayload(values);

    if (editingPengumuman) {
      updateMutation.mutate(
        { id: editingPengumuman.id, payload },
        {
          onSuccess: () => {
            form.reset(pengumumanDefaultValues);
            setEditingPengumuman(null);
          },
        },
      );

      return;
    }

    createMutation.mutate(payload, {
      onSuccess: () => {
        form.reset(pengumumanDefaultValues);
      },
   
    });
  }

  function handleEdit(data: Pengumuman) {
    setEditingPengumuman(data);
    form.reset(toFormValues(data));
    setMessage("Mode edit pengumuman aktif.");
  }

  function handleCancelEdit() {
    setEditingPengumuman(null);
    form.reset(pengumumanDefaultValues);
  }

async function handleDelete(id: string) {
  const result = await sweetAlert.confirm({
    title: "Hapus pengumuman?",
    text: "Data pengumuman yang sudah dihapus tidak bisa dikembalikan.",
    confirmButtonText: "Ya, hapus",
    cancelButtonText: "Batal",
  });

  if (!result.isConfirmed) return;

  deleteMutation.mutate(id);
}

  return {
    form,
    editingPengumuman,
    message,
    isSubmitting: createMutation.isPending || updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    handleSubmit,
    handleEdit,
    handleCancelEdit,
    handleDelete,
  };
}