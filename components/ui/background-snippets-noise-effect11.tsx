"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

/** Inline Noise overlay (no external imports). */
interface NoiseProps {
  patternSize?: number;
  patternScaleX?: number;
  patternScaleY?: number;
  patternRefreshInterval?: number;
  patternAlpha?: number; // 0–255
}

const Noise: React.FC<NoiseProps> = ({
  patternSize = 250, // (reserved for future scaling)
  patternScaleX = 1, // (reserved)
  patternScaleY = 1, // (reserved)
  patternRefreshInterval = 2,
  patternAlpha = 15,
}) => {
  const grainRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let frame = 0;
    let animationId = 0;
    const canvasSize = 1024;

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      // Cover viewport
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
    };

    const drawGrain = () => {
      const imageData = ctx.createImageData(canvasSize, canvasSize);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = patternAlpha;
      }
      ctx.putImageData(imageData, 0, 0);
    };

    const loop = () => {
      if (frame % patternRefreshInterval === 0) drawGrain();
      frame++;
      animationId = window.requestAnimationFrame(loop);
    };

    window.addEventListener("resize", resize);
    resize();
    loop();

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationId);
    };
  }, [
    patternSize,
    patternScaleX,
    patternScaleY,
    patternRefreshInterval,
    patternAlpha,
  ]);

  return (
    <canvas
      ref={grainRef}
      className="pointer-events-none absolute inset-0"
      style={{ imageRendering: "pixelated" }}
    />
  );
};

type BackgroundVariant = "blue" | "purple";

const VARIANT_STYLES: Record<
  BackgroundVariant,
  { spotlight: string; gridColor: string }
> = {
  blue: {
    spotlight:
      "radial-gradient(circle 620px at 50% 200px, rgba(37, 99, 235, 0.35), transparent 70%)",
    gridColor: "#94a3b81f",
  },
  purple: {
    spotlight:
      "radial-gradient(circle 620px at 50% 200px, rgba(124, 58, 237, 0.35), transparent 70%)",
    gridColor: "#a78bfa1f",
  },
};

type BackgroundSnippetsNoiseEffect11Props = {
  variant?: BackgroundVariant;
  className?: string;
};

/** Grid spotlight + noise (matches 21st.dev live preview). */
export default function BackgroundSnippetsNoiseEffect11({
  variant = "blue",
  className,
}: BackgroundSnippetsNoiseEffect11Props) {
  const { spotlight, gridColor } = VARIANT_STYLES[variant];

  return (
    <div
      className={cn("bg-slate-950", className)}
      aria-hidden="true"
    >
      <div className="absolute inset-0" style={{ background: spotlight }} />
      <div
        className="pointer-events-none absolute inset-0 bg-[size:22px_22px] [mask-image:radial-gradient(ellipse_85%_55%_at_50%_15%,#000_75%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_85%_55%_at_50%_15%,#000_75%,transparent_100%)] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat]"
        style={{
          backgroundImage: `linear-gradient(to right, ${gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)`,
        }}
      />
      <Noise patternRefreshInterval={2} patternAlpha={18} />
    </div>
  );
}
