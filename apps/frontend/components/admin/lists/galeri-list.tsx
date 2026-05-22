"use client";

import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminListActions } from "@/components/admin/admin-list-actions";
import { adminUi } from "@/components/ui/class.-wrapper";
import type { Galeri } from "@/types/school";

type GaleriListProps = {
  galeriList: Galeri[];
  isLoading: boolean;
  isDeleting: boolean;
  onEdit: (item: Galeri) => void;
  onDelete: (id: string) => void;
};

export function GaleriList({
  galeriList,
  isLoading,
  isDeleting,
  onEdit,
  onDelete,
}: GaleriListProps) {
  return (
    <div className={`${adminUi.card} ${adminUi.cardPadding}`}>
      <div className={adminUi.cardHeader}>
        <div>
          <h2 className={adminUi.title}>Data Galeri</h2>
          <p className={adminUi.description}>Daftar foto galeri sekolah.</p>
        </div>
      </div>

      <AdminEmptyState
        isLoading={isLoading}
        isEmpty={galeriList.length === 0}
        loadingText="Memuat data galeri..."
        emptyText="Belum ada galeri."
      />

      <div className="space-y-3">
        {galeriList.map((item) => (
          <div key={item.id} className={adminUi.listItem}>
            <div className={adminUi.listRow}>
              <div className="min-w-0">
                <h3 className={adminUi.listTitle}>{item.title}</h3>
                <p className={adminUi.listSubtitle}>{item.imageUrl}</p>
              </div>

              <AdminListActions
                isDeleting={isDeleting}
                deleteMessage="Yakin ingin menghapus galeri ini?"
                onEdit={() => onEdit(item)}
                onDelete={() => onDelete(item.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
