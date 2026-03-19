"use client";

import { useRef, useState, useEffect } from "react";

function scoreColor(score: number): string {
  if (score >= 90) return "#22c55e"; // green-500
  if (score >= 70) return "#c9a96e"; // gold
  if (score >= 50) return "#f59e0b"; // amber-500
  return "#ef4444"; // red-500
}

function scoreLabel(score: number): string {
  if (score >= 90) return "Walker's Paradise";
  if (score >= 70) return "Very Walkable";
  if (score >= 50) return "Somewhat Walkable";
  return "Car-Dependent";
}

function CircularScore({
  score,
  label,
  sublabel,
}: {
  score: number;
  label: string;
  sublabel?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;
  const color = scoreColor(score);

  useEffect(() => {
    let cancelled = false;

    const animate = async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);
        if (cancelled) return;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: score,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            if (!cancelled) setAnimatedScore(Math.round(obj.val));
          },
        });
      } catch {
        setAnimatedScore(score);
      }
    };

    animate();
    return () => {
      cancelled = true;
    };
  }, [score]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative size-32">
        <svg className="size-full -rotate-90" viewBox="0 0 128 128">
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-white/10"
          />
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.1s ease-out" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-heading text-3xl font-bold text-white">
            {animatedScore}
          </span>
        </div>
      </div>
      <p className="mt-3 font-heading text-sm font-bold text-white">{label}</p>
      {sublabel && (
        <p className="mt-0.5 text-xs text-white/50">{sublabel}</p>
      )}
    </div>
  );
}

export function ScoreGauges({
  walkScore,
  transitScore,
  bikeScore,
}: {
  walkScore: number;
  transitScore: number;
  bikeScore: number;
}) {
  return (
    <section className="bg-foreground py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
          Walkability & Transit
        </p>
        <h2 className="mt-2 font-heading text-3xl font-bold text-white">
          Neighborhood Scores
        </h2>

        <div className="mt-10 flex flex-wrap justify-center gap-12 sm:gap-16 lg:gap-24">
          <CircularScore
            score={walkScore}
            label="Walk Score"
            sublabel={scoreLabel(walkScore)}
          />
          <CircularScore
            score={transitScore}
            label="Transit Score"
            sublabel={
              transitScore >= 70
                ? "Excellent Transit"
                : transitScore >= 50
                  ? "Good Transit"
                  : "Some Transit"
            }
          />
          <CircularScore
            score={bikeScore}
            label="Bike Score"
            sublabel={
              bikeScore >= 90
                ? "Biker's Paradise"
                : bikeScore >= 70
                  ? "Very Bikeable"
                  : "Bikeable"
            }
          />
        </div>
      </div>
    </section>
  );
}
