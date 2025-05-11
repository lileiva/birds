import { FC, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Loader2 } from "lucide-react";

interface BirdCardProps {
  values: {
    id: string;
    thumbnailUrl: string;
    englishName: string;
    latinName: string;
  };
}

export const BirdCard: FC<BirdCardProps> = ({
  values: { id, thumbnailUrl, englishName, latinName },
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

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
    <Link to={`/birds/${id}`} className="sm:w-[168px]">
      <AspectRatio ratio={16 / 9}>
        <img
          ref={imgRef}
          src={isInView ? thumbnailUrl : ""}
          alt={englishName}
          loading="lazy"
          decoding="async"
          className={`
            w-full h-full object-cover rounded-lg 
            transition-opacity duration-300
            ${isLoaded ? "opacity-100" : "opacity-0"}
          `}
          onLoad={() => setIsLoaded(true)}
        />
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        )}
      </AspectRatio>
      <div className="pt-3">
        <h3 className="text-[16px]  leading-[24px] font-medium text-[#0D171C] text-foreground">
          {englishName}
        </h3>
        <p className="text-[14px] leading-[21px] text-[#4F7A96]">{latinName}</p>
      </div>
    </Link>
  );
};
