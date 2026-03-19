"use client";

import { CountUp, StaggerReveal, FadeInView, ParallaxSection } from "@/components/animations";

export function AboutCountUp({ value, className }: { value: string; className?: string }) {
  return <CountUp value={value} duration={2.2} className={className} />;
}

export function AboutStaggerReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <StaggerReveal className={className} stagger={0.12}>
      {children}
    </StaggerReveal>
  );
}

export function AboutParallax({
  children,
  speed,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  return (
    <ParallaxSection speed={speed} className={className}>
      {children}
    </ParallaxSection>
  );
}

export { FadeInView };
