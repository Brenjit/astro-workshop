import React from "react";

interface FooterProps {
    contactEmail: string;
}

export function Footer({ contactEmail }: FooterProps) {
    return (
        <footer className="bg-[#7f1d1d] text-white text-center py-6 px-4 md:px-[10%] text-sm md:text-base">
            <p className="mb-2">
                © {new Date().getFullYear()} Workshop Archive | Designed by Brenjit Hazarika
            </p>
            <p>
                Contact:{" "}
                <a href={`mailto:${contactEmail}`} className="font-bold underline hover:text-gray-200 transition-colors">
                    {contactEmail}
                </a>
            </p>
        </footer>
    );
}
