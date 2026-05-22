import { adminUi } from "../ui/class.-wrapper";


type AdminStatusBadgeProps = {
  status?: string;
};

export function AdminStatusBadge({ status }: AdminStatusBadgeProps) {
  if (!status) {
    return null;
  }

  if (status === "PUBLISHED") {
    return <span className={adminUi.statusPublished}>PUBLISHED</span>;
  }

  if (status === "DRAFT") {
    return <span className={adminUi.statusDraft}>DRAFT</span>;
  }

  return <span className={adminUi.badge}>{status}</span>;
}