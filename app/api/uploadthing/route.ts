// app/api/uploadthing/route.ts
import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Export routes for App Router (Next.js 13+)
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
