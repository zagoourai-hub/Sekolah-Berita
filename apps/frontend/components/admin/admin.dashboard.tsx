"use client";

import { useState } from "react";
import {
  BarChart3,
  CalendarDays,
  FileText,
  FolderTree,
  GalleryVerticalEnd,
  Megaphone,
  Settings,
  Trophy,
  Users,
} from "lucide-react";


import Link from "next/link";
import { useBeritaQuery } from "@/hooks/berita/use-berita-query";
import { useGaleriQuery } from "@/hooks/galery/use-galeri-query";
import { useGaleriForm } from "@/hooks/galery/use.galeri.form";
import { usePpdbQuery } from "@/hooks/ppdb/use-ppdb-query";
import { usePengumumanQuery } from "@/hooks/penguguman/use-pengumuman-query";
import { usePengumumanForm } from "@/hooks/penguguman/use-pengumuman-form";
import { useAgendaQuery } from "@/hooks/agenda/use-agenda-query";
import { usePrestasiQuery } from "@/hooks/prestasi/use-prestasi-query";
import { useKategoriQuery } from "@/hooks/kategori/use-kategori-query";
import { useKategoriForm } from "@/hooks/kategori/use-kategori-form";
import { useBeritaForm } from "@/hooks/berita/use-berita-form";
import { useAgendaForm } from "@/hooks/agenda/use-agenda-form";
import { usePrestasiForm } from "@/hooks/prestasi/use-prestasi-form";
import { usePpdbForm } from "@/hooks/ppdb/use-ppdb-form";
import { KategoriForm } from "./form/kategori-form";
import { BeritaForm } from "./form/berita-form";
import { PengumumanForm } from "./form/pengumuman-form";
import { AgendaForm } from "./form/agenda-form";
import { PrestasiForm } from "./form/prestasi-form";
import { GaleriForm } from "./form/galeri-form";
import { PpdbForm } from "./form/ppdb-form";
import { PpdbList } from "./lists/ppdb";
import { GaleriList } from "./lists/galeri-list";
import { PrestasiList } from "./lists/prestasi-list";
import { AgendaList } from "./lists/agenda-list";
import { PengumumanList } from "./lists/pengumuman-list";
import { BeritaList } from "./lists/berita-list";
import { KategoriList } from "./lists/kategori-list";
import { adminUi } from "../ui/class.-wrapper";
import { useOrganisasiForm } from "@/hooks/organisasi/use-organisasi-form";
import { useOrganisasiQuery } from "@/hooks/organisasi/use-organisasi";
import { OrganisasiForm } from "./form/organisasi-form";
import { OrganisasiList } from "./lists/organisasi-list";
import { SettingsForm } from "./form/settings-form";
import { useSettingsForm } from "@/hooks/setting/use-settings-form";
import { useSettingsQuery } from "@/hooks/setting/use-settings";
import { SettingsList } from "./lists/settings-list";


type AdminTab = | "kategori" | "berita" | "pengumuman" | "agenda" | "prestasi" | "galeri" | "ppdb" | "organisasi" | "settings";;

const tabs: {
  key: AdminTab;
  label: string;
  icon: React.ElementType;
}[] = [
    {
      key: "kategori",
      label: "Kategori",
      icon: FolderTree,
    },
    {
      key: "berita",
      label: "Berita",
      icon: FileText,
    },
    {
      key: "pengumuman",
      label: "Pengumuman",
      icon: Megaphone,
    },
    {
      key: "agenda",
      label: "Agenda",
      icon: CalendarDays,
    },
    {
      key: "prestasi",
      label: "Prestasi",
      icon: Trophy,
    },
    {
      key: "galeri",
      label: "Galeri",
      icon: GalleryVerticalEnd,
    },
    {
      key: "ppdb",
      label: "PPDB",
      icon: Users,
    },
    {
      key: "organisasi",
      label: "Organisasi",
      icon: Users,
    },
    {
      key: "settings",
      label: "Settings",
      icon: Settings,
    },
  ];

export default function AdminDasBoard() {
  const [activeTab, setActiveTab] = useState<AdminTab>("berita");

  const kategoriQuery = useKategoriQuery();
  const kategoriForm = useKategoriForm();

  const beritaQuery = useBeritaQuery();
  const beritaForm = useBeritaForm();

  const pengumumanQuery = usePengumumanQuery();
  const pengumumanForm = usePengumumanForm();

  const settingsQuery = useSettingsQuery();

  const settingsList = Array.isArray(settingsQuery.data)
    ? settingsQuery.data
    : [];

  const settingsForm = useSettingsForm(settingsList);

  const organisasiQuery = useOrganisasiQuery();
  const organisasiForm = useOrganisasiForm();

  const agendaQuery = useAgendaQuery();
  const agendaForm = useAgendaForm();

  const prestasiQuery = usePrestasiQuery();
  const prestasiForm = usePrestasiForm();

  const galeriQuery = useGaleriQuery();
  const galeriForm = useGaleriForm();

  const ppdbQuery = usePpdbQuery();
  const ppdbForm = usePpdbForm();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-school-navy text-primary-foreground">
        <div className="container-school flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:py-6">
          <div>
            <p className="text-sm text-primary-foreground/80">Admin Panel</p>
            <h1 className="text-xl font-black tracking-tight sm:text-2xl">
              SMK Nusantara Digital
            </h1>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Link
              href="/"
              className="inline-flex w-full items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-primary-foreground/90 transition-colors hover:bg-white/10 sm:w-auto"
            >
              Lihat Website
            </Link>

            <button
              type="button"
              className="inline-flex w-full items-center justify-center rounded-xl bg-secondary px-4 py-2 text-sm font-bold text-secondary-foreground transition-colors hover:bg-secondary/90 sm:w-auto"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container-school space-y-6 py-8">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <AdminStatCard
            title="Total Berita"
            value={beritaQuery.data?.length ?? 0}
            icon={FileText}
          />

          <AdminStatCard
            title="Pengumuman"
            value={pengumumanQuery.data?.length ?? 0}
            icon={Megaphone}
          />

          <AdminStatCard
            title="Agenda"
            value={agendaQuery.data?.length ?? 0}
            icon={CalendarDays}
          />
          <AdminStatCard
            title="Organisasi"
            value={organisasiQuery.data?.length ?? 0}
            icon={Users}
          />

          <AdminStatCard title="Subscriber" value={0} icon={BarChart3} />
        </section>

        <section className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
          <div className="flex w-max min-w-full gap-2 sm:w-auto sm:min-w-0 sm:flex-wrap">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={
                    isActive
                      ? "inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-sm"
                      : "inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-bold text-foreground transition-colors hover:bg-muted"
                  }
                >
                  <Icon className="size-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </section>

        {activeTab === "kategori" ? (
          <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <KategoriForm
              form={kategoriForm.form}
              editingKategori={kategoriForm.editingKategori}
              isSubmitting={kategoriForm.isSubmitting}
              message={kategoriForm.message}
              onSubmit={kategoriForm.handleSubmit}
              onCancelEdit={kategoriForm.handleCancelEdit}
            />

            <KategoriList
              kategoriList={kategoriQuery.data ?? []}
              isLoading={kategoriQuery.isLoading}
              isDeleting={kategoriForm.isDeleting}
              onEdit={kategoriForm.handleEdit}
              onDelete={kategoriForm.handleDelete}
            />
          </section>
        ) : null}

        {activeTab === "berita" ? (
          <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <BeritaForm
              form={beritaForm.form}
              editingBerita={beritaForm.editingBerita}
              isSubmitting={beritaForm.isSubmitting}
              message={beritaForm.message}
              onSubmit={beritaForm.handleSubmit}
              onCancelEdit={beritaForm.handleCancelEdit}
            />

            <BeritaList
              beritaList={beritaQuery.data ?? []}
              isLoading={beritaQuery.isLoading}
              isDeleting={beritaForm.isDeleting}
              onEdit={beritaForm.handleEdit}
              onDelete={beritaForm.handleDelete}
            />
          </section>
        ) : null}

        {activeTab === "pengumuman" ? (
          <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <PengumumanForm
              form={pengumumanForm.form}
              editingPengumuman={pengumumanForm.editingPengumuman}
              isSubmitting={pengumumanForm.isSubmitting}
              message={pengumumanForm.message}
              onSubmit={pengumumanForm.handleSubmit}
              onCancelEdit={pengumumanForm.handleCancelEdit}
            />

            <PengumumanList
              pengumumanList={pengumumanQuery.data ?? []}
              isLoading={pengumumanQuery.isLoading}
              isDeleting={pengumumanForm.isDeleting}
              onEdit={pengumumanForm.handleEdit}
              onDelete={pengumumanForm.handleDelete}
            />
          </section>
        ) : null}

        {activeTab === "agenda" ? (
          <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <AgendaForm
              form={agendaForm.form}
              editingAgenda={agendaForm.editingAgenda}
              isSubmitting={agendaForm.isSubmitting}
              message={agendaForm.message}
              onSubmit={agendaForm.handleSubmit}
              onCancelEdit={agendaForm.handleCancelEdit}
            />

            <AgendaList
              agendaList={agendaQuery.data ?? []}
              isLoading={agendaQuery.isLoading}
              isDeleting={agendaForm.isDeleting}
              onEdit={agendaForm.handleEdit}
              onDelete={agendaForm.handleDelete}
            />
          </section>
        ) : null}

        {activeTab === "prestasi" ? (
          <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <PrestasiForm
              form={prestasiForm.form}
              editingPrestasi={prestasiForm.editingPrestasi}
              isSubmitting={prestasiForm.isSubmitting}
              message={prestasiForm.message}
              onSubmit={prestasiForm.handleSubmit}
              onCancelEdit={prestasiForm.handleCancelEdit}
            />

            <PrestasiList
              prestasiList={prestasiQuery.data ?? []}
              isLoading={prestasiQuery.isLoading}
              isDeleting={prestasiForm.isDeleting}
              onEdit={prestasiForm.handleEdit}
              onDelete={prestasiForm.handleDelete}
            />
          </section>
        ) : null}

        {activeTab === "galeri" ? (
          <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <GaleriForm
              form={galeriForm.form}
              editingGaleri={galeriForm.editingGaleri}
              isSubmitting={galeriForm.isSubmitting}
              message={galeriForm.message}
              onSubmit={galeriForm.handleSubmit}
              onCancelEdit={galeriForm.handleCancelEdit}
            />

            <GaleriList
              galeriList={galeriQuery.data ?? []}
              isLoading={galeriQuery.isLoading}
              isDeleting={galeriForm.isDeleting}
              onEdit={galeriForm.handleEdit}
              onDelete={galeriForm.handleDelete}
            />
          </section>
        ) : null}

        {activeTab === "ppdb" ? (
          <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <PpdbForm
              form={ppdbForm.form}
              editingPpdb={ppdbForm.editingPpdb}
              isSubmitting={ppdbForm.isSubmitting}
              message={ppdbForm.message}
              onSubmit={ppdbForm.handleSubmit}
              onCancelEdit={ppdbForm.handleCancelEdit}
            />

            <PpdbList
              ppdbList={ppdbQuery.data ?? []}
              isLoading={ppdbQuery.isLoading}
              isDeleting={ppdbForm.isDeleting}
              onEdit={ppdbForm.handleEdit}
              onDelete={ppdbForm.handleDelete}
            />
          </section>
        ) : null}

        {activeTab === "organisasi" ? (
          <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <OrganisasiForm
              form={organisasiForm.form}
              editingOrganisasi={organisasiForm.editingOrganisasi}
              isSubmitting={organisasiForm.isSubmitting}
              onSubmit={organisasiForm.handleSubmit}
              onCancelEdit={organisasiForm.handleCancelEdit}
            />

            <OrganisasiList
              organisasiList={organisasiQuery.data ?? []}
              isLoading={organisasiQuery.isLoading}
              isDeleting={organisasiForm.isDeleting}
              onEdit={organisasiForm.handleEdit}
              onDelete={organisasiForm.handleDelete}
            />
          </section>
        ) : null}

        {activeTab === "settings" ? (
          <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <SettingsForm
              form={settingsForm.form}
              isSubmitting={settingsForm.isSubmitting}
              onSubmit={settingsForm.handleSubmit}
            />

            <SettingsList
              settingsList={settingsList}
              isLoading={settingsQuery.isLoading}
              isDeleting={settingsForm.isDeleting}
              onEdit={settingsForm.handleEdit}
              onDelete={settingsForm.handleDelete}
            />
          </section>
        ) : null}

        <section
          className={`rounded-2xl border border-border bg-card text-card-foreground shadow-sm ${adminUi.cardPadding}`}
        >
          <h2 className="section-title">Catatan Integrasi</h2>

          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            Halaman admin ini memakai React Query untuk mengambil dan refresh
            data, React Hook Form untuk mengelola form, Zod untuk validasi
          </p>
        </section>
      </div>
    </main>
  );
}

type AdminStatCardProps = {
  title: string;
  value: number;
  icon: React.ElementType;
};

function AdminStatCard({ title, value, icon: Icon }: AdminStatCardProps) {
  return (
    <div
      className={`rounded-2xl border border-border bg-card text-card-foreground shadow-sm ${adminUi.cardPadding}`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-black text-primary">{value}</p>
        </div>

        <div className="flex size-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
          <Icon className="size-6" />
        </div>
      </div>
    </div>
  );
}
