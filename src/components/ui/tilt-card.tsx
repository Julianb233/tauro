"use client";

import { useState, useRef, useCallback, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxTilt?: number;
}

export function TiltCard({
  children,
  className,
  maxTilt = 8,
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState(
    "perspective(800px) rotateX(0deg) rotateY(0deg)"
  );
  const [transition, setTransition] = useState("transform 0.15s ease-out");

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const halfWidth = rect.width / 2;
      const halfHeight = rect.height / 2;

      const rotateY = ((e.clientX - centerX) / halfWidth) * maxTilt;
      const rotateX = -((e.clientY - centerY) / halfHeight) * maxTilt;

      setTransform(
        `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`
      );
      setTransition("transform 0.15s ease-out");
    },
    [maxTilt]
  );

  const handleMouseLeave = useCallback(() => {
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg)");
    setTransition("transform 0.4s ease-out");
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(className)}
      style={{
        transform,
        transition,
        willChange: "transform",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
}
