"use client";

import type { UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adminUi } from "../../ui/class.-wrapper";
import type { SettingsFormValues } from "@/validation/settings.schema";

type SettingsFormProps = {
  form: UseFormReturn<SettingsFormValues>;
  isSubmitting: boolean;
  onSubmit: (values: SettingsFormValues) => void;
};

export function SettingsForm({
  form,
  isSubmitting,
  onSubmit,
}: SettingsFormProps) {
  const errors = form.formState.errors;

  return (
    <section
      className={`rounded-2xl border border-border bg-card text-card-foreground shadow-sm ${adminUi.cardPadding}`}
    >
      <div className="mb-6">
        <p className="text-sm font-semibold text-primary">Website Settings</p>

        <h2 className="section-title">Pengaturan Website</h2>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Data ini dipakai untuk header, mobile menu, kontak, dan informasi
          sekolah di halaman public.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
        <div className="grid gap-2">
          <label htmlFor="school_name" className="text-sm font-bold">
            Nama Sekolah
          </label>

          <Input
            id="school_name"
            placeholder="Contoh: SMK Nusantara Digital"
            disabled={isSubmitting}
            {...form.register("school_name")}
          />

          {errors.school_name ? (
            <p className="text-sm text-destructive">
              {errors.school_name.message}
            </p>
          ) : null}
        </div>

        <div className="grid gap-2">
          <label htmlFor="school_tagline" className="text-sm font-bold">
            Tagline
          </label>

          <Input
            id="school_tagline"
            placeholder="Contoh: Berkarakter, Berprestasi, Berwawasan Digital"
            disabled={isSubmitting}
            {...form.register("school_tagline")}
          />

          {errors.school_tagline ? (
            <p className="text-sm text-destructive">
              {errors.school_tagline.message}
            </p>
          ) : null}
        </div>

        <div className="grid gap-2 md:grid-cols-2">
          <div className="grid gap-2">
            <label htmlFor="phone" className="text-sm font-bold">
              Nomor Telepon
            </label>

            <Input
              id="phone"
              placeholder="Contoh: (021) 1234-5678"
              disabled={isSubmitting}
              {...form.register("phone")}
            />

            {errors.phone ? (
              <p className="text-sm text-destructive">
                {errors.phone.message}
              </p>
            ) : null}
          </div>

          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-bold">
              Email
            </label>

            <Input
              id="email"
              type="email"
              placeholder="Contoh: info@smknusantara.sch.id"
              disabled={isSubmitting}
              {...form.register("email")}
            />

            {errors.email ? (
              <p className="text-sm text-destructive">
                {errors.email.message}
              </p>
            ) : null}
          </div>
        </div>

        <div className="grid gap-2">
          <label htmlFor="address" className="text-sm font-bold">
            Alamat
          </label>

          <Input
            id="address"
            placeholder="Contoh: Jl. Pendidikan No. 1"
            disabled={isSubmitting}
            {...form.register("address")}
          />

          {errors.address ? (
            <p className="text-sm text-destructive">
              {errors.address.message}
            </p>
          ) : null}
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-fit">
          {isSubmitting ? "Menyimpan..." : "Simpan Settings"}
        </Button>
      </form>
    </section>
  );
}