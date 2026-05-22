"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import type { Agenda, AgendaPayload } from "@/types/school";
import {
  agendaDefaultValues,
  agendaSchema,
  type AgendaFormValues,
} from "@/validation/agenda.schema";

import {
  useCreateAgendaMutation,
  useDeleteAgendaMutation,
  useUpdateAgendaMutation,
} from "./use-agenda-query";

function cleanPayload(values: AgendaFormValues): AgendaPayload {
  return {
    title: values.title,
    status: values.status,
    slug: values.slug || undefined,
    description: values.description || undefined,
    location: values.location || undefined,
    startDate: values.startDate || undefined,
    endDate: values.endDate || undefined,
  };
}

function toFormValues(data: Agenda): AgendaFormValues {
  return {
    title: data.title ?? "",
    slug: data.slug ?? "",
    description: data.description ?? "",
    location: data.location ?? "",
    startDate: data.startDate ?? "",
    endDate: data.endDate ?? "",
    status: data.status ?? "PUBLISHED",
  };
}

export function useAgendaForm() {
  const [editingAgenda, setEditingAgenda] = useState<Agenda | null>(null);
  const [message, setMessage] = useState("");

  const createMutation = useCreateAgendaMutation();
  const updateMutation = useUpdateAgendaMutation();
  const deleteMutation = useDeleteAgendaMutation();

  const form = useForm<AgendaFormValues>({
    resolver: zodResolver(agendaSchema),
    defaultValues: agendaDefaultValues,
  });

  function handleSubmit(values: AgendaFormValues) {
    const payload = cleanPayload(values);

    if (editingAgenda) {
      updateMutation.mutate(
        {
          id: editingAgenda.id,
          payload,
        },
        {
          onSuccess: () => {
            form.reset(agendaDefaultValues);
            setEditingAgenda(null);
            setMessage("Agenda berhasil diperbarui.");
          },
          onError: (error) => {
            setMessage(
              error instanceof Error
                ? error.message
                : "Gagal memperbarui agenda.",
            );
          },
        },
      );

      return;
    }

    createMutation.mutate(payload, {
      onSuccess: () => {
        form.reset(agendaDefaultValues);
        setEditingAgenda(null);
        setMessage("Agenda berhasil ditambahkan.");
      },
      onError: (error) => {
        setMessage(
          error instanceof Error ? error.message : "Gagal menambahkan agenda.",
        );
      },
    });
  }

  function handleEdit(data: Agenda) {
    setEditingAgenda(data);
    form.reset(toFormValues(data));
    setMessage("Mode edit agenda aktif.");
  }

  function handleCancelEdit() {
    setEditingAgenda(null);
    form.reset(agendaDefaultValues);
    setMessage("");
  }

  function handleDelete(id: string) {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        setMessage("Agenda berhasil dihapus.");

        if (editingAgenda?.id === id) {
          setEditingAgenda(null);
          form.reset(agendaDefaultValues);
        }
      },
      onError: (error) => {
        setMessage(
          error instanceof Error ? error.message : "Gagal menghapus agenda.",
        );
      },
    });
  }

  return {
    form,
    editingAgenda,
    message,

    isSubmitting: createMutation.isPending || updateMutation.isPending,
    isDeleting: deleteMutation.isPending,

    handleSubmit,
    handleEdit,
    handleCancelEdit,
    handleDelete,
  };
}