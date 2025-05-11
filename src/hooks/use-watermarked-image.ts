import { useState, useEffect } from "react";

const imageCache = new Map<string, string>();

export const useWatermarkedImage = (originalUrl: string, isInView: boolean) => {
  const [watermarkedUrl, setWatermarkedUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!isInView) return;

    const getWatermarkedImage = async () => {
      try {
        if (imageCache.has(originalUrl)) {
          setWatermarkedUrl(imageCache.get(originalUrl)!);
          return;
        }

        setIsLoading(true);
        const imageResponse = await fetch(originalUrl);
        const imageBlob = await imageResponse.blob();

        const watermarkResponse = await fetch(
          "https://us-central1-copilot-take-home.cloudfunctions.net/watermark",
          {
            method: "POST",
            body: imageBlob,
            headers: {
              "Content-Type": "application/octet-stream",
              "Content-Length": imageBlob.size.toString(),
            },
          }
        );

        const watermarkedBlob = await watermarkResponse.blob();
        const url = URL.createObjectURL(watermarkedBlob);

        imageCache.set(originalUrl, url);
        setWatermarkedUrl(url);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to watermark image")
        );
        setWatermarkedUrl(originalUrl);
      } finally {
        setIsLoading(false);
      }
    };

    getWatermarkedImage();
  }, [originalUrl, isInView]);

  // Cleanup function
  useEffect(() => {
    return () => {
      if (watermarkedUrl.startsWith("blob:") && !imageCache.has(originalUrl)) {
        URL.revokeObjectURL(watermarkedUrl);
      }
    };
  }, [watermarkedUrl, originalUrl]);

  return { watermarkedUrl, isLoading, error };
};
