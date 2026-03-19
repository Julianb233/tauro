export default function StatsBar() {
  return (
    <section className="border-y border-white/10 bg-foreground">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        {[
          { value: "500+", label: "Properties Sold" },
          { value: "15", label: "Neighborhoods" },
          { value: "$2.1B", label: "Total Volume" },
          { value: "98%", label: "Client Satisfaction" },
        ].map((stat) => (
          <div key={stat.label} className="glass-stat px-4 py-6 text-center">
            <p className="font-heading text-3xl font-bold text-gold sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-white/60">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
