# Project Memory - Sekolah Tema Berita

Last updated: 2026-05-20

## Current Status

Backend phase has been implemented in `apps/backend`. Frontend public landing and the first admin panel pass have now been implemented in `apps/frontend`.

Important user instruction: the user will generate/migrate the database manually. Do not run Prisma migrate, db push, or seed unless the user explicitly asks.

Backend import convention: controller and module files use explicit `.js` suffixes for relative imports. Keep this pattern when adding new Nest routes/controllers/modules. Jest is configured with `moduleNameMapper` in `apps/backend/package.json` so `.js` imports resolve during TypeScript tests.

Swagger DTO convention: request bodies now use class DTOs directly from each feature `dto/*.dto.ts` file, for example `@ApiBody({ type: CreateUserDto })`. The previous shared Swagger schema helper `apps/backend/src/common/swagger/api-schemas.ts` was removed, so do not reintroduce `BodySchema`/`api-schemas` imports. Keep Zod schemas in the same DTO files for runtime validation, and keep class DTOs for Swagger metadata.

## Backend Implemented

The backend is a NestJS API with `/api` global prefix and Swagger available at `/api/docs`.

Implemented backend areas:

- Config/env factory pattern in `apps/backend/src/config/env.config.ts`.
- Multi-env loader in `apps/backend/src/config/env-files.ts`.
- Prisma 7 + MariaDB/MySQL adapter setup.
- `prisma.config.ts`.
- Prisma schema in `apps/backend/prisma/schema.prisma`.
- Generated Prisma client output under `apps/backend/src/generated/prisma`.
- `.env.example` with database, JWT, app, upload, and seed variables.
- Seed script in `apps/backend/prisma/seed.ts`, prepared but not executed.
- JWT auth with login/logout and HTTP-only cookie support.
- Role guard for `ADMIN`, `EDITOR`, and `HEADMASTER`.
- Zod validation pipe.
- Swagger request body metadata through class DTOs in each module's `dto` folder.
- Current user and roles decorators.
- Consistent HTTP exception filter.
- Local upload handling through `multer`.
- Static upload serving from `/uploads`.

Implemented modules:

- `auth`
- `users`
- `categories`
- `news`
- `announcements`
- `agendas`
- `achievements`
- `galleries`
- `ppdb`
- `media`
- `settings`
- `newsletter`
- `dashboard`
- `search`
- `prisma`

## API Surface

Public and shared endpoints include:

- `GET /api/health`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/news`
- `GET /api/news/featured`
- `GET /api/news/breaking`
- `GET /api/news/popular`
- `GET /api/news/:slug`
- `GET /api/categories`
- `GET /api/categories/:id`
- `GET /api/announcements`
- `GET /api/announcements/important`
- `GET /api/announcements/:id`
- `GET /api/agendas`
- `GET /api/achievements`
- `GET /api/galleries`
- `GET /api/ppdb`
- `GET /api/settings`
- `POST /api/newsletter`
- `GET /api/search?q=...`

Protected/admin endpoints include:

- `GET /api/users`
- `GET /api/users/:id`
- `POST /api/users`
- `PATCH /api/users/:id`
- `DELETE /api/users/:id`
- `POST /api/categories`
- `PATCH /api/categories/:id`
- `DELETE /api/categories/:id`
- `POST /api/news`
- `PATCH /api/news/:id`
- `DELETE /api/news/:id`
- `POST /api/announcements`
- `PATCH /api/announcements/:id`
- `DELETE /api/announcements/:id`
- `POST /api/agendas`
- `PATCH /api/agendas/:id`
- `DELETE /api/agendas/:id`
- `POST /api/achievements`
- `PATCH /api/achievements/:id`
- `DELETE /api/achievements/:id`
- `POST /api/galleries`
- `PATCH /api/galleries/:id`
- `DELETE /api/galleries/:id`
- `POST /api/ppdb`
- `PATCH /api/ppdb/:id`
- `DELETE /api/ppdb/:id`
- `GET /api/media`
- `POST /api/media/upload`
- `PATCH /api/settings`
- `GET /api/dashboard/stats`

## Database Notes

The schema is ready, but database generation was intentionally left for the user.

The backend now supports multiple env files:

- `.env.local` is the default for local development.
- `.env.production` is used when `APP_ENV=production` or `NODE_ENV=production`.
- `.env.example` documents all supported keys.

Env values are normalized through `createEnvConfig()`, so future env shape/default changes should be made in `apps/backend/src/config/env.config.ts`. File selection is controlled by `apps/backend/src/config/env-files.ts`. Prisma config and seed also use this loader, so Prisma CLI commands read the same env pattern.

Explicit run commands:

```powershell
cd "D:\Project\Sekolah Tema Berita\school\apps\backend"
npm run local
npm run production
```

Aliases are also available:

```powershell
npm run start:local
npm run start:production
```

Manual flow when the user is ready:

```powershell
cd "D:\Project\Sekolah Tema Berita\school\apps\backend"
# Edit .env.local for local development or .env.production for production.
npm run prisma:validate
npm run prisma:generate
npm run prisma:migrate -- --name school_db
npm run prisma:seed
```

The project currently uses Prisma generator `provider = "prisma-client"` with `moduleFormat = "cjs"`. Keep this because NestJS is currently compiling/running as CommonJS, and the default generated client caused runtime import issues before `moduleFormat = "cjs"` was added.

## Validation Already Run

These commands passed in `apps/backend`:

```powershell
$env:DATABASE_URL='mysql://root:password@localhost:3306/db_sekolah'; npm run prisma:validate; npm run prisma:generate
npm run lint
npm run build
npm test -- --runInBand
```

After adding the env factory, these commands passed again:

```powershell
npm run prisma:validate
npm run prisma:generate
npm run build
npm run lint
npm test -- --runInBand
```

After changing controller/module relative imports to explicit `.js`, these commands passed:

```powershell
npm run build
npm test -- --runInBand
```

After replacing shared Swagger body schemas with direct DTO classes and deleting `apps/backend/src/common/swagger/api-schemas.ts`, these commands passed:

```powershell
npm run build
npm run lint
npm test -- --runInBand
npm run prisma:validate
```

`npm run start:dev` was also checked. The Nest app compiled successfully, started, registered all routes, and printed `Nest application successfully started`.

Database-backed endpoint responses were not fully exercised because the user asked to generate the database manually.

## Known Warnings

- `npm install` reported 3 moderate audit warnings. No automatic `npm audit fix` was run.
- Backend `npm run lint` includes `--fix`, so it can rewrite formatting.
- Generated Prisma client files are under `apps/backend/src/generated/prisma` and should be regenerated after schema changes.

## Frontend Implemented

Frontend work is in `apps/frontend` and uses Next.js App Router, Tailwind CSS v4, shadcn/ui via MCP, lucide-react, TanStack Query, React Hook Form, and Zod.

Frontend structure was refactored so logic is separated by responsibility:

- `types/` holds shared public/admin TypeScript types.
- `services/` holds public API and admin API request helpers.
- `hooks/` holds React Query, React Hook Form, auth, newsletter, and portal state logic.
- `config/` holds env mapping and admin module schemas.
- `shared/portal-home/` holds reusable public portal sections, portal defaults, nav data, and portal-specific helpers.
- `utils/` holds formatting, visual style helpers, and admin record helpers.
- `lib/` only keeps generic shadcn utility code.

Frontend env files now exist:

- `.env.local` for local development.
- `.env.example` as the template.

Both currently set `NEXT_PUBLIC_API_URL=http://localhost:4000/api`.

Implemented public routes:

- `/` renders the school news portal landing page.
- `/search?q=...` renders a simple public search result page.
- `/berita` renders the backend news list.
- `/berita/[slug]` renders a backend news detail page.
- `/pengumuman` renders backend announcements.
- `/agenda` renders backend agendas.
- `/prestasi` renders backend achievements.
- `/galeri` renders backend gallery items.
- `/ppdb` renders backend PPDB information.
- `/profil` and `/kontak` render school identity/contact data from settings.
- `/admin/login` renders the admin login form.
- `/admin` renders the admin dashboard and CRUD hub.

Landing page notes:

- The UI follows `D:\Project\Sekolah Tema Berita\UI UX.png` and the `prd.md` visual order: top bar, school header, navy navbar, breaking news, hero news grid, right sidebar, latest news, agenda, prestasi, gallery/footer, plus dedicated mobile layout.
- `app/globals.css` uses the root color tokens from `prd.md`: navy primary, gold secondary, red breaking news, card tokens, sidebar tokens, dark mode tokens, and utilities like `.container-school`, `.card-school`, `.news-overlay`, `.news-badge`, `.nav-link`, and `.mobile-shortcut-card`.
- Homepage fetches public backend endpoints only. Frontend dummy/demo content was removed, so empty/offline API states render empty messages instead of fake school content.
- Navbar links, mobile shortcut links, footer links, and homepage "Lihat semua" actions now route to real public pages instead of placeholder anchors.
- Homepage sections are split into shared portal components: latest news, agenda, achievements/gallery, mobile shortcuts, mobile action list, mobile footer card, and desktop footer.
- Public API base is `NEXT_PUBLIC_API_URL`, defaulting to `http://localhost:4000/api`.

Admin notes:

- `/admin/login` posts to `/api/auth/login`, stores the returned user summary in localStorage for frontend author context, and relies on the backend HTTP-only auth cookie for protected endpoints.
- `/admin` uses React Query for dashboard stats, list refresh, create mutations, delete mutations, and cache invalidation.
- Admin forms use React Hook Form with Zod validation.
- The first admin CRUD hub covers categories, news, announcements, agendas, achievements, galleries, and PPDB. News creation injects `authorId` from the stored login user.
- Upload UI is not implemented yet; media upload can be added next against `/api/media/upload`.

Frontend validation already run:

```powershell
cd "D:\Project\Sekolah Tema Berita\school\apps\frontend"
npm run lint
npm run build
```

After adding real public destination pages for navbar and "Lihat semua" links,
these checks passed again:

```powershell
cd "D:\Project\Sekolah Tema Berita\school\apps\frontend"
npm run lint
npm run build
```

HTTP smoke checks returned `200` for `/`, `/berita`, `/pengumuman`, `/agenda`,
`/prestasi`, `/galeri`, `/ppdb`, `/profil`, `/kontak`, and one seeded
`/berita/[slug]` detail URL.

After separating frontend logic into `types`, `services`, `hooks`, `config`,
and `utils`, these checks passed again:

```powershell
cd "D:\Project\Sekolah Tema Berita\school\apps\frontend"
npm run lint
npm run build
```

HTTP smoke checks returned `200` for `/`, `/berita`, `/pengumuman`, `/agenda`,
`/prestasi`, `/galeri`, `/ppdb`, `/profil`, `/kontak`, and `/admin/login`.

After restoring the missing shared portal sections and fixing refactor drift
in `PortalHome`, these checks passed:

```powershell
cd "D:\Project\Sekolah Tema Berita\school\apps\frontend"
npm run lint
npm run build
```

HTTP smoke checks returned `200` for `/`, `/berita`, `/agenda`, `/prestasi`,
`/galeri`, `/ppdb`, `/profil`, and `/kontak`. A Playwright mobile screenshot
smoke check for `/` also completed.

After tightening the mobile homepage to match the UI reference, these checks
passed again:

```powershell
cd "D:\Project\Sekolah Tema Berita\school\apps\frontend"
npm run lint
npm run build
```

Mobile-specific changes: compact header/logo, right-side topbar icons, shorter
hero card with carousel dots, non-overflowing four-column shortcut cards,
denser latest-news list, and filtering latest mobile news so it does not repeat
featured hero items when possible.

Browser checks already performed:

- `/` desktop render was checked at `http://127.0.0.1:3000`.
- `/` mobile render was checked with Playwright Pixel 5 viewport.
- `/admin/login` and `/admin` were opened in browser automation.

Known frontend runtime note:

- When backend is not running on `http://localhost:4000`, public sections show empty states and admin browser console shows `ERR_CONNECTION_REFUSED` for API requests. This is expected until the backend and database are started.

## Seed Data

`apps/backend/prisma/seed.ts` now seeds real portal content with Unsplash image URLs:

- Admin user from env seed variables and an editor user at `editor@smknusantara.sch.id`.
- Categories: Prestasi, Kegiatan, Akademik, PPDB.
- Published featured/breaking/latest news with Unsplash thumbnails.
- Important announcements, agendas, achievements with images, gallery items, PPDB banner, media metadata, and school settings.

The seed was run successfully after the frontend dummy-data removal:

```powershell
cd "D:\Project\Sekolah Tema Berita\school\apps\backend"
npm run prisma:validate
npm run prisma:seed
```

Backend endpoint smoke checks passed after starting the backend on port 4000:

```powershell
GET /api/health
GET /api/news/featured
GET /api/news/breaking
GET /api/news?limit=3
GET /api/announcements/important
GET /api/agendas
GET /api/achievements
GET /api/galleries
GET /api/settings
```
