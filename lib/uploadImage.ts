/**
 * uploadImage.ts
 * Helper utility to upload images to ImgBB securely via backend /api/upload
 */
import { getApiBaseUrl } from "@/lib/apiClient";

export interface UploadResult {
  url: string;
  thumbUrl?: string;
  displayUrl?: string;
  deleteUrl?: string;
}

/**
 * Uploads a File, Blob, or base64 string securely via backend /api/upload
 */
export async function uploadImageToImgBB(
  fileOrBase64: File | Blob | string,
  fileName?: string
): Promise<UploadResult> {
  try {
    const apiBase = getApiBaseUrl();
    let base64String = "";
    if (typeof fileOrBase64 === "string") {
      base64String = fileOrBase64;
    } else {
      base64String = await fileToBase64(fileOrBase64);
    }

    const res = await fetch(`${apiBase}/api/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: base64String,
        name: fileName || (fileOrBase64 instanceof File ? fileOrBase64.name : undefined),
      }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error || "Failed to upload image via backend");
    }

    return {
      url: data.data.url,
      thumbUrl: data.data.thumb_url,
      displayUrl: data.data.display_url,
      deleteUrl: data.data.delete_url,
    };
  } catch (err: any) {
    console.error("Backend image upload failed:", err);
    throw new Error(err.message || "Image upload failed. Please try again.");
  }
}

/**
 * Converts a File or Blob to a base64 string
 */
export function fileToBase64(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
