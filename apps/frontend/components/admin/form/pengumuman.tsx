"use client";

import type { UseFormReturn } from "react-hook-form";

import {
  AdminCheckboxField,
  AdminSelectField,
  AdminTextareaField,
  AdminTextField,
} from "@/components/admin/admin-field";

import type { Pengumuman } from "@/types/school";
import type { PengumumanFormValues } from "@/validation/pengumuman.schema";
import { adminUi } from "@/components/ui/class.-wrapper";

type PengumumanFormProps = {
  form: UseFormReturn<PengumumanFormValues>;
  editingPengumuman: Pengumuman | null;
  isSubmitting: boolean;
  message: string;
  onSubmit: (values: PengumumanFormValues) => void;
  onCancelEdit: () => void;
};

export function PengumumanForm({
  form,
  editingPengumuman,
  isSubmitting,
  message,
  onSubmit,
  onCancelEdit,
}: PengumumanFormProps) {
  const { register, formState } = form;

  return (
    <div className={`${adminUi.card} p-6`}>
      <div className={adminUi.cardHeader}>
        <div>
          <h2 className={adminUi.title}>
            {editingPengumuman ? "Edit Pengumuman" : "Tambah Pengumuman"}
          </h2>
          <p className={adminUi.description}>Akses: ADMIN / EDITOR</p>
        </div>

        <span className={adminUi.plusIcon}>+</span>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <AdminTextField
          name="title"
          label="Judul Pengumuman"
          register={register}
          errors={formState.errors}
        />

        <AdminTextField
          name="slug"
          label="Slug"
          placeholder="pendaftaran-ppdb-dibuka"
          register={register}
          errors={formState.errors}
        />

        <AdminTextareaField
          name="content"
          label="Isi Pengumuman"
          rows={5}
          register={register}
          errors={formState.errors}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <AdminTextField
            name="attachmentUrl"
            label="Lampiran"
            placeholder="/uploads/file.pdf"
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

        <AdminCheckboxField
          name="isImportant"
          label="Pengumuman penting"
          register={register}
        />

        {message ? <div className={adminUi.message}>{message}</div> : null}

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className={adminUi.primaryButton}
          >
            {isSubmitting
              ? "Menyimpan..."
              : editingPengumuman
                ? "Update Pengumuman"
                : "Simpan Pengumuman"}
          </button>

          {editingPengumuman ? (
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