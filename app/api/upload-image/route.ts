// C:\Users\MINEDUCYT\Desktop\Dexpert\app\api\upload-image\route.ts
import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server'; // Import from next/server

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) { // Export a named POST function
  try {
    const { imageBase64 } = await req.json(); // Use req.json() to parse the body

    if (!imageBase64) {
      return NextResponse.json({ error: 'No image data provided' }, { status: 400 });
    }

    const uploadResult = await cloudinary.uploader.upload(imageBase64, {
      folder: 'project_images', // Optional: organize your images in a folder
    });

    return NextResponse.json({ imageUrl: uploadResult.secure_url }, { status: 200 });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    // You might want to send a more generic error message to the client for security
    return NextResponse.json({ error: 'Failed to upload image to Cloudinary' }, { status: 500 });
  }
}

// If you want to prevent other methods, you don't need to export them.
// Next.js will automatically return a 405 Method Not Allowed for unhandled methods.