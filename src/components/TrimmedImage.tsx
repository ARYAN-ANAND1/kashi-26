import React, { useEffect, useState } from "react";

type Props = {
  src: string;
  alt?: string;
  className?: string;
  alphaThreshold?: number; // 0-255
};

const TrimmedImage: React.FC<Props> = ({ src, alt = "", className, alphaThreshold = 1 }) => {
  const [trimmedSrc, setTrimmedSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!src) {
      setTrimmedSrc(null);
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous"; // requires CORS on the image host
    img.src = src;

    const handleLoad = () => {
      try {
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        if (!w || !h) {
          setTrimmedSrc(src);
          return;
        }

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setTrimmedSrc(src);
          return;
        }

        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, w, h).data;

        let minX = w, minY = h, maxX = 0, maxY = 0;
        let found = false;
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const idx = (y * w + x) * 4 + 3; 
            if (data[idx] > alphaThreshold) {
              found = true;
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }
          }
        }

        if (!found) {
          // fully transparent -> fallback to original
          setTrimmedSrc(src);
          return;
        }

        const cropW = maxX - minX + 1;
        const cropH = maxY - minY + 1;
        const out = document.createElement("canvas");
        out.width = cropW;
        out.height = cropH;
        const outCtx = out.getContext("2d");
        if (!outCtx) {
          setTrimmedSrc(src);
          return;
        }
        outCtx.drawImage(canvas, minX, minY, cropW, cropH, 0, 0, cropW, cropH);
        setTrimmedSrc(out.toDataURL());
      } catch (e) {
        // on error (CORS or others) fall back to original src
        setTrimmedSrc(src);
      }
    };

    const handleError = () => setTrimmedSrc(src);

    img.addEventListener("load", handleLoad);
    img.addEventListener("error", handleError);
    return () => {
      img.removeEventListener("load", handleLoad);
      img.removeEventListener("error", handleError);
    };
  }, [src, alphaThreshold]);

  // while processing, show original to avoid blank
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img src={trimmedSrc ?? src} alt={alt} className={className} />
  );
};

export default TrimmedImage;