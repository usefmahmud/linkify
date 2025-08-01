import { createServerClient } from '@supabase/ssr';
import { INTERNALS } from 'next/dist/server/web/spec-extension/request';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  if (pathname === '/') {
    return supabaseResponse;
  }

  if (!user && !isAuthRoute(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  if (user && isAuthRoute(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  if (user) {
    const role = user?.user_metadata.role as 'job-seeker' | 'employer';

    if (isSharedRoute(pathname)) {
      return supabaseResponse;
    }

    if (role === 'job-seeker') {
      if (!isSharedRoute && !isJobSeekerRoute(pathname)) {
        const url = request.nextUrl.clone();
        url.pathname = '/job-seeker/dashboard';
        return NextResponse.redirect(url);
      }
    }

    if (role === 'employer') {
      if (!isSharedRoute && !isEmployerRoute(pathname)) {
        const url = request.nextUrl.clone();
        url.pathname = '/employer/dashboard';
        return NextResponse.redirect(url);
      }
    }
  }
  return supabaseResponse;
}

const isAuthRoute = (path: string) => path.startsWith('/auth');

const isJobSeekerRoute = (path: string) => {
  const jobSeekerPaths = ['/jobs', '/applications', '/saved-jobs'];
  return jobSeekerPaths.some((p) => path.startsWith(p)) || path === '/jobs';
};

const isEmployerRoute = (path: string) => {
  const employerPaths = [
    '/jobs/new',
    '/jobs/manage',
    '/candidates',
    '/company',
    '/applications/received',
  ];
  return employerPaths.some((p) => path.startsWith(p));
};

const isSharedRoute = (path: string) => {
  const sharedPaths = ['/jobs', '/profile'];
  return sharedPaths.some((p) => path.startsWith(p));
};
