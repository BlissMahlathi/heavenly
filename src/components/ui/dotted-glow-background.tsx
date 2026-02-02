import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DottedGlowBackgroundProps {
  className?: string;
  children?: ReactNode;
  opacity?: number;
  gap?: number;
  radius?: number;
  colorLightVar?: string;
  glowColorLightVar?: string;
  colorDarkVar?: string;
  glowColorDarkVar?: string;
  backgroundOpacity?: number;
  speedMin?: number;
  speedMax?: number;
  speedScale?: number;
}

export const DottedGlowBackground = ({
  className,
  children,
  opacity = 1,
  gap = 12,
  radius = 1.8,
  colorLightVar = "--color-neutral-500",
  glowColorLightVar = "--color-primary-500",
  colorDarkVar = "--color-neutral-500",
  glowColorDarkVar = "--color-primary-400",
  backgroundOpacity = 0.35,
  speedMin = 0.6,
  speedMax = 1.2,
  speedScale = 1,
}: DottedGlowBackgroundProps) => {
  const style: CSSProperties = {
    "--dgb-gap": `${gap}px`,
    "--dgb-radius": `${radius}px`,
    "--dgb-color-light": `var(${colorLightVar}, rgba(148, 163, 184, 0.5))`,
    "--dgb-glow-light": `var(${glowColorLightVar}, rgba(59, 130, 246, 0.35))`,
    "--dgb-color-dark": `var(${colorDarkVar}, rgba(148, 163, 184, 0.45))`,
    "--dgb-glow-dark": `var(${glowColorDarkVar}, rgba(56, 189, 248, 0.4))`,
    "--dgb-bg-opacity": backgroundOpacity,
    "--dgb-speed-min": `${speedMin * speedScale}s`,
    "--dgb-speed-max": `${speedMax * speedScale}s`,
    opacity,
  } as CSSProperties;

  return (
    <div
      className={cn("absolute inset-0 overflow-hidden", className)}
      style={style}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundSize: "var(--dgb-gap) var(--dgb-gap)",
          backgroundImage:
            "radial-gradient(circle, var(--dgb-color-light) 1px, transparent var(--dgb-radius))",
          opacity: "var(--dgb-bg-opacity)",
        }}
      />
      <div
        className="absolute inset-0 blur-3xl mix-blend-screen"
        style={{
          background:
            "radial-gradient(40% 40% at 25% 20%, var(--dgb-glow-light), transparent), " +
            "radial-gradient(35% 35% at 70% 30%, var(--dgb-glow-dark), transparent), " +
            "radial-gradient(45% 45% at 40% 75%, var(--dgb-glow-light), transparent)",
          animation: `dgb-glow var(--dgb-speed-max) ease-in-out infinite alternate`,
        }}
      />
      <div
        className="absolute inset-0 blur-2xl mix-blend-screen"
        style={{
          background:
            "radial-gradient(50% 50% at 60% 20%, var(--dgb-glow-dark), transparent), " +
            "radial-gradient(30% 30% at 30% 60%, var(--dgb-glow-light), transparent)",
          animation: `dgb-glow var(--dgb-speed-min) ease-in-out infinite alternate-reverse`,
        }}
      />
      <style>
        {`@keyframes dgb-glow { from { transform: translate3d(0,0,0); } to { transform: translate3d(6px, -6px, 0); } }`}
      </style>
      {children}
    </div>
  );
};
