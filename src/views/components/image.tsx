import { useWatermarkedImage } from "@/hooks/use-watermarked-image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useEffect, useRef, useState } from "react";
import { FC } from "react";

interface ImageProps {
  src: string;
  alt: string;
  ratio?: number;
  className?: string;
  enableIntersectionObserver?: boolean;
  enableZoom?: boolean;
}

export const Image: FC<ImageProps> = ({
  src,
  alt,
  ratio = 16 / 9,
  className = "",
  enableIntersectionObserver = false,
  enableZoom = false,
}: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!enableIntersectionObserver);
  const [isZoomed, setIsZoomed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { watermarkedUrl, isLoading } = useWatermarkedImage(src, isInView);

  useEffect(() => {
    if (!enableIntersectionObserver) return;

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
  }, [enableIntersectionObserver]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableZoom) return;
    if (!isZoomed || !containerRef.current || !imgRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    imgRef.current.style.transform = `scale3d(2, 2, 1)`;
    imgRef.current.style.transformOrigin = `${x}% ${y}%`;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!enableZoom) return;
    if (!containerRef.current || !imgRef.current) return;
    if (!isZoomed) {
      setScale(2);
    }
    e.preventDefault(); // Prevent page zoom

    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    const y = ((touch.clientY - rect.top) / rect.height) * 100;

    imgRef.current.style.transform = `scale3d(2, 2, 1)`;
    imgRef.current.style.transformOrigin = `${x}% ${y}%`;
  };

  const handleLeave = () => {
    if (enableZoom) {
      setIsZoomed(false);
      if (imgRef.current) {
        imgRef.current.style.transform = `scale3d(1, 1, 1)`;
      }
    }
  };

  const handleClick = () => {
    if (enableZoom) {
      const isZoomedCopy = !isZoomed;
      setIsZoomed(isZoomedCopy);
      if (imgRef.current) {
        imgRef.current.style.transform = `scale3d(${isZoomedCopy ? 1 : 2}, ${isZoomedCopy ? 1 : 2}, 1)`;
      }
    }
  };

  return (
    <AspectRatio ratio={ratio}>
      <div
        ref={containerRef}
        onMouseMove={enableZoom ? handleMouseMove : undefined}
        onMouseLeave={enableZoom ? handleLeave : undefined}
        onClick={enableZoom ? handleClick : undefined}
        onTouchStart={enableZoom ? handleClick : undefined}
        onTouchMove={enableZoom ? handleTouchMove : undefined}
        onTouchEnd={enableZoom ? handleLeave : undefined}
        className={`
          relative w-full h-full overflow-hidden rounded-lg
          ${enableZoom ? "cursor-zoom-in touch-none" : ""}
          ${isZoomed ? "cursor-zoom-out" : ""}
          will-change-transform
        `}
      >
        <img
          ref={imgRef}
          src={watermarkedUrl || undefined}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`
            w-full h-full object-cover rounded-lg 
            transition-[opacity,transform] duration-150
            ${isLoaded ? "opacity-100" : "opacity-0"}
            ${isZoomed ? "scale3d(2, 2, 1)" : "scale3d(1, 1, 1)"}
            will-change-transform
            ${className}
          `}
          onLoad={() => setIsLoaded(true)}
        />
        {(!isLoaded || isLoading) && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-400 animate-pulse rounded-lg"></div>
        )}
      </div>
    </AspectRatio>
  );
};
