import { listDriveFiles, getDriveImageUrl } from './drive';

export interface FileData {
    src: string;
    name: string;
    viewLink?: string;
    downloadLink?: string;
}

export interface SlideData {
    name: string;
    path: string;
    type: "pdf" | "pptx" | "other";
    download: string;
}

// Folder IDs from your configuration
const CONFIG = {
    sliderFolderId: "1Qr0Tw3CYjlFV7qCU5PpRb8H7cHKGKxZw",
    photosFolderId: "15wA3ZpWUmWNIebXwE1eTnEmspKtbxO4B",
    slidesFolderId: "19KacjMxnmi93rmcxYs75HeGrfKx2e8jh",
};

export async function getSliderImages(): Promise<FileData[]> {
    const files = await listDriveFiles(CONFIG.sliderFolderId);
    // Sort by name to respect 01_, 02_ naming
    files.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

    return files.slice(0, 5).map(f => ({
        name: f.name.replace(/\.[^/.]+$/, "").replace(/_/g, " "),
        src: getDriveImageUrl(f.id),
    }));
}

export async function getGalleryPhotos(): Promise<FileData[]> {
    const files = await listDriveFiles(CONFIG.photosFolderId);
    files.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

    return files.map(f => ({
        name: f.name.replace(/\.[^/.]+$/, "").replace(/_/g, " "),
        src: getDriveImageUrl(f.id),
        viewLink: `https://drive.google.com/file/d/${f.id}/view`,
        downloadLink: `https://drive.google.com/uc?export=download&id=${f.id}`
    }));
}

export async function getSlides(): Promise<SlideData[]> {
    const files = await listDriveFiles(CONFIG.slidesFolderId);

    return files.map(f => {
        const isPpt = f.mimeType.includes("presentation") || f.mimeType.includes("powerpoint");
        const isPdf = f.mimeType.includes("pdf");

        return {
            name: f.name.replace(/\.[^/.]+$/, ""),
            path: `https://drive.google.com/file/d/${f.id}/view`,
            type: isPdf ? 'pdf' : (isPpt ? 'pptx' : 'other'),
            download: `https://drive.google.com/uc?export=download&id=${f.id}`
        };
    });
}
