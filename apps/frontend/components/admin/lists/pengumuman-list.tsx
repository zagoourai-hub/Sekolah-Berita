"use client";

import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminListActions } from "@/components/admin/admin-list-actions";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { adminUi } from "@/components/ui/class.-wrapper";

import type { Pengumuman } from "@/types/school";

type PengumumanListProps = {
  pengumumanList: Pengumuman[];
  isLoading: boolean;
  isDeleting: boolean;
  onEdit: (item: Pengumuman) => void;
  onDelete: (id: string) => void;
};

export function PengumumanList({
  pengumumanList,
  isLoading,
  isDeleting,
  onEdit,
  onDelete,
}: PengumumanListProps) {
  return (
    <div className={`${adminUi.card} ${adminUi.cardPadding}`}>
      <div className={adminUi.cardHeader}>
        <div>
          <h2 className={adminUi.title}>Data Pengumuman</h2>
          <p className={adminUi.description}>Daftar pengumuman sekolah.</p>
        </div>
      </div>

      <AdminEmptyState
        isLoading={isLoading}
        isEmpty={pengumumanList.length === 0}
        loadingText="Memuat data pengumuman..."
        emptyText="Belum ada pengumuman."
      />

      <div className="space-y-3">
        {pengumumanList.map((item) => (
          <div key={item.id} className={adminUi.listItem}>
            <div className={adminUi.listRow}>
              <div className="min-w-0">
                <h3 className={adminUi.listTitle}>{item.title}</h3>
                <p className={adminUi.listSubtitle}>
                  {item.isImportant ? "Pengumuman penting" : "Pengumuman biasa"}
                </p>
              </div>

              <div className={adminUi.listMeta}>
                <AdminStatusBadge status={item.status} />

                <AdminListActions
                  isDeleting={isDeleting}
                  deleteMessage="Yakin ingin menghapus pengumuman ini?"
                  onEdit={() => onEdit(item)}
                  onDelete={() => onDelete(item.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
