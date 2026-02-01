import React from "react";

interface IntroSectionProps {
    dates: string;
    venue: string;
    contactEmail: string;
}

export function IntroSection({ dates, venue, contactEmail }: IntroSectionProps) {
    return (
        <section className="py-[60px] px-6 md:px-[10%] bg-white border-t border-workshop-line">
            <h2 className="text-3xl font-black mb-5 border-l-[7px] border-workshop-accent pl-3 text-workshop-text">
                Workshop Archive
            </h2>
            <p className="leading-relaxed text-lg text-gray-700 mb-4">
                This page hosts the official <b>slides</b> and a <b>photo gallery</b> from the Workshop on Introduction to Astronomy & Astrophysics
                conducted on {dates} at {venue} in collaboration with IISER Tirupati & IUCAA.
            </p>
            <p className="leading-relaxed text-lg text-gray-700 mb-4">
                For any queries, please email{" "}
                <a
                    href={`mailto:${contactEmail}`}
                    className="text-workshop-accent font-black hover:underline"
                >
                    {contactEmail}
                </a>.
            </p>
        </section>
    );
}
