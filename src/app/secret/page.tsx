"use client";
import Image from "next/image";
import SnowfallBackground from "@/components/SnowfallBackground";
import { useEffect, useState } from "react";
import { checkValidation } from "@/actions/checkValidation";

const Preloader = ({ onLoad }: { onLoad: () => void }) => {
  const [loadedImages, setLoadedImages] = useState(new Set<string>());
  const imagePaths = [
    "/recruitment_text.png",
    "/mountain.png",
    "/sword.png",
    "/snow_bg.png",
  ];

  useEffect(() => {
    if (loadedImages.size === imagePaths.length) {
      onLoad();
    }
  }, [loadedImages, imagePaths.length, onLoad]);

  const handleImageLoad = (path: string) => {
    setLoadedImages((prev) => new Set(prev).add(path));
  };

  return (
    <div className="hidden">
      {imagePaths.map((path) => (
        <Image
          key={path}
          src={path}
          alt=""
          width={1920}
          height={1080}
          onLoadingComplete={() => handleImageLoad(path)}
          priority
        />
      ))}
    </div>
  );
};

const Page = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [phrase, setPhrase] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [startAnimations, setStartAnimations] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const UNLOCK_PHRASE = "JOY-FROST-LIGHT-STARS-KRAMPUS";

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const x = (e.clientX - window.innerWidth / 2) / 100;
      const y = (e.clientY - window.innerHeight / 2) / 100;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkMobile);
    };
  }, [isMobile]);

  const getParallaxStyle = (strength: number) => {
    if (isMobile) return {};
    return {
      transform: `translate3d(${mousePosition.x * -strength}px, ${
        mousePosition.y * -strength
      }px, ${strength * 10}px)`,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagesLoaded || !phrase) return;

    if (await checkValidation(phrase)) {
      setIsUnlocked(true);
      setTimeout(() => setStartAnimations(true), 100);
    }
  };

  const handlePhraseInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhrase(e.target.value);
  };

  if (!isUnlocked) {
    return (
      <div className="frost-container">
        <Preloader onLoad={() => setImagesLoaded(true)} />
        <div className="frost-wrapper">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              className="frost-input"
              placeholder={
                imagesLoaded
                  ? "Enter the winter phrase..."
                  : "Loading assets..."
              }
              value={phrase}
              onChange={handlePhraseInput}
              disabled={!imagesLoaded}
              autoFocus
            />
            <button
              type="submit"
              disabled={!imagesLoaded}
              className="frost-button"
            >
              Submit
            </button>
          </form>
          <p className="text-center mt-4 text-white/70 text-sm">
            {imagesLoaded
              ? "Speak the ancient winter phrase to reveal the path..."
              : "Preparing the winter landscape..."}
          </p>
        </div>
        <SnowfallBackground />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden parallax-container">
      <div className="vignette-overlay layer-0" style={getParallaxStyle(5)} />

      <Image
        src="/recruitment_text.png"
        alt="mountain"
        width={1920}
        height={1080}
        className={`absolute bottom-0 left-0 m-auto right-0 top-0 w-[90vw] md:w-[42rem] ${
          startAnimations ? "fade-in" : "opacity-0"
        } layer-3 text-glow emphasis-layer`}
        style={getParallaxStyle(15)}
      />
      <Image
        src="/mlsaLogo.webp"
        alt="MLSA KIIT Logo"
        width={1920}
        height={1080}
        className="absolute m-auto w-32 md:w-40 left-0 right-0 top-[10%] z-20 fade-in"
      />

      <Image
        src="/mountain.png"
        alt="snow"
        width={1920}
        height={1080}
        className="absolute left-0 bottom-0 md:-bottom-96 w-screen layer-2 object-contain md:object-cover"
        style={getParallaxStyle(10)}
        priority
      />

      <Image
        src="/sword.png"
        alt="sword"
        height={1080}
        width={1920}
        className={`absolute right-0 top-0 bottom-0 left-0 m-auto w-[95vw] md:w-[70vw] ${
          startAnimations ? "sword-animate" : "opacity-0"
        } layer-1`}
        style={getParallaxStyle(8)}
      />

      <div
        className="absolute left-0 bottom-0 bg-blue-200 w-screen h-16 md:h-32 layer-0"
        style={getParallaxStyle(5)}
      />

      <Image
        src="/snow_bg.png"
        alt="snow"
        height={1080}
        width={1920}
        className="absolute bottom-0 m-auto left-0 w-screen"
        style={{
          ...getParallaxStyle(5),
          objectPosition: isMobile ? "center bottom" : "center center",
        }}
        priority
      />
      <SnowfallBackground />
    </div>
  );
};

export default Page;
