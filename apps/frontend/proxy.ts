import { type NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE_NAME = "access_token";

const ADMIN_PATH = "/admin";
const LOGIN_PATH = "/admin/login";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /**
   * Ambil JWT dari cookie.
   * Nama cookie harus sama dengan backend NestJS kamu.
   */
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  /**
   * Route login admin.
   * Ini wajib dikecualikan dari proteksi.
   */
  const isLoginRoute =
    pathname === LOGIN_PATH || pathname.startsWith(`${LOGIN_PATH}/`);

  /**
   * Route admin protected.
   * Semua /admin dilindungi, kecuali /admin/login.
   */
  const isAdminRoute =
    (pathname === ADMIN_PATH || pathname.startsWith(`${ADMIN_PATH}/`)) &&
    !isLoginRoute;

  /**
   * Jika user belum login dan akses /admin,
   * arahkan ke /admin/login.
   */
  if (isAdminRoute && !token) {
    const loginUrl = request.nextUrl.clone();

    loginUrl.pathname = LOGIN_PATH;

    /**
     * Hindari callbackUrl ke halaman login sendiri.
     */
    if (pathname !== LOGIN_PATH) {
      loginUrl.searchParams.set("callbackUrl", pathname);
    }

    return NextResponse.redirect(loginUrl);
  }

  /**
   * Jika user sudah login dan membuka /admin/login,
   * langsung arahkan ke dashboard admin.
   */
  if (isLoginRoute && token) {
    const adminUrl = request.nextUrl.clone();

    adminUrl.pathname = ADMIN_PATH;
    adminUrl.search = "";

    return NextResponse.redirect(adminUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};