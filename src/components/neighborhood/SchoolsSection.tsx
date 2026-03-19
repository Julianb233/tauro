import { GraduationCap, Star } from "lucide-react";
import type { School } from "@/data/neighborhoods";

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 10 }, (_, i) => (
        <Star
          key={i}
          className={`size-3.5 ${
            i < rating
              ? "fill-gold text-gold"
              : "fill-transparent text-border/60"
          }`}
          strokeWidth={1.5}
        />
      ))}
      <span className="ml-1.5 text-sm font-semibold text-foreground">
        {rating}/10
      </span>
    </div>
  );
}

export function SchoolsSection({
  schools,
  neighborhoodName,
}: {
  schools: School[];
  neighborhoodName: string;
}) {
  return (
    <section className="border-t border-border/40 bg-cream py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-gold/10">
            <GraduationCap className="size-5 text-gold" />
          </div>
          <div>
            <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Education
            </p>
            <h2 className="font-heading text-3xl font-bold text-foreground">
              Schools Near {neighborhoodName}
            </h2>
          </div>
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-border/40">
                <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  School
                </th>
                <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Type
                </th>
                <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Rating
                </th>
                <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Grades
                </th>
                <th className="pb-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Distance
                </th>
              </tr>
            </thead>
            <tbody>
              {schools.map((school) => (
                <tr
                  key={school.name}
                  className="border-b border-border/20 transition-colors hover:bg-white/60"
                >
                  <td className="py-4 font-medium text-foreground">
                    {school.name}
                  </td>
                  <td className="py-4">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        school.type === "Private"
                          ? "bg-gold/10 text-gold"
                          : school.type === "Magnet"
                            ? "bg-purple-100 text-purple-700"
                            : school.type === "Charter"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      {school.type}
                    </span>
                  </td>
                  <td className="py-4">
                    <RatingStars rating={school.rating} />
                  </td>
                  <td className="py-4 text-sm text-muted-foreground">
                    {school.grades}
                  </td>
                  <td className="py-4 text-right text-sm text-muted-foreground">
                    {school.distance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
