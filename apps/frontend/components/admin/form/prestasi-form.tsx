"use client";

import type { UseFormReturn } from "react-hook-form";

import {
  AdminDateTimeField,
  AdminSelectField,
  AdminTextareaField,
  AdminTextField,
} from "@/components/admin/admin-field";

import type { Prestasi } from "@/types/school";
import type { PrestasiFormValues } from "@/validation/prestasi.schema";
import { adminUi } from "@/components/ui/class.-wrapper";

type PrestasiFormProps = {
  form: UseFormReturn<PrestasiFormValues>;
  editingPrestasi: Prestasi | null;
  isSubmitting: boolean;
  message: string;
  onSubmit: (values: PrestasiFormValues) => void;
  onCancelEdit: () => void;
};

export function PrestasiForm({
  form,
  editingPrestasi,
  isSubmitting,
  message,
  onSubmit,
  onCancelEdit,
}: PrestasiFormProps) {
  const { register, formState } = form;

  return (
    <div className={`${adminUi.card} ${adminUi.cardPadding}`}>
      <div className={adminUi.cardHeader}>
        <div>
          <h2 className={adminUi.title}>
            {editingPrestasi ? "Edit Prestasi" : "Tambah Prestasi"}
          </h2>
          <p className={adminUi.description}>Akses: ADMIN / EDITOR</p>
        </div>

        <span className={adminUi.plusIcon}>+</span>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <AdminTextField
          name="title"
          label="Judul Prestasi"
          register={register}
          errors={formState.errors}
        />

        <AdminTextField
          name="slug"
          label="Slug"
          placeholder="juara-lomba-web-design"
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
            name="winner"
            label="Pemenang"
            register={register}
            errors={formState.errors}
          />

          <AdminTextField
            name="level"
            label="Tingkat"
            register={register}
            errors={formState.errors}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <AdminTextField
            name="imageUrl"
            label="URL Gambar"
            placeholder="/uploads/prestasi.jpg"
            register={register}
            errors={formState.errors}
          />

          <AdminDateTimeField
            name="achievementDate"
            label="Tanggal"
            register={register}
            errors={formState.errors}
          />
        </div>

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

        {message ? <div className={adminUi.message}>{message}</div> : null}

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className={adminUi.primaryButton}
          >
            {isSubmitting
              ? "Menyimpan..."
              : editingPrestasi
                ? "Update Prestasi"
                : "Simpan Prestasi"}
          </button>

          {editingPrestasi ? (
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
