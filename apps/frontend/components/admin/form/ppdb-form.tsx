"use client";

import type { UseFormReturn } from "react-hook-form";

import {
  AdminDateTimeField,
  AdminSelectField,
  AdminTextareaField,
  AdminTextField,
} from "@/components/admin/admin-field";
import type { Ppdb } from "@/types/school";
import type { PpdbFormValues } from "@/validation/ppdb.schema";
import { adminUi } from "@/components/ui/class.-wrapper";

type PpdbFormProps = {
  form: UseFormReturn<PpdbFormValues>;
  editingPpdb: Ppdb | null;
  isSubmitting: boolean;
  message: string;
  onSubmit: (values: PpdbFormValues) => void;
  onCancelEdit: () => void;
};

export function PpdbForm({
  form,
  editingPpdb,
  isSubmitting,
  message,
  onSubmit,
  onCancelEdit,
}: PpdbFormProps) {
  const { register, formState } = form;

  return (
    <div className={`${adminUi.card} ${adminUi.cardPadding}`}>
      <div className={adminUi.cardHeader}>
        <div>
          <h2 className={adminUi.title}>
            {editingPpdb ? "Edit PPDB" : "Tambah PPDB"}
          </h2>
          <p className={adminUi.description}>Akses: ADMIN / EDITOR</p>
        </div>

        <span className={adminUi.plusIcon}>+</span>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <AdminTextField
          name="title"
          label="Judul PPDB"
          register={register}
          errors={formState.errors}
        />

        <AdminTextField
          name="slug"
          label="Slug"
          placeholder="ppdb-online-smk"
          register={register}
          errors={formState.errors}
        />

        <AdminTextareaField
          name="content"
          label="Konten PPDB"
          rows={5}
          register={register}
          errors={formState.errors}
        />

        <AdminTextField
          name="bannerUrl"
          label="URL Banner"
          placeholder="/uploads/banner-ppdb.jpg"
          register={register}
          errors={formState.errors}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <AdminDateTimeField
            name="startDate"
            label="Tanggal Mulai"
            register={register}
            errors={formState.errors}
          />

          <AdminDateTimeField
            name="endDate"
            label="Tanggal Selesai"
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
              : editingPpdb
                ? "Update PPDB"
                : "Simpan PPDB"}
          </button>

          {editingPpdb ? (
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
