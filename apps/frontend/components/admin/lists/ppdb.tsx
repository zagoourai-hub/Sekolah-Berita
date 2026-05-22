"use client";

import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminListActions } from "@/components/admin/admin-list-actions";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { adminUi } from "@/components/ui/class.-wrapper";

import type { Ppdb } from "@/types/school";

type PpdbListProps = {
  ppdbList: Ppdb[];
  isLoading: boolean;
  isDeleting: boolean;
  onEdit: (item: Ppdb) => void;
  onDelete: (id: string) => void;
};

export function PpdbList({
  ppdbList,
  isLoading,
  isDeleting,
  onEdit,
  onDelete,
}: PpdbListProps) {
  return (
    <div className={`${adminUi.card} ${adminUi.cardPadding}`}>
      <div className={adminUi.cardHeader}>
        <div>
          <h2 className={adminUi.title}>Data PPDB</h2>
          <p className={adminUi.description}>Daftar konten PPDB sekolah.</p>
        </div>
      </div>

      <AdminEmptyState
        isLoading={isLoading}
        isEmpty={ppdbList.length === 0}
        loadingText="Memuat data PPDB..."
        emptyText="Belum ada data PPDB."
      />

      <div className="space-y-3">
        {ppdbList.map((item) => (
          <div key={item.id} className={adminUi.listItem}>
            <div className={adminUi.listRow}>
              <div className="min-w-0">
                <h3 className={adminUi.listTitle}>{item.title}</h3>
                <p className={adminUi.listSubtitle}>
                  {item.startDate || "-"} sampai {item.endDate || "-"}
                </p>
              </div>

              <div className={adminUi.listMeta}>
                <AdminStatusBadge status={item.status} />

                <AdminListActions
                  isDeleting={isDeleting}
                  deleteMessage="Yakin ingin menghapus PPDB ini?"
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
