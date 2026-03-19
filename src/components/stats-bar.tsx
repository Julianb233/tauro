export default function StatsBar() {
  return (
    <section className="border-y border-white/10 bg-foreground">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:gap-8 sm:px-6 sm:py-14 md:grid-cols-4 lg:px-8">
        {[
          { value: "500+", label: "Properties Sold" },
          { value: "15", label: "Neighborhoods" },
          { value: "$2.1B", label: "Total Volume" },
          { value: "98%", label: "Client Satisfaction" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-heading text-2xl font-bold text-gold sm:text-3xl md:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-white/70 sm:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
