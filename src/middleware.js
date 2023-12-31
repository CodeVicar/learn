import { NextResponse } from 'next/server';

// Define a middleware function for token verification
export async function middleware(req, res) {
  // Retrieve the 'accessToken' from cookies in the incoming request
  const peslac_access_token = req.cookies.get('accessToken')?.value;

  try {
    // Verify the token by making a fetch request to the server's '/auth/verify' endpoint
    const verifyTokenRes = await fetch(
      process.env.NEXT_PUBLIC_API_URL + '/auth/verify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${peslac_access_token}`,
        },
        body: JSON.stringify({ peslac_access_token }),
      }
    );

    // Redirect to login if the token is invalid
    if (!verifyTokenRes.ok) {
      if (req.nextUrl.pathname.startsWith('/login')) {
        // If already on the login page, continue to the next middleware
        return NextResponse.next();
      } else {
        // Redirect to the login page if not on the login page
        return NextResponse.redirect(
          process.env.NEXT_PUBLIC_BASE_URL + '/login'
        );
      }
    } else {
      // Token is valid

      if (req.nextUrl.pathname.startsWith('/login')) {
        // Redirect to the home page if on the login page
        return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL + '/');
      }

      // Continue to the next middleware if not on the login page
      return NextResponse.next();
    }
  } catch (error) {
    // Handle errors by redirecting to the login page
    if (req.nextUrl.pathname.startsWith('/login')) {
      // If already on the login page, continue to the next middleware
      return NextResponse.next();
    } else {
      // Redirect to the login page if not on the login page
      return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL + '/login');
    }
  }
}

// Define configuration for the middleware
export const config = {
  // Specify the paths to which the middleware should be applied
  matcher: [
    '/',
    '/login/:path*',
    '/motor-claims/:path*',
    '/motor-assessments/:path*',
    '/motor-parts/:path*',
    '/parts-suppliers/:path*',
    '/repair-garages/:path*',
    '/settings/:path*',
    '/users/:path*',
    '/error/:path*',
  ],
};
