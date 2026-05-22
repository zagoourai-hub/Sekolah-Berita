"use client";

import type { UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import type { Organisasi } from "@/types/school";
import type { OrganisasiFormValues } from "@/validation/organisasi.schema";
import { adminUi } from "../../ui/class.-wrapper";
import Image from "next/image";
import { register } from "next/dist/next-devtools/userspace/pages/pages-dev-overlay-setup";
import { Label } from "@/components/ui/label";

type OrganisasiFormProps = {
    form: UseFormReturn<OrganisasiFormValues>;
    editingOrganisasi: Organisasi | null;
    isSubmitting: boolean;
    onSubmit: (values: OrganisasiFormValues) => void;
    onCancelEdit: () => void;
};

export function OrganisasiForm({
    form,
    editingOrganisasi,
    isSubmitting,
    onSubmit,
    onCancelEdit,
}: OrganisasiFormProps) {
    const errors = form.formState.errors;

    return (
        <section
            className={`rounded-2xl border border-border bg-card text-card-foreground shadow-sm ${adminUi.cardPadding}`}
        >
            <div className="mb-6">
                <p className="text-sm font-semibold text-primary">
                    {editingOrganisasi ? "Mode Edit" : "Tambah Data"}
                </p>

                <h2 className="section-title">
                    {editingOrganisasi ? "Edit Organisasi" : "Tambah Organisasi"}
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Kelola data struktur organisasi yang akan tampil di halaman website.
                </p>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
                <div className="grid gap-2">

                    <label htmlFor="name" className="text-sm font-bold">
                        Nama
                    </label>
                    <Input
                        id="name"
                        placeholder="Contoh: Budi Santoso"
                        disabled={isSubmitting}
                        {...form.register("name")}
                    />
                    {errors.name ? (
                        <p className="text-sm text-destructive">{errors.name.message}</p>
                    ) : null}
                </div>

                <div className="grid gap-2">
                    <label htmlFor="position" className="text-sm font-bold">
                        Jabatan
                    </label>
                    <Input
                        id="position"
                        placeholder="Contoh: Ketua OSIS, MURID,  GURU, dll"
                        disabled={isSubmitting}
                        {...form.register("position")}
                    />
                    {errors.position ? (
                        <p className="text-sm text-destructive">
                            {errors.position.message}
                        </p>
                    ) : null}
                </div>

                <label htmlFor="kelas" className="text-sm font-bold">
                    Kelas
                </label>

                <Input
                    id="kelas"
                    placeholder="Contoh: RPL 4, XI TKJ 1, XII MM 2"
                    disabled={isSubmitting}
                    {...form.register("kelas")}
                />

                {errors.kelas ? (
                    <p className="text-sm text-destructive">
                        {errors.kelas.message}
                    </p>
                ) : null}

                <div className="grid gap-2">
                    <label htmlFor="photo" className="text-sm font-bold">
                        Foto
                    </label>

                    <Input
                        id="photo"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        disabled={isSubmitting}
                        {...form.register("photo")}
                    />

                    {editingOrganisasi?.photoUrl ? (
                        <div className="mt-2 grid gap-2">
                            <p className="text-xs text-muted-foreground">
                                Foto lama akan tetap dipakai jika tidak upload foto baru.
                            </p>

                            <div className="size-20 overflow-hidden rounded-xl border border-border bg-muted">
                                <Image
                                    width={80}
                                    height={80}
                                    unoptimized
                                    src={editingOrganisasi.photoUrl}
                                    alt={editingOrganisasi.name}
                                    className="size-full object-cover"
                                />
                            </div>
                        </div>
                    ) : null}

                    {errors.photo ? (
                        <p className="text-sm text-destructive">
                            {String(errors.photo.message)}
                        </p>
                    ) : null}
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="photoUrl">Link Foto</Label>

                    <Input
                        id="photoUrl"
                        type="url"
                        placeholder="Contoh: https://example.com/foto.jpg"
                        {...form.register("photoUrl")}
                    />

                    <p className="text-xs text-muted-foreground">
                        Opsional. Isi link foto jika tidak ingin upload file dari komputer.
                    </p>

                    {errors.photoUrl && (
                        <p className="text-sm text-destructive">
                            {errors.photoUrl.message}
                        </p>
                    )}
                </div>

                <div className="grid gap-2">
                    <label htmlFor="sortOrder" className="text-sm font-bold">
                        Urutan
                    </label>

                    <Input
                        id="sortOrder"
                        type="number"
                        min={0}
                        placeholder="0"
                        disabled={isSubmitting}
                        {...form.register("sortOrder", {
                            valueAsNumber: true,
                        })}
                    />

                    {errors.sortOrder ? (
                        <p className="text-sm text-destructive">
                            {errors.sortOrder.message}
                        </p>
                    ) : null}
                </div>

                <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-background p-4">
                    <div>
                        <p className="text-sm font-bold">Status Aktif</p>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                            Jika aktif, data organisasi akan tampil di halaman public.
                        </p>
                    </div>

                    <Switch
                        checked={form.watch("isActive")}
                        disabled={isSubmitting}
                        onCheckedChange={(checked) => {
                            form.setValue("isActive", checked, {
                                shouldDirty: true,
                                shouldValidate: true,
                            });
                        }}
                    />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto"
                    >
                        {isSubmitting
                            ? "Menyimpan..."
                            : editingOrganisasi
                                ? "Update Organisasi"
                                : "Tambah Organisasi"}
                    </Button>

                    {editingOrganisasi ? (
                        <Button
                            type="button"
                            variant="outline"
                            disabled={isSubmitting}
                            onClick={onCancelEdit}
                            className="w-full sm:w-auto"
                        >
                            Batal Edit
                        </Button>
                    ) : null}
                </div>
            </form>
        </section>
    );
}
