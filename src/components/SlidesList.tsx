'use client';

import React, { useState } from "react";
import { Search, FileText, Download, Eye } from "lucide-react";

interface SlideFile {
    name: string;
    path: string;
    type: "pdf" | "pptx" | "other";
}

interface SlidesListProps {
    slides: SlideFile[];
}

export function SlidesList({ slides }: SlidesListProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredSlides = slides.filter((s) =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const scrollToGallery = () => {
        document.getElementById("gallerySection")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="py-[60px] px-6 md:px-[10%] bg-[#f8fafc] border-t border-workshop-line" id="slidesSection">
            <h2 className="text-3xl font-black mb-6 border-l-[7px] border-workshop-accent pl-3 text-workshop-text">
                Slides & Materials
            </h2>

            <div className="flex flex-wrap items-center gap-3 mb-8">
                <div className="relative w-full max-w-lg">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search slides by filename..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-workshop-line focus:outline-none focus:ring-2 focus:ring-workshop-accent/50 transition-all font-medium bg-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {searchTerm && (
                    <button
                        onClick={() => setSearchTerm("")}
                        className="px-4 py-2 bg-white border border-gray-300 font-bold rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Clear
                    </button>
                )}
                <button
                    onClick={scrollToGallery}
                    className="ml-auto px-6 py-3 bg-gradient-to-r from-workshop-accent to-workshop-accent2 text-white font-bold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm md:text-base hidden sm:block"
                >
                    Go to Gallery
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredSlides.map((slide, idx) => (
                    <div
                        key={idx}
                        className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex flex-col"
                    >
                        <div className="flex items-start gap-3 mb-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                                <FileText size={24} />
                            </div>
                            <h3 className="font-bold text-gray-900 leading-snug break-words line-clamp-2" title={slide.name}>
                                {slide.name}
                            </h3>
                        </div>

                        <div className="mt-auto flex gap-2">
                            <a
                                href={slide.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-workshop-accent text-white rounded-lg font-bold text-sm hover:brightness-110 transition-all"
                            >
                                <Eye size={16} />
                                Open
                            </a>
                            <a
                                href={slide.path}
                                download
                                className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 bg-white text-gray-700 rounded-lg font-bold text-sm hover:bg-gray-50 transition-all"
                            >
                                <Download size={16} />
                            </a>
                        </div>
                    </div>
                ))}
                {filteredSlides.length === 0 && (
                    <p className="col-span-full text-gray-500 italic">No slides found.</p>
                )}
            </div>
        </section>
    );
}
