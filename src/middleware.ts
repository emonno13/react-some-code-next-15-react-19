import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = request.cookies.has('accessToken');

  const headers = new Headers(request.headers);
  headers.set('x-current-path', request.nextUrl.pathname);

  // Protect /me route - redirect to login if not authenticated
  if (pathname.startsWith('/me') && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Prevent authenticated users from accessing login page
  if (pathname.startsWith('/login') && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next({ headers });
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    // Match all routes except static files and API routes.
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
