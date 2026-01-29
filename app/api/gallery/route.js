import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// 1. Configure the Backend SDK
// Ensure these match your .env.local EXACTLY
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET || process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  // Check terminal to see if these are 'undefined'
  console.log("Cloud Name:", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
  
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "learnDeskGallery", // Removed trailing slash for testing
      max_results: 50,
    });

    if (!result.resources || result.resources.length === 0) {
      console.log("No images found in folder: learnDeskGallery");
      return NextResponse.json([]);
    }

    const publicIds = result.resources.map((img) => img.public_id);
    return NextResponse.json(publicIds);
    
  } catch (error) {
    console.error("Cloudinary Fetch Error:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch images", details: error.message },
      { status: 500 }
    );
  }
}