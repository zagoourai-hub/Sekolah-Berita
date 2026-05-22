"use client";

import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminListActions } from "@/components/admin/admin-list-actions";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { adminUi } from "@/components/ui/class.-wrapper";

import type { Berita } from "@/types/school";

type BeritaListProps = {
  beritaList: Berita[];
  isLoading: boolean;
  isDeleting: boolean;
  onEdit: (item: Berita) => void;
  onDelete: (id: string) => void;
};

export function BeritaList({
  beritaList,
  isLoading,
  isDeleting,
  onEdit,
  onDelete,
}: BeritaListProps) {
  return (
    <div className={`${adminUi.card} ${adminUi.cardPadding}`}>
      <div className={adminUi.cardHeader}>
        <div>
          <h2 className={adminUi.title}>Data Berita</h2>
          <p className={adminUi.description}>Daftar berita sekolah.</p>
        </div>
      </div>

      <AdminEmptyState
        isLoading={isLoading}
        isEmpty={beritaList.length === 0}
        loadingText="Memuat data berita..."
        emptyText="Belum ada berita."
      />

      <div className="space-y-3">
        {beritaList.map((item) => (
          <div key={item.id} className={adminUi.listItem}>
            <div className={adminUi.listRow}>
              <div className="min-w-0">
                <h3 className={adminUi.listTitle}>{item.title}</h3>
                <p className={adminUi.listSubtitle}>
                  {item.category || "Tanpa kategori"}
                </p>
              </div>

              <div className={adminUi.listMeta}>
                <AdminStatusBadge status={item.status} />

                <AdminListActions
                  isDeleting={isDeleting}
                  deleteMessage="Yakin ingin menghapus berita ini?"
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
