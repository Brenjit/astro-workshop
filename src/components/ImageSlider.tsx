'use client';

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface SliderImage {
    src: string;
    alt?: string;
}

interface ImageSliderProps {
    images: SliderImage[];
    autoPlayInterval?: number;
}

export function ImageSlider({ images, autoPlayInterval = 4000 }: ImageSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Fallback if no images
    if (!images || images.length === 0) {
        return (
            <div className="w-full h-[300px] md:h-[620px] bg-gray-100 flex items-center justify-center text-gray-400">
                No images available for slider
            </div>
        );
    }

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    const paginate = useCallback((newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => {
            let nextIndex = prevIndex + newDirection;
            if (nextIndex < 0) nextIndex = images.length - 1;
            if (nextIndex >= images.length) nextIndex = 0;
            return nextIndex;
        });
    }, [images.length]);

    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(() => {
            paginate(1);
        }, autoPlayInterval);
        return () => clearInterval(timer);
    }, [isHovered, paginate, autoPlayInterval]);

    return (
        <div
            className="relative w-full h-[300px] md:h-[620px] bg-black overflow-hidden group mb-6"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                    }}
                    className="absolute inset-0 w-full h-full"
                >
                    <div className="relative w-full h-full">
                        {/* Using Next.js Image with fill for responsiveness */}
                        <Image
                            src={images[currentIndex].src}
                            alt={images[currentIndex].alt || `Slide ${currentIndex + 1}`}
                            fill
                            className="object-cover"
                            priority={currentIndex === 0}
                            unoptimized
                        />
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                onClick={() => paginate(-1)}
                aria-label="Previous slide"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                onClick={() => paginate(1)}
                aria-label="Next slide"
            >
                <ChevronRight size={24} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-black/30 px-3 py-2 rounded-full backdrop-blur-md border border-white/20">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            setDirection(idx > currentIndex ? 1 : -1);
                            setCurrentIndex(idx);
                        }}
                        className={`w-3 h-3 rounded-full transition-colors ${idx === currentIndex ? "bg-white" : "bg-white/50 hover:bg-white/80"
                            }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
