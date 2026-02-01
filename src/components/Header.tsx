import React from "react";
import Image from "next/image";

interface HeaderProps {
  title: string;
  subtitle: string;
  dates: string;
  venue: string;
  contactEmail: string;
}

export function Header({ title, subtitle, dates, venue, contactEmail }: HeaderProps) {
  return (
    <header className="bg-gradient-to-br from-workshop-accent to-[#7f1d1d] text-white py-8 px-6 md:px-[10%] text-center shadow-lg">
      <div className="flex justify-center mb-6">
        <Image
          src="/logos.svg"
          alt="Institute Logos"
          width={175}
          height={48}
          className="h-16 md:h-20 w-auto"
        />
      </div>
      <h1 className="text-3xl md:text-4xl font-black mb-3 tracking-tight">
        {title}
      </h1>
      <p className="text-lg md:text-xl opacity-90 mb-6 font-medium">
        {subtitle}
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        <Pill icon="📅" text={dates} />
        <Pill icon="📍" text={venue} />
        <Pill icon="✉️" text={contactEmail} />
      </div>
    </header>
  );
}

function Pill({ icon, text }: { icon: string; text: string }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm md:text-base text-white bg-white/20 border border-white/30 backdrop-blur-md shadow-sm">
      <span>{icon}</span>
      <span>{text}</span>
    </span>
  );
}
