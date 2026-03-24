const videos = [
  {
    id: "K9TZZrtwvkA",
    title: "Touring a $2.5M Estate in Philadelphia",
  },
  {
    id: "WRL27u6B5p4",
    title: "Inside a Massive $7M Luxury Home — Philadelphia",
  },
  {
    id: "S3WzfJnoRcU",
    title: "Inside a $15M Luxury Condo — The Dilworth, Center City",
  },
  {
    id: "8CwaFvzklbE",
    title: "Luxury Home Tour — Fishtown, Philadelphia",
  },
  {
    id: "ev7nhD-EE6M",
    title: "New Construction Showcase — Germantown, Philadelphia",
  },
  {
    id: "qLcBAyVOElw",
    title: "Former Bank Revamped Into Stunning Paris-Inspired Apartment",
  },
];

export default function VideoShowcase() {
  return (
    <section className="bg-foreground py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Property Tours
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-white sm:text-4xl">
            Explore Philadelphia Homes
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">
            Step inside some of Philadelphia&apos;s finest properties with our
            exclusive video tours. See the craftsmanship, the neighborhoods, and
            the lifestyle before you visit in person.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <div key={video.id} className="group">
              <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-black shadow-lg transition-all duration-300 group-hover:border-gold/30 group-hover:shadow-gold/10">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                  loading="lazy"
                />
              </div>
              <p className="mt-3 text-sm font-medium text-white/70 transition-colors group-hover:text-gold">
                {video.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
