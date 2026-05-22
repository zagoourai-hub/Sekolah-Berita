"use client";

import type { UseFormReturn } from "react-hook-form";


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
  return (
    <div className={`${adminUi.card} ${adminUi.cardPadding}`}>
      <div className={adminUi.cardHeader}>
        <div>
          <h2 className={adminUi.title}>
            {editingPengumuman ? "Edit Pengumuman" : "Tambah Pengumuman"}
          </h2>
          <p className={adminUi.description}>Akses: ADMIN / EDITOR</p>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className={adminUi.label}>Judul Pengumuman</label>
          <input
            {...form.register("title")}
            placeholder="Judul pengumuman"
            className={adminUi.input}
          />

          {form.formState.errors.title?.message ? (
            <p className={adminUi.errorText}>
              {form.formState.errors.title.message}
            </p>
          ) : null}
        </div>

        <div>
          <label className={adminUi.label}>Isi Pengumuman</label>
          <textarea
            {...form.register("content")}
            rows={5}
            placeholder="Isi pengumuman"
            className={adminUi.textarea}
          />

          {form.formState.errors.content?.message ? (
            <p className={adminUi.errorText}>
              {form.formState.errors.content.message}
            </p>
          ) : null}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={adminUi.label}>Lampiran</label>
            <input
              {...form.register("attachmentUrl")}
              placeholder="/uploads/file.pdf"
              className={adminUi.input}
            />
          </div>

          <div>
            <label className={adminUi.label}>Status</label>
            <select {...form.register("status")} className={adminUi.select}>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>
          </div>
        </div>

        <label className={adminUi.checkboxWrapper}>
          <input
            type="checkbox"
            {...form.register("isImportant")}
            className="h-4 w-4 accent-primary"
          />
          <span className="text-sm font-semibold">Pengumuman penting</span>
        </label>

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
