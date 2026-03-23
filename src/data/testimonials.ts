export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  rating: number;
  videoUrl?: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Tauro made our first home purchase in Rittenhouse completely seamless. Their knowledge of the Philadelphia market is unmatched.",
    name: "Sarah & Michael Chen",
    role: "Homebuyers — Rittenhouse Square",
    rating: 5,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WcXgQ",
  },
  {
    quote:
      "We listed with three other brokerages before finding Tauro. They sold our Fishtown townhouse in 6 days, $40K over asking.",
    name: "David Okafor",
    role: "Seller — Fishtown",
    rating: 5,
  },
  {
    quote:
      "The level of service and market insight Tauro provides is on par with the best brokerages in New York. Philadelphia is lucky to have them.",
    name: "Maria & James Patterson",
    role: "Investors — Center City",
    rating: 5,
  },
  {
    quote:
      "From the initial consultation to closing day, Tauro guided us through every step. We found our dream home in Graduate Hospital within two weeks.",
    name: "Jessica Thornton",
    role: "Homebuyer — Graduate Hospital",
    rating: 5,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WcXgQ",
  },
  {
    quote:
      "Tauro's team handled the sale of our Old City condo with incredible professionalism. Their staging advice alone added significant value to the final price.",
    name: "Robert & Linda Zhao",
    role: "Sellers — Old City",
    rating: 5,
  },
  {
    quote:
      "As an out-of-state investor, I needed a brokerage I could trust. Tauro managed everything remotely and secured two rental properties in Northern Liberties for me.",
    name: "Andre Williams",
    role: "Investor — Northern Liberties",
    rating: 5,
  },
];
