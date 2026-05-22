"use client";

import { Edit, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { Organisasi } from "@/types/school";
import { adminUi } from "../../ui/class.-wrapper";
import Image from "next/image";


type OrganisasiListProps = {
  organisasiList: Organisasi[];
  isLoading: boolean;
  isDeleting: boolean;
  onEdit: (data: Organisasi) => void;
  onDelete: (id: string) => void;
};

export function OrganisasiList({
  organisasiList,
  isLoading,
  isDeleting,
  onEdit,
  onDelete,
}: OrganisasiListProps) {
  return (
    <section
      className={`rounded-2xl border border-border bg-card text-card-foreground shadow-sm ${adminUi.cardPadding}`}
    >
      <div className="mb-6">
        <p className="text-sm font-semibold text-primary">Data Admin</p>

        <h2 className="section-title">List Organisasi</h2>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Daftar anggota organisasi yang sudah tersimpan di database.
        </p>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">
          Memuat data organisasi...
        </p>
      ) : null}

      {!isLoading && organisasiList.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-background p-6 text-center">
          <p className="text-sm font-semibold">Belum ada data organisasi</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Tambahkan data organisasi pertama melalui form di sebelah kiri.
          </p>
        </div>
      ) : null}

      <div className="grid gap-4">
        {organisasiList.map((item) => (
          <article
            key={item.id}
            className="grid gap-4 rounded-2xl border border-border bg-background p-4 sm:grid-cols-[80px_1fr] xl:grid-cols-[80px_1fr_auto] xl:items-center"
          >
            <div className="size-20 overflow-hidden rounded-2xl border border-border bg-muted">
              {item.photoUrl ? (
                <Image
                  width={80}
                  height={80}
                  unoptimized
                  src={item.photoUrl}
                  alt={item.name}
                  className="size-full object-cover"
                />
              ) : (
                <div className="flex size-full items-center justify-center text-xs text-muted-foreground">
                  No Image
                </div>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="truncate text-base font-black">{item.name}</h3>

                <span
                  className={
                    item.isActive
                      ? "rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary"
                      : "rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground"
                  }
                >
                  {item.isActive ? "Aktif" : "Nonaktif"}
                </span>
              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                {item.position}
              </p>

              {item.kelas ? (
                <p className="mt-1 text-sm font-medium text-primary/80">
                  Kelas: {item.kelas}
                </p>
              ) : null}

              <p className="mt-2 text-xs text-muted-foreground">
                Urutan: {item.sortOrder}
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:col-span-2 sm:flex-row xl:col-span-1">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isDeleting}
                onClick={() => onEdit(item)}
                className="w-full sm:w-auto"
              >
                <Edit className="size-4" />
                Edit
              </Button>

              <Button
                type="button"
                variant="destructive"
                size="sm"
                disabled={isDeleting}
                onClick={() => onDelete(item.id)}
                className="w-full sm:w-auto"
              >
                <Trash2 className="size-4" />
                Hapus
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
