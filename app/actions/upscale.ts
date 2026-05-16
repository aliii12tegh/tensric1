"use server";

import Replicate from "replicate";
import { createClient } from "@/utils/supabase/server";

export async function processImageUpscale(imageUrl: string, scale: number) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized: You must be logged in to upscale images.");
  }

  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error("Replicate API token is not configured.");
  }

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  try {
    // Example using Real-ESRGAN or a similar model
    const output = await replicate.run(
      "nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73abf41610695738c1d7b",
      {
        input: {
          image: imageUrl,
          scale: scale,
          face_enhance: true,
        }
      }
    );

    return { success: true, url: output };

  } catch (error: any) {
    console.error("Upscale error:", error);
    return { success: false, error: error.message };
  }
}
