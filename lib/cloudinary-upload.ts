// lib/cloudinary-upload.ts

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadPDFtoCloudinary(buffer: Buffer, fileName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'raw', // importante para PDFs
        public_id: fileName.replace(/\.pdf$/, '') + '.pdf', // quita .pdf si lo trae
        folder: 'certificates', // opcional: carpeta en Cloudinary
        overwrite: true,
      },
      (error, result) => {
        if (error || !result?.secure_url) {
          return reject(error || new Error("Upload failed"));
        }
        resolve(result.secure_url);
      }
    );

    stream.end(buffer);
  });
}
