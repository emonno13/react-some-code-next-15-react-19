import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = request.cookies.has('accessToken');

  // Protect /me route - redirect to login if not authenticated
  if (pathname.startsWith('/me') && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Prevent authenticated users from accessing login page
  if (pathname.startsWith('/login') && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: ['/me/:path*', '/login'],
};
