/**
 * uploadImage.ts
 * Helper utility to upload images to ImgBB via client-side API or backend /api/upload
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const IMGBB_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "";

export interface UploadResult {
  url: string;
  thumbUrl?: string;
  displayUrl?: string;
  deleteUrl?: string;
}

/**
 * Uploads a File, Blob, or base64 string to ImgBB.
 */
export async function uploadImageToImgBB(
  fileOrBase64: File | Blob | string,
  fileName?: string
): Promise<UploadResult> {
  // Method 1: Try direct client-side upload to ImgBB if key is present
  if (IMGBB_KEY) {
  try {
    const formData = new FormData();

    if (typeof fileOrBase64 === "string") {
      // It's a base64 string or remote URL
      if (fileOrBase64.startsWith("data:")) {
        const parts = fileOrBase64.split(";base64,");
        const contentType = parts[0].replace("data:", "");
        const raw = window.atob(parts[1]);
        const uInt8Array = new Uint8Array(raw.length);
        for (let i = 0; i < raw.length; ++i) {
          uInt8Array[i] = raw.charCodeAt(i);
        }
        const blob = new Blob([uInt8Array], { type: contentType });
        const name = fileName || `upload_${Date.now()}.${contentType.split("/")[1] || "png"}`;
        formData.append("image", blob, name);
      } else {
        formData.append("image", fileOrBase64);
      }
    } else {
      // It's a File or Blob
      const name = fileName || (fileOrBase64 instanceof File ? fileOrBase64.name : `upload_${Date.now()}.png`);
      formData.append("image", fileOrBase64, name);
    }

    if (fileName) {
      formData.append("name", fileName);
    }

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok && data.success && data.data?.url) {
      return {
        url: data.data.url,
        thumbUrl: data.data.thumb?.url || data.data.url,
        displayUrl: data.data.display_url || data.data.url,
        deleteUrl: data.data.delete_url,
      };
    }
    } catch (clientErr) {
      console.warn("Direct ImgBB upload failed, falling back to backend /api/upload:", clientErr);
    }
  }

  // Method 2: Fallback to backend /api/upload
  try {
    let base64String = "";
    if (typeof fileOrBase64 === "string") {
      base64String = fileOrBase64;
    } else {
      base64String = await fileToBase64(fileOrBase64);
    }

    const res = await fetch(`${API_BASE}/api/upload`, {
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
  } catch (backendErr: any) {
    throw new Error(backendErr.message || "Image upload failed. Please try again.");
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
