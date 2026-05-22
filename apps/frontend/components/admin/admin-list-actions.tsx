import { adminUi } from "../ui/class.-wrapper";


type AdminListActionsProps = {
  isDeleting: boolean;
  deleteMessage: string;
  onEdit: () => void;
  onDelete: () => void;
};

export function AdminListActions({
  isDeleting,
  deleteMessage,
  onEdit,
  onDelete,
}: AdminListActionsProps) {
  return (
    <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
      <button type="button" onClick={onEdit} className={adminUi.editButton}>
        Edit
      </button>

      <button
        type="button"
        disabled={isDeleting}
        onClick={() => {
          const confirmed = window.confirm(deleteMessage);

          if (confirmed) {
            onDelete();
          }
        }}
        className={adminUi.dangerButton}
      >
        Hapus
      </button>
    </div>
  );
}
