import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const proxy = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;

  // ... further secure routing
};