"use client";

import type { UseFormReturn } from "react-hook-form";

import {
  AdminDateTimeField,
  AdminSelectField,
  AdminTextareaField,
  AdminTextField,
} from "@/components/admin/admin-field";

import type { Agenda } from "@/types/school";
import type { AgendaFormValues } from "@/validation/agenda.schema";
import { adminUi } from "@/components/ui/class.-wrapper";

type AgendaFormProps = {
  form: UseFormReturn<AgendaFormValues>;
  editingAgenda: Agenda | null;
  isSubmitting: boolean;
  message: string;
  onSubmit: (values: AgendaFormValues) => void;
  onCancelEdit: () => void;
};

export function AgendaForm({
  form,
  editingAgenda,
  isSubmitting,
  message,
  onSubmit,
  onCancelEdit,
}: AgendaFormProps) {
  const { register, formState } = form;

  return (
    <div className={`${adminUi.card} ${adminUi.cardPadding}`}>
      <div className={adminUi.cardHeader}>
        <div>
          <h2 className={adminUi.title}>
            {editingAgenda ? "Edit Agenda" : "Tambah Agenda"}
          </h2>
          <p className={adminUi.description}>Akses: ADMIN / EDITOR</p>
        </div>

        <span className={adminUi.plusIcon}>+</span>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <AdminTextField
          name="title"
          label="Judul Agenda"
          register={register}
          errors={formState.errors}
        />

        <AdminTextField
          name="slug"
          label="Slug"
          placeholder="workshop-cyber-security"
          register={register}
          errors={formState.errors}
        />

        <AdminTextareaField
          name="description"
          label="Deskripsi"
          rows={5}
          register={register}
          errors={formState.errors}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <AdminTextField
            name="location"
            label="Lokasi"
            register={register}
            errors={formState.errors}
          />

          <AdminDateTimeField
            name="startDate"
            label="Tanggal Mulai"
            register={register}
            errors={formState.errors}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <AdminDateTimeField
            name="endDate"
            label="Tanggal Selesai"
            register={register}
            errors={formState.errors}
          />

          <AdminSelectField
            name="status"
            label="Status"
            register={register}
            errors={formState.errors}
            options={[
              { label: "Draft", value: "DRAFT" },
              { label: "Published", value: "PUBLISHED" },
            ]}
          />
        </div>

        {message ? <div className={adminUi.message}>{message}</div> : null}

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className={adminUi.primaryButton}
          >
            {isSubmitting
              ? "Menyimpan..."
              : editingAgenda
                ? "Update Agenda"
                : "Simpan Agenda"}
          </button>

          {editingAgenda ? (
            <button
              type="button"
              onClick={onCancelEdit}
              className={adminUi.secondaryButton}
            >
              Batal Edit
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}
