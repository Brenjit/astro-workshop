const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  webContentLink?: string;
  thumbnailLink?: string;
}

export async function listDriveFiles(folderId: string): Promise<DriveFile[]> {
  if (!GOOGLE_SCRIPT_URL) {
    console.warn("Missing NEXT_PUBLIC_GOOGLE_SCRIPT_URL env var");
    return [];
  }

  if (!folderId) {
    console.warn("Missing Folder ID");
    return [];
  }

  try {
    // The GAS Web App expects ?folderId=...
    const url = `${GOOGLE_SCRIPT_URL}?folderId=${encodeURIComponent(folderId)}`;

    // We can use 'no-cors' if strictly needed, but GAS Web Apps usually handle CORS if deployed correctly.
    // However, 'no-cors' returns an opaque response which we can't read JSON from.
    // Standard fetch normally works if GAS script processes OPTIONS/CORS or simpler GETs.
    // Redirects: 'follow' is important as GAS redirects to googleusercontent.
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow'
    });

    if (!response.ok) {
      console.error("GAS API Error:", response.status, await response.text());
      return [];
    }

    const data = await response.json();
    if (data.error) {
      console.error("GAS Script returned error:", data.error);
      return [];
    }

    return data.files || [];
  } catch (error) {
    console.error("Failed to fetch from Google Apps Script:", error);
    return [];
  }
}

// Helper to get a direct viewable image URL from a Drive File ID
// Using the thumbnail trick for larger images: https://drive.google.com/thumbnail?id=FILE_ID&sz=w2000
export function getDriveImageUrl(fileId: string): string {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w2000`;
}
