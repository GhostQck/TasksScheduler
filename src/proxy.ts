import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import type { SessionPayload } from './lib/session';
import type { UserRole } from '@/db/schema';
import { type Route, ROUTES_ACCESS } from '@/lib/routes';
import { getNotifyUrl } from './lib/notifies';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

export const proxy = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('session_token')?.value;

  let session: SessionPayload | null = null;

  if (token) {
    try {
      const { payload } = await jwtVerify(token, SECRET_KEY);
      session = payload as SessionPayload;
    } catch {
      session = null;
    }
  }

  const isLoginPage = pathname.startsWith('/login');

  if (!session) {
    if (!isLoginPage) {
      const loginUrl = getNotifyUrl(
        new URL('/login', req.url),
        'login_required'
      );

      if (pathname !== '/')
        loginUrl.searchParams.set('from', pathname);

      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  if (isLoginPage)
    return NextResponse.redirect(new URL('/', req.url));

  const allowedRoles = ROUTES_ACCESS.find(
    route => isOnRoute(route, pathname) && route.roles
  )?.roles;

  if (
    allowedRoles &&
    !allowedRoles.includes(session.userRole as UserRole)
  ) return NextResponse.redirect(getNotifyUrl(
    new URL('/', req.url),
    'unauthorized'
  ));

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

function isOnRoute(route: Route, path: string): boolean {
  return path === route.href || path.startsWith(`${route.href}/`);
}