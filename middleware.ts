import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/uploadthing(.*)',
  '/api/get-role(.*)',
  '/api/project-analyzer(.*)',
  '/terms(.*)',
  '/privacy(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Proteger solo si no es ruta pública
  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  // Crear la respuesta y agregar el header
  const res = NextResponse.next();
  res.headers.set('x-pathname', req.nextUrl.pathname);
  return res;
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
