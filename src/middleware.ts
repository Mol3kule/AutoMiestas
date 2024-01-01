import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/sso-callback",
    "/posts/(.*)",
    "/api/posts/getPostById",
    "/api/vehicles/getAllMakes",
    "/api/vehicles/getAllModels",
    "/api/vehicles/getAllYears",
  ]
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};