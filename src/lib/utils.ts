export function getAssetPath(path: string): string {
    const isProd = process.env.NODE_ENV === "production";
    const basePath = isProd ? "/astro-workshop" : "";
    // Ensure path starts with / if not present (optional safety)
    const safePath = path.startsWith("/") ? path : `/${path}`;
    return `${basePath}${safePath}`;
}
