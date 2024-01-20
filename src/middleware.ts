import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/auth/createUser",
    "/sso-callback",
    "/google-sign-in",
    
    "/posts/(.*)",
    "/api/posts/getPostByParams",
    "/api/posts/getPostById",
    "/api/posts/getPostsByCategory",
    "/api/vehicles/getAllMakes",
    "/api/vehicles/getAllModels",
    "/api/vehicles/getAllYears",
    
    // "/api/scrape/getVehicleModels",
    // "/api/scrape/getVehicleMakes",

    // "/api/posts/uploadImage",
    // "/api/uploadthing",
    // "/api/stripe/getProducts" // has to be secured
    "/api/stripe/webhook"
  ],
  afterAuth(auth, req, evt) {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      const url = req.nextUrl.clone()
      url.pathname = '/sign-in';
      return NextResponse.redirect(url);
    }
    // If the user is logged in and trying to access a protected route, allow them to access route
    if (auth.userId && !auth.isPublicRoute) {
      return NextResponse.next()
    }
    // Allow users visiting public routes to access them
    return NextResponse.next();
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};