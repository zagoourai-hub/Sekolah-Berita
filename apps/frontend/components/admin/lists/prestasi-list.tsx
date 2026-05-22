"use client";

import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminListActions } from "@/components/admin/admin-list-actions";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { adminUi } from "@/components/ui/class.-wrapper";
import type { Prestasi } from "@/types/school";

type PrestasiListProps = {
  prestasiList: Prestasi[];
  isLoading: boolean;
  isDeleting: boolean;
  onEdit: (item: Prestasi) => void;
  onDelete: (id: string) => void;
};

export function PrestasiList({
  prestasiList,
  isLoading,
  isDeleting,
  onEdit,
  onDelete,
}: PrestasiListProps) {
  return (
    <div className={`${adminUi.card} ${adminUi.cardPadding}`}>
      <div className={adminUi.cardHeader}>
        <div>
          <h2 className={adminUi.title}>Data Prestasi</h2>
          <p className={adminUi.description}>Daftar prestasi sekolah.</p>
        </div>
      </div>

      <AdminEmptyState
        isLoading={isLoading}
        isEmpty={prestasiList.length === 0}
        loadingText="Memuat data prestasi..."
        emptyText="Belum ada prestasi."
      />

      <div className="space-y-3">
        {prestasiList.map((item) => (
          <div key={item.id} className={adminUi.listItem}>
            <div className={adminUi.listRow}>
              <div className="min-w-0">
                <h3 className={adminUi.listTitle}>{item.title}</h3>
                <p className={adminUi.listSubtitle}>
                  {item.winner || "Pemenang belum diisi"} /{" "}
                  {item.level || "Tingkat belum diisi"}
                </p>
              </div>

              <div className={adminUi.listMeta}>
                <AdminStatusBadge status={item.status} />

                <AdminListActions
                  isDeleting={isDeleting}
                  deleteMessage="Yakin ingin menghapus prestasi ini?"
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
