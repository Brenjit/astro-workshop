import { Header } from "@/components/Header";
import { ImageSlider } from "@/components/ImageSlider";
import { IntroSection } from "@/components/IntroSection";
import { GalleryGrid } from "@/components/GalleryGrid";
import { SlidesList } from "@/components/SlidesList";
import { getSliderImages, getGalleryPhotos, getSlides } from "@/lib/data";

const CONFIG = {
  title: "Workshop on Introduction to Astronomy & Astrophysics",
  subtitle: "Department of Physics, IIT Tirupati | In Collaboration with IUCAA & IISER Tirupati",
  dates: "24–25 January 2026",
  venue: "IIT Tirupati, Tirupati",
  contactEmail: "aa_workshop_2026@iittp.ac.in",
};

export default async function Home() {
  const sliderImages = await getSliderImages();
  const galleryPhotos = await getGalleryPhotos();
  const slides = await getSlides();

  return (
    <div className="min-h-screen bg-workshop-bg text-workshop-text font-sans">
      <Header
        title={CONFIG.title}
        subtitle={CONFIG.subtitle}
        dates={CONFIG.dates}
        venue={CONFIG.venue}
        contactEmail={CONFIG.contactEmail}
      />

      {/* Slider Section */}
      <ImageSlider images={sliderImages} />

      {/* Intro / Metadata */}
      <IntroSection
        dates={CONFIG.dates}
        venue={CONFIG.venue}
        contactEmail={CONFIG.contactEmail}
      />

      {/* Slides Section */}
      <SlidesList slides={slides} />

      {/* Gallery Section */}
      <GalleryGrid photos={galleryPhotos} />
    </div>
  );
}
