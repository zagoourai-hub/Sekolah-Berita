"use client";

import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminListActions } from "@/components/admin/admin-list-actions";
import { adminUi } from "@/components/ui/class.-wrapper";
import type { Kategori } from "@/types/school";

type KategoriListProps = {
  kategoriList: Kategori[];
  isLoading: boolean;
  isDeleting: boolean;
  onEdit: (item: Kategori) => void;
  onDelete: (id: string) => void;
};

export function KategoriList({
  kategoriList,
  isLoading,
  isDeleting,
  onEdit,
  onDelete,
}: KategoriListProps) {
  return (
    <div className={`${adminUi.card} ${adminUi.cardPadding}`}>
      <div className={adminUi.cardHeader}>
        <div>
          <h2 className={adminUi.title}>Data Kategori</h2>
          <p className={adminUi.description}>Daftar kategori berita sekolah.</p>
        </div>
      </div>

      <AdminEmptyState
        isLoading={isLoading}
        isEmpty={kategoriList.length === 0}
        loadingText="Memuat data kategori..."
        emptyText="Belum ada kategori."
      />

      <div className="space-y-3">
        {kategoriList.map((item) => (
          <div key={item.id} className={adminUi.listItem}>
            <div className={adminUi.listRow}>
              <div className="min-w-0">
                <h3 className={adminUi.listTitle}>{item.name}</h3>
                <p className={adminUi.listSubtitle}>{item.slug}</p>
              </div>

              <AdminListActions
                isDeleting={isDeleting}
                deleteMessage="Yakin ingin menghapus kategori ini?"
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
