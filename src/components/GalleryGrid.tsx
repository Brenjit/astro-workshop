'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Search } from "lucide-react";
import Image from "next/image";

interface GalleryPhoto {
    src: string;
    name: string;
}

interface GalleryGridProps {
    photos: GalleryPhoto[];
}

export function GalleryGrid({ photos }: GalleryGridProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

    const filteredPhotos = photos.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="py-[60px] px-6 md:px-[10%] bg-white" id="gallerySection">
            <h2 className="text-3xl font-black mb-6 border-l-[7px] border-workshop-accent pl-3 text-workshop-text">
                Photo Gallery
            </h2>

            {/* Search Bar */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
                <div className="relative w-full max-w-lg">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search photos by filename..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-workshop-line focus:outline-none focus:ring-2 focus:ring-workshop-accent/50 transition-all font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {searchTerm && (
                    <button
                        onClick={() => setSearchTerm("")}
                        className="px-4 py-2 bg-gray-100 font-bold rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Clear
                    </button>
                )}
            </div>

            {/* Grid */}
            {filteredPhotos.length === 0 ? (
                <p className="text-gray-500 italic">No photos found.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredPhotos.map((photo, idx) => (
                        <motion.div
                            key={photo.src}
                            layoutId={`photo-${photo.src}`}
                            className="relative aspect-square cursor-pointer overflow-hidden rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow bg-gray-50 group"
                            onClick={() => setSelectedPhoto(photo)}
                        >
                            {/* Use unoptimized to handle arbitrary local files easily without Next.js Image Config for now, or use optimized if possible. 
                   Since these are local, optimized works fine. */}
                            <Image
                                src={photo.src}
                                alt={photo.name}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                                sizes="(max-width: 768px) 50vw, 25vw"
                                unoptimized
                            />
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Lightbox */}
            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <button
                            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full z-50"
                            onClick={() => setSelectedPhoto(null)}
                        >
                            <X size={32} />
                        </button>

                        <motion.div
                            layoutId={`photo-${selectedPhoto.src}`}
                            className="relative max-w-7xl w-full max-h-[90vh] bg-white rounded-lg overflow-hidden flex flex-col shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-white z-10">
                                <h3 className="font-bold text-lg truncate max-w-[70%]">
                                    {selectedPhoto.name}
                                </h3>
                                <div className="flex gap-2">
                                    <a
                                        href={selectedPhoto.src}
                                        download
                                        target="_blank"
                                        className="flex items-center gap-2 px-4 py-2 bg-workshop-accent text-white rounded-lg font-bold hover:brightness-110 transition-all text-sm"
                                    >
                                        <Download size={16} />
                                        Download
                                    </a>
                                </div>
                            </div>

                            {/* Image */}
                            <div className="relative w-full h-[60vh] md:h-[80vh] bg-black">
                                <Image
                                    src={selectedPhoto.src}
                                    alt={selectedPhoto.name}
                                    fill
                                    className="object-contain"
                                    unoptimized
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
