import { CalendarDays, Camera, Mail, Phone, Play } from "lucide-react";

import type { HomeData } from "@/types/school";
import { defaultSchoolInfo } from "@/components/shared/portal-home/portal-home.data";
import { currentDateLabel, schoolSetting } from "@/components/shared/portal-home/portal-home.helpers";

type PortalTopbarProps = {
  settings: HomeData["settings"];
};

export function PortalTopbar({ settings }: PortalTopbarProps) {
  return (
    <div className="bg-school-navy text-xs text-white">
      <div className="container-school flex h-10 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <CalendarDays className="size-3.5 text-secondary" />
          <span>{currentDateLabel()}</span>
        </div>

        <span className="flex items-center gap-3 md:hidden">
          <Camera className="size-3.5" />
          <Play className="size-3.5" />
        </span>

        <div className="hidden items-center gap-5 md:flex">
          <span className="flex items-center gap-2">
            <Phone className="size-3.5 text-secondary" />
            {schoolSetting(settings, "school_phone", defaultSchoolInfo.phone)}
          </span>

          <span className="flex items-center gap-2">
            <Mail className="size-3.5 text-secondary" />
            {schoolSetting(settings, "school_email", defaultSchoolInfo.email)}
          </span>

          <span className="flex items-center gap-3 border-l border-white/15 pl-5">
            <Camera className="size-3.5" />
            <Play className="size-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
