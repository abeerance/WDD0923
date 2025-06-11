import { NextAuthRequest } from "next-auth";
import { auth } from "./auth"; // import the whole configuration file from next-auth
import { NextResponse } from "next/server";

// define the protected routes
const protectedRoutes = ["/dashboard", "/profile"];
// define auth route, we ignore the public route, because the public routes will be accessible anyway
const authRoutes = ["/signup-login"];

// the request is being passed on on every request we do. Since we are using auth.js, this way we have direct access to the session management, which is magic under the hood
export default auth((request: NextAuthRequest) => {
  // here we extract the url (nextUrl) from the request so we can check the accessed route
  const { nextUrl } = request;
  const isLoggedIn = !!request.auth; // request.auth contains the session, because we're accessing it via the NextAuthRequest. !! => transforms the object into a boolean, to make the check safer and more simple

  // Here we check the to be requested route, and check it against the prtectedRoutes and authRoutes array
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);

  // if user is logged in and tries to access the auth pages, redirect to dashboard
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  // if user is NOT logged in and tries to access the protecred routes, redirect to  login
  if (!isLoggedIn && isProtectedRoute) {
    return NextResponse.redirect(new URL("/signup-login", nextUrl));
  }

  // allow the request to continue
  return NextResponse.next();
});

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    // Match all request paths except static files and API routes (except auth)
    "/((?!api(?!/auth)|_next/static|_next/image|favicon.ico).*)",
  ],
};
