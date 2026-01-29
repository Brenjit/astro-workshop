import fs from 'fs';
import path from 'path';

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
    download: string; // For local files, this is the same as path
}

export async function getSliderImages(): Promise<FileData[]> {
    const dir = path.join(process.cwd(), 'public', 'images', 'slider');
    const files = getFilesFromDir(dir);

    // Return relative paths for Next.js Image component
    return files.map(file => ({
        name: path.parse(file).name.replace(/_/g, " "),
        src: `/images/slider/${file}`,
    }));
}

export async function getGalleryPhotos(): Promise<FileData[]> {
    const dir = path.join(process.cwd(), 'public', 'images', 'gallery');
    const files = getFilesFromDir(dir);

    return files.map(file => {
        const src = `/images/gallery/${file}`;
        return {
            name: path.parse(file).name.replace(/_/g, " "),
            src: src,
            viewLink: src, // Local file link
            downloadLink: src // Local file download
        };
    });
}

export async function getSlides(): Promise<SlideData[]> {
    const dir = path.join(process.cwd(), 'public', 'slides');

    if (!fs.existsSync(dir)) return [];

    const files = fs.readdirSync(dir).filter(f => !f.startsWith('.'));

    // Alpha-numeric sort
    files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

    return files.map(file => {
        const ext = path.extname(file).toLowerCase();
        const isPdf = ext === '.pdf';
        const isPpt = ext === '.pptx' || ext === '.ppt';
        const src = `/slides/${file}`;

        return {
            name: path.parse(file).name.replace(/_/g, " "),
            path: src,
            type: isPdf ? 'pdf' : (isPpt ? 'pptx' : 'other'),
            download: src
        };
    });
}

// Helper to safely read and sort files
function getFilesFromDir(dirPath: string): string[] {
    if (!fs.existsSync(dirPath)) return [];

    const files = fs.readdirSync(dirPath).filter(file => {
        const ext = path.extname(file).toLowerCase();
        // Only images
        return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);
    });

    // Alphabetical / Natural Sort (1.jpg, 2.jpg, 10.jpg)
    files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

    return files;
}
