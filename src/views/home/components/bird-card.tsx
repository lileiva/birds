import { FC, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useWatermarkedImage } from "@/hooks/use-watermarked-image";

interface BirdCardProps {
  values: {
    id: string;
    thumbnailUrl: string;
    englishName: string;
    latinName: string;
    isVisible?: boolean;
  };
}

export const BirdCard: FC<BirdCardProps> = ({
  values: { id, thumbnailUrl, englishName, latinName, isVisible = true },
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const { watermarkedUrl, isLoading } = useWatermarkedImage(
    thumbnailUrl,
    isInView
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Link
      to={`/birds/${id}`}
      className={`sm:w-[168px] transition-opacity duration-300 ${
        isVisible
          ? "opacity-100"
          : "opacity-0 absolute pointer-events-none duration-[0ms]"
      }`}
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
    >
      <AspectRatio ratio={16 / 9}>
        <img
          ref={imgRef}
          src={isInView && watermarkedUrl ? watermarkedUrl : undefined}
          alt={englishName}
          loading="lazy"
          decoding="async"
          className={`
            w-full h-full object-cover rounded-lg 
            transition-opacity duration-300
            ${isLoaded ? "opacity-100" : "opacity-0 "}
          `}
          onLoad={() => setIsLoaded(true)}
        />
        {(!isLoaded || isLoading) && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-400 animate-pulse  rounded-lg"></div>
        )}
      </AspectRatio>
      <div className="pt-3">
        <h3 className="text-[16px] leading-[24px] font-medium text-[#0D171C]">
          {englishName}
        </h3>
        <p className="text-[14px] leading-[21px] text-[#4F7A96]">{latinName}</p>
      </div>
    </Link>
  );
};
