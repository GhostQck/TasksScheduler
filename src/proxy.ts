import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

export const proxy = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('session_token')?.value;

  let session = null;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, SECRET_KEY);
      session = payload;
    } catch {}
  }

  if (pathname === '/' && !session)
    return NextResponse.redirect(new URL('/login', req.url));

  if (pathname === '/login' && session)
    return NextResponse.redirect(new URL('/', req.url));

  return NextResponse.next();
};

export const config = {
  matcher: ['/', '/login'],
};