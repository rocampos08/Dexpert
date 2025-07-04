import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadPDFtoCloudinary(buffer: Buffer, fileName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const cleanFileName = fileName.replace(/\.pdf$/i, ''); // Elimina .pdf si ya lo tiene

    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto', // Permite PDFs, imágenes, etc.
        public_id: `${cleanFileName}`, 
        overwrite: true,
        access_mode: 'public',
        type: 'upload',
      },
      (error, result) => {
        if (error || !result?.secure_url) {
          return reject(error || new Error("Upload failed"));
        }
        resolve(result.secure_url); // URL final del PDF en Cloudinary
      }
    );

    stream.end(buffer); // Enviamos el buffer al stream
  });
}
