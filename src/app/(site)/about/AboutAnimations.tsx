"use client";

import { CountUp, StaggerReveal, FadeInView } from "@/components/animations";

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

export { FadeInView };
