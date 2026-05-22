export type PengumumanStatus = "DRAFT" | "PUBLISHED";

export type Pengumuman = {
  id: string;
  title: string;
  slug?:string
  content: string;
  attachmentUrl?: string | null;
  status: PengumumanStatus;
  isImportant?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type PengumumanPayload = {
  slug?:string
  title: string;
  content: string;
  attachmentUrl?: string;
  status: PengumumanStatus;
  isImportant?: boolean;
};

export type PengugumanUpdatePayload = Partial<PengumumanPayload>;


export type BeritaStatus = "DRAFT" | "PUBLISHED";

export type Berita = {
  id: string;
  title: string;
  slug?: string | null;
  summary?: string | null;
  content: string;
  thumbnailUrl?: string | null;
  category?: string | null;
  status: BeritaStatus;
  isFeatured: boolean;
  isBreakingNews: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type BeritaPayload = {
  title: string;
  slug?: string;
  summary?: string;
  content: string;
  thumbnailUrl?: string;
  category?: string;
  status: BeritaStatus;
  isFeatured?: boolean;
  isBreakingNews?: boolean;
};

export type BeritaUpdatePayload = Partial<BeritaPayload>;


export type Kategori = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  color?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type KategoriPayload = {
  name: string;
  slug?: string;
  description?: string;
  color?: string | null;
};
export type KategoriUpdatePayload = Partial<KategoriPayload>;



export type NewsItem = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  thumbnail?: string | null;
  publishedAt?: string | null;
  createdAt?: string | null;
  viewCount?: number;
  category?: Kategori | null;
};

export type AnnouncementItem = {
  id: string;
  title: string;
  slug?: string;
  content?: string;
  publishedAt?: string | null;
  createdAt?: string | null;
};

export type AgendaStatus = "DRAFT" | "PUBLISHED";

export type Agenda = {
  id: string;
  title: string;
  slug?:string
  description?: string | null;
  location?: string | null;
  startDate?: string | null;
  status: AgendaStatus;
  createdAt?: string;
  endDate?:string
  updatedAt?: string;
};

export type AgendaPayload = {
  title: string;
  slug?:string
  description?: string;
  location?: string;
  startDate?: string;
  endDate?:string
  status: AgendaStatus;
};
export type AgendaUpdatePayload = Partial<AgendaPayload>


export type Organisasi = {
  id: string;
  name: string;
  position: string;
  kelas?: string | null;
  photoUrl: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateOrganisasiPayload = {
  name: string;
  position: string;
  photo?: File | null;
  kelas?: string | null;
  sortOrder?: number;
  isActive?: boolean;
  photoUrl?: string | null;
};

export type UpdateOrganisasiPayload = Partial<CreateOrganisasiPayload>;


export type PrestasiStatus = "DRAFT" | "PUBLISHED";

export type Prestasi = {
  id: string;
  title: string;
  slug?:string
  description?: string | null;
  winner?: string | null;
  level?: string | null;
  imageUrl?: string | null;
  achievementDate?: string | null;
  status: PrestasiStatus;
  createdAt?: string;
  updatedAt?: string;
};

export type PrestasiPayload = {
  title: string;
  description?: string;
  slug?:string
  winner?: string;
  level?: string;
  imageUrl?: string;
  achievementDate?: string;
  status: PrestasiStatus;
};
export type PrestasiUpdatePayload = Partial<PrestasiPayload>


export type Galeri = {
  id: string;
  title: string;
 
  imageUrl: string;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type GaleriPayload = {
  title: string;
  imageUrl: string;
  description?: string;
};

export type GaleriUpdatePayload = Partial<GaleriPayload>

export type PpdbStatus = "DRAFT" | "PUBLISHED";

export type Ppdb = {
  id: string;
  title: string;
  slug?:string
  content: string;
  bannerUrl?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  status: PpdbStatus;
  createdAt?: string;
  updatedAt?: string;
};

export type PpdbPayload = {
  title: string;
  slug?:string
  content: string;
  bannerUrl?: string;
  startDate?: string;
  endDate?: string;
  status: PpdbStatus;
};

export type PpdbUpdatePayload = Partial<PpdbPayload>

export type SettingItem = {
  id?: string;
  key: string;
  value: string;
};

export type SettingPayload = {
  key: string;
  value: string;
};

export type UpdateSettingPayload = {
  value: string;
};

export type SearchResult = {
  news?: NewsItem[];
  announcements?: AnnouncementItem[];
  agendas?: Agenda[];
  achievements?: Prestasi[];
};

export type HomeData = {
  featuredNews: NewsItem[];
  breakingNews: NewsItem[];
  popularNews: NewsItem[];
  latestNews: NewsItem[];
  announcements: AnnouncementItem[];
  agendas: Agenda[];
  achievements: Prestasi[];
  galleries: Galeri[];
  settings: Record<string, string>;
};
