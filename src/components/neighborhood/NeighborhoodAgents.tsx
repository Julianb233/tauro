import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, ArrowRight } from "lucide-react";
import { agents, type Agent } from "@/data/agents";

function getAgentsForNeighborhood(neighborhoodName: string): Agent[] {
  return agents.filter((agent) =>
    agent.neighborhoods.some(
      (n) => n.toLowerCase() === neighborhoodName.toLowerCase()
    )
  );
}

export function NeighborhoodAgents({
  neighborhoodName,
}: {
  neighborhoodName: string;
}) {
  const matchedAgents = getAgentsForNeighborhood(neighborhoodName);
  if (matchedAgents.length === 0) return null;

  return (
    <section className="border-t border-border/40 bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
          Local Experts
        </p>
        <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
          {neighborhoodName} Specialists
        </h2>
        <p className="mt-2 text-muted-foreground">
          Our agents who know {neighborhoodName} inside and out.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {matchedAgents.map((agent) => (
            <Link
              key={agent.id}
              href={`/agents/${agent.slug}`}
              className="group rounded-xl border border-border/40 bg-card p-6 transition-all hover:border-gold/40 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={agent.photo}
                    alt={agent.fullName}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-gold transition-colors">
                    {agent.fullName}
                  </h3>
                  <p className="text-sm text-muted-foreground">{agent.title}</p>
                </div>
              </div>

              <p className="mt-4 line-clamp-2 text-sm text-muted-foreground">
                {agent.shortBio}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {agent.specialties.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-gold/10 px-2.5 py-0.5 text-xs font-medium text-gold"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border/40 pt-4">
                <div className="text-center">
                  <p className="font-heading text-xl font-bold text-gold">
                    {agent.stats.propertiesSold}
                  </p>
                  <p className="text-xs text-muted-foreground">Homes Sold</p>
                </div>
                <div className="text-center">
                  <p className="font-heading text-xl font-bold text-gold">
                    {agent.stats.yearsExperience}+
                  </p>
                  <p className="text-xs text-muted-foreground">Years Exp.</p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-gold">
                View Profile <ArrowRight className="size-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
