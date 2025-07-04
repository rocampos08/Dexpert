// app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => {
    console.log("File uploaded:", file);
    return { success: true };
  }),

  pdfUploader: f({
    "application/pdf": {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => {
    console.log("PDF uploaded:", file);
    return { success: true };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
