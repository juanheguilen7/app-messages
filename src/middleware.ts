import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const cookie = request.cookies.has('authToken');
  const pathname = request.nextUrl.pathname;

  if (!cookie && pathname !== '/auth/login') {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  } else if (cookie && pathname === '/auth/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: "/((?!api|_next|static|public|favicon.ico|images|icon).*)",
};

