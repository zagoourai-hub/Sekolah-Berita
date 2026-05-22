"use client";

import { Edit, Settings, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { SettingItem } from "@/types/school";
import { adminUi } from "../../ui/class.-wrapper";

type SettingsListProps = {
  settingsList: SettingItem[];
  isLoading: boolean;
  isDeleting: boolean;
  onEdit: (data: SettingItem) => void;
  onDelete: (key: string) => void;
};

const settingLabels: Record<string, string> = {
  school_name: "Nama Sekolah",
  school_tagline: "Tagline Sekolah",
  phone: "Nomor Telepon",
  email: "Email",
  address: "Alamat",
};

function getSettingLabel(key: string) {
  return settingLabels[key] ?? key;
}

export function SettingsList({
  settingsList,
  isLoading,
  isDeleting,
  onEdit,
  onDelete,
}: SettingsListProps) {
  const safeSettingsList = Array.isArray(settingsList) ? settingsList : [];

  return (
    <section
      className={`rounded-2xl border border-border bg-card text-card-foreground shadow-sm ${adminUi.cardPadding}`}
    >
      <div className="mb-6">
        <p className="text-sm font-semibold text-primary">Data Settings</p>

        <h2 className="section-title">List Pengaturan</h2>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Daftar pengaturan website yang tersimpan di database.
        </p>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">
          Memuat data settings...
        </p>
      ) : null}

      {!isLoading && safeSettingsList.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-background p-6 text-center">
          <p className="text-sm font-semibold">Belum ada data settings</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Tambahkan setting pertama melalui form di sebelah kiri.
          </p>
        </div>
      ) : null}

      <div className="grid gap-4">
        {safeSettingsList.map((item) => (
          <article
            key={item.key}
            className="rounded-2xl border border-border bg-background p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <Settings className="size-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-black">
                    {getSettingLabel(item.key)}
                  </p>

                  <p className="mt-1 break-all text-xs text-muted-foreground">
                    Key: {item.key}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-border bg-card p-3">
              <p className="break-words text-sm leading-6 text-muted-foreground">
                {item.value?.trim() ? item.value : "Belum diisi"}
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
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
                onClick={() => onDelete(item.key)}
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