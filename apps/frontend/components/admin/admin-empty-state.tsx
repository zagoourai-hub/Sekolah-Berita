import { adminUi } from "../ui/class.-wrapper";


type AdminEmptyStateProps = {
  isLoading: boolean;
  loadingText: string;
  emptyText: string;
  isEmpty: boolean;
};

export function AdminEmptyState({
  isLoading,
  loadingText,
  emptyText,
  isEmpty,
}: AdminEmptyStateProps) {
  if (isLoading) {
    return <div className={adminUi.listItem}>{loadingText}</div>;
  }

  if (isEmpty) {
    return <div className={adminUi.listItem}>{emptyText}</div>;
  }

  return null;
}