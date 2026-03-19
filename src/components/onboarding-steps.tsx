/* ------------------------------------------------------------------ */
/*  Onboarding data                                                    */
/* ------------------------------------------------------------------ */

const onboardingSteps = [
  {
    step: "01",
    title: "Secure Your Spot",
    description:
      "Complete your $5,500 deposit to lock in your build slot. We only take 2 builds per month to ensure quality.",
  },
  {
    step: "02",
    title: "Kickoff Call",
    description:
      "30-minute strategy session within 48 hours. We cover brand direction, must-haves, and timeline.",
  },
  {
    step: "03",
    title: "Asset Collection",
    description:
      "Share logos, headshots, property photos, and brand guidelines. We provide a checklist.",
  },
  {
    step: "04",
    title: "Build Begins",
    description:
      "You get a private Slack channel and weekly progress updates with live preview links.",
  },
  {
    step: "05",
    title: "Review and Launch",
    description:
      "Final review, revisions, domain connection, and go-live. Plus 30 days of post-launch support.",
  },
];

/* ------------------------------------------------------------------ */
/*  OnboardingSteps                                                    */
/* ------------------------------------------------------------------ */

export function OnboardingSteps() {
  return (
    <section
      id="onboarding"
      className="mx-auto max-w-5xl scroll-mt-20 px-6 py-20"
    >
      <p className="text-sm font-medium tracking-[0.2em] text-gold uppercase">
        Next Steps
      </p>
      <h2 className="mt-2 font-heading text-3xl font-bold md:text-4xl">
        Getting Started Is Simple
      </h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        From payment to launch, here is exactly what happens next.
      </p>

      <div className="mt-12 space-y-6">
        {onboardingSteps.map((s) => (
          <div
            key={s.step}
            className="flex gap-6 rounded-xl border border-border bg-card p-6 transition-colors hover:border-gold/30"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/10 font-heading text-lg font-bold text-gold">
              {s.step}
            </span>
            <div>
              <h3 className="font-heading text-lg font-bold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {s.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
