export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Tauro made our first home purchase in Rittenhouse completely seamless. Their knowledge of the Philadelphia market is unmatched.",
    name: "Sarah & Michael Chen",
    role: "Homebuyers — Rittenhouse Square",
    rating: 5,
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
];
