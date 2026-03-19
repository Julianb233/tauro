export interface SuccessStory {
  id: string;
  slug: string;
  clientName: string;
  clientType: string;
  scenario: string;
  neighborhood: string;
  timeline: string;
  agentName: string;
  agentSlug: string;
  coverImage: string;
  outcome: {
    headline: string;
    details: string[];
  };
  pullQuote: string;
  fullStory: string;
  stats: {
    label: string;
    value: string;
  }[];
}

export const successStories: SuccessStory[] = [
  {
    id: "1",
    slug: "the-r-family-rittenhouse-dream",
    clientName: "The R. Family",
    clientType: "First-Time Luxury Buyers",
    scenario:
      "A young tech executive and her partner were relocating from San Francisco to Philadelphia for a new role at Comcast. They needed to find a luxury condo in Rittenhouse Square within a tight 30-day window — sight unseen for the first two weeks — while navigating a competitive spring market where premium units were receiving multiple offers within hours of listing.",
    neighborhood: "Rittenhouse Square",
    timeline: "28 days from first consultation to closing",
    agentName: "Julian Bradley",
    agentSlug: "julian-bradley",
    coverImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=80",
    outcome: {
      headline: "Secured a $1.2M penthouse 8% under asking",
      details: [
        "Identified an off-market penthouse through Julian's network before it hit MLS",
        "Negotiated $105,000 below the seller's initial price due to pre-inspection leverage",
        "Coordinated a fully virtual tour process for the first two weeks using 3D walkthroughs and FaceTime sessions",
        "Closed in 28 days with zero contingency extensions",
      ],
    },
    pullQuote:
      "Julian understood what we needed before we could articulate it ourselves. Moving across the country is terrifying — but he turned it into something we actually enjoyed. We never once felt like we were making a blind decision.",
    fullStory:
      "When the R. family reached out to Tauro, they were two weeks away from boarding a one-way flight from San Francisco to Philadelphia. They had a clear vision — a modern penthouse within walking distance of Rittenhouse Square with at least two bedrooms, a private terrace, and in-unit laundry — but no local knowledge and no time to waste.\n\nJulian Bradley took the lead immediately. Within 48 hours of the initial call, he had curated a shortlist of eight properties matching their criteria, including two off-market opportunities sourced through his extensive Center City network. He arranged 3D virtual walkthroughs and conducted live FaceTime tours of each unit, walking through every room, testing fixtures, and even showing them the views at different times of day.\n\nBy day ten, the R. family had narrowed their choice to a stunning corner penthouse in a boutique building — a unit that the seller had been quietly shopping to a handful of agents before a formal listing. Julian moved fast, securing a private showing and negotiating directly with the seller's agent. Armed with a pre-inspection report he had commissioned on their behalf, Julian identified deferred maintenance on the building's HVAC system and used it as leverage to negotiate a significant reduction.\n\nThe family flew in on day 18, toured the unit in person for the first time, and confirmed what they already knew — this was home. Julian's team coordinated the remaining paperwork, inspections, and closing logistics with military precision. They received the keys exactly 28 days after that first phone call.",
    stats: [
      { label: "Purchase Price", value: "$1.2M" },
      { label: "Below Asking", value: "$105K" },
      { label: "Days to Close", value: "28" },
      { label: "Virtual Tours", value: "8" },
    ],
  },
  {
    id: "2",
    slug: "david-k-fishtown-flip",
    clientName: "David K.",
    clientType: "Seller — Estate Property",
    scenario:
      "David inherited a three-story Fishtown rowhome from his late grandmother. The property had not been updated since the 1980s, had deferred maintenance throughout, and sat on the market for 47 days with a previous brokerage with zero offers. David was ready to accept a lowball investor offer when a friend recommended he call Tauro for a second opinion.",
    neighborhood: "Fishtown",
    timeline: "6 weeks from re-listing to closing at full ask",
    agentName: "Sofia Martinez",
    agentSlug: "sofia-martinez",
    coverImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80",
    outcome: {
      headline: "Sold for $485K — $90K above the previous listing price",
      details: [
        "Developed a targeted pre-listing renovation plan costing $12K that increased perceived value by over $90K",
        "Professional staging transformed the dated interior into a modern Fishtown aesthetic",
        "Custom social media campaign generated 14,000 impressions and 340 direct inquiries in the first week",
        "Received 6 competitive offers within 5 days of re-listing, ultimately closing at full asking price",
      ],
    },
    pullQuote:
      "I was three days away from selling to a flipper for $395K. Sofia saw what I couldn't — that this house had real value if we just presented it right. She turned my grandmother's house into someone's dream home, and I walked away with almost $100K more than I thought possible.",
    fullStory:
      "When David K. first called Tauro, he was exhausted. His grandmother's Fishtown rowhome — a three-story, 1,800-square-foot property on a quiet block near Frankford Avenue — had sat on the market for 47 days with another brokerage. The listing photos were dim, the description generic, and the pricing strategy was misaligned with the neighborhood's rapidly changing demographic.\n\nSofia Martinez visited the property and immediately saw the potential. The bones were exceptional: original hardwood floors, high ceilings, a south-facing rear yard, and a layout that would appeal to the young professionals flooding into Fishtown. The problem wasn't the house — it was the presentation.\n\nSofia put together a surgical renovation plan. For $12,000, she coordinated fresh paint in modern neutrals, refinished the original hardwood floors, updated light fixtures, replaced the kitchen faucet and hardware, and added contemporary bathroom mirrors. She then brought in Tauro's preferred staging company, which transformed the space into a bright, aspirational Fishtown home that matched the aesthetic buyers in the neighborhood were searching for.\n\nBut the real magic was in the marketing. Sofia's team produced professional twilight photography, a cinematic walkthrough video, and a targeted Instagram and Facebook campaign that reached 14,000 potential buyers in the first week alone. The listing copy told a story — the heritage of the home, the character of the block, the proximity to Fishtown's best restaurants and galleries.\n\nThe results were immediate. The open house drew 43 groups in a single weekend. Within five days, David had six competitive offers on the table. Sofia guided him through each one, weighing not just price but contingencies, financing strength, and closing timelines. The winning bid came in at full asking — $485,000 — from a young couple who had been priced out of three previous Fishtown properties and were willing to waive the appraisal contingency to secure their dream home.",
    stats: [
      { label: "Sale Price", value: "$485K" },
      { label: "Above Previous List", value: "$90K" },
      { label: "Renovation Cost", value: "$12K" },
      { label: "Offers Received", value: "6" },
    ],
  },
  {
    id: "3",
    slug: "the-p-family-chestnut-hill-relocation",
    clientName: "The P. Family",
    clientType: "Corporate Relocation — Family of Five",
    scenario:
      "A family of five was relocating from London to Philadelphia for a two-year corporate assignment. They needed a four-bedroom home in a top-rated school district, had never visited Philadelphia, and had a firm move-in deadline of six weeks. The corporate relocation budget was generous but came with strict expense reporting requirements and a mandated shortlist process.",
    neighborhood: "Chestnut Hill",
    timeline: "5 weeks from first contact to move-in day",
    agentName: "Ava Chen",
    agentSlug: "ava-chen",
    coverImage:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1400&q=80",
    outcome: {
      headline: "Found the perfect family home and enrolled 3 children in top-rated schools — all in 5 weeks",
      details: [
        "Curated 15 properties across three school districts, each with detailed neighborhood profiles and school ratings",
        "Coordinated with the corporate relocation firm to ensure full compliance with expense and documentation requirements",
        "Negotiated a 24-month lease with an option to purchase, protecting the family's flexibility",
        "Arranged school tours, pediatrician referrals, and community introductions before the family arrived",
      ],
    },
    pullQuote:
      "Ava didn't just find us a house — she gave us a life in Philadelphia. When we landed at the airport, our children already had school placements, we had a pediatrician, and our neighbors knew we were coming. That level of care is something we will never forget.",
    fullStory:
      "Moving a family of five across the Atlantic is a logistical marathon. When the P. family's corporate relocation manager connected them with Tauro, the clock was already ticking — they had six weeks until the start of the new assignment, three children who needed school placements, and zero familiarity with Philadelphia's neighborhoods.\n\nAva Chen took command of the process with the organized precision her clients consistently praise. Before the family's first video call, she had already assembled a comprehensive relocation packet: a 30-page guide covering Philadelphia's top school districts, neighborhood profiles for Chestnut Hill, Mount Airy, and the Main Line, commute-time analyses to the Center City office, and a curated list of 15 properties that met their requirements.\n\nDuring the first two weeks, Ava conducted virtual tours of each property, walking the family through not just the homes but the surrounding blocks — pointing out the walking paths, the local coffee shops, the playgrounds, the distance to the nearest train station. She had done this enough times to know that for relocating families, the neighborhood matters as much as the house.\n\nThe family flew in for a four-day house-hunting trip during week three. Ava had scheduled back-to-back tours with military efficiency, including school visits at Springfield Township and Chestnut Hill Academy, and even a Saturday morning at the local farmers' market so the family could experience the community firsthand.\n\nThey fell in love with a four-bedroom stone colonial on a tree-lined street in Chestnut Hill — walking distance to the train, three blocks from a top-rated elementary school, with a backyard that sealed the deal for the children. Ava negotiated a 24-month lease with a purchase option, giving the family flexibility in case the assignment extended or they decided to stay permanently.\n\nBut Ava's work didn't stop at the lease signing. She coordinated furniture delivery, set up utility accounts, provided a list of vetted contractors for minor modifications, and personally introduced the family to three neighbors. By the time the P. family's moving boxes arrived from London, their new life in Philadelphia was already underway.",
    stats: [
      { label: "Properties Reviewed", value: "15" },
      { label: "School Districts Evaluated", value: "3" },
      { label: "Days to Move-In", value: "35" },
      { label: "Children Enrolled", value: "3" },
    ],
  },
  {
    id: "4",
    slug: "investment-portfolio-brewerytown",
    clientName: "Andre & Lisa M.",
    clientType: "Real Estate Investors",
    scenario:
      "A married couple with a growing portfolio of rental properties in New Jersey wanted to expand into Philadelphia's emerging neighborhoods. They had $600K in capital from a 1031 exchange with a strict 180-day identification window and needed to acquire multiple cash-flowing properties quickly — without overpaying in a market they didn't know well.",
    neighborhood: "Brewerytown & Point Breeze",
    timeline: "4 months from initial strategy session to full deployment",
    agentName: "Priya Kapoor",
    agentSlug: "priya-kapoor",
    coverImage:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=80",
    outcome: {
      headline: "Acquired 3 properties generating $7,200/month in rental income",
      details: [
        "Completed full 1031 exchange within the 180-day window, deploying $587K across three properties",
        "Identified a Brewerytown duplex, a Point Breeze triplex, and a Francisville single-family — each below market value",
        "Combined portfolio generates $7,200/month in gross rental income with a blended cap rate of 7.8%",
        "Coordinated with the couple's 1031 exchange intermediary and CPA to ensure full tax-deferred status",
      ],
    },
    pullQuote:
      "Priya thinks like an investor, not just an agent. She ran the numbers before we did, flagged properties that looked good on paper but had hidden issues, and found us deals we never would have found on our own. Our Philadelphia portfolio is outperforming everything we own in New Jersey.",
    fullStory:
      "Andre and Lisa M. had been building their real estate portfolio for eight years, starting with a single duplex in Hoboken and growing to six units across northern New Jersey. When they sold a four-unit building in Jersey City, they had $600K in 1031 exchange proceeds and a 180-day clock to redeploy the capital — or face a significant tax bill.\n\nThey had been eyeing Philadelphia's emerging neighborhoods for months but lacked the local knowledge to move confidently. A mutual connection introduced them to Priya Kapoor, and from the first call, it was clear they had found their Philadelphia partner.\n\nPriya began with a deep-dive strategy session, walking Andre and Lisa through the investment fundamentals of every emerging Philadelphia corridor: rent-to-price ratios, vacancy rates, development pipeline, zoning changes, and five-year appreciation trends. She narrowed the focus to three neighborhoods — Brewerytown, Point Breeze, and Francisville — where the fundamentals were strongest and the entry points still favorable.\n\nOver the next six weeks, Priya sourced and analyzed 22 potential acquisitions, presenting each with a detailed pro forma including projected rental income, estimated renovation costs, comparable rent analysis, and cap rate projections. She personally toured every property, flagging structural concerns, zoning complications, and tenant issues that wouldn't show up on an MLS listing.\n\nThe couple ultimately acquired three properties: a newly renovated duplex in Brewerytown generating $2,800/month, a triplex in Point Breeze with stable long-term tenants producing $3,200/month, and a recently renovated single-family rental in Francisville at $1,200/month. Total deployed capital: $587,000. Combined gross monthly income: $7,200. Blended cap rate: 7.8%.\n\nPriya coordinated every step with the couple's 1031 intermediary and CPA, ensuring all three acquisitions closed within the exchange window and maintained full tax-deferred status. She also connected Andre and Lisa with a vetted Philadelphia property management company to handle day-to-day operations from across the river.\n\nSix months later, the Brewerytown property had already appreciated 6% based on comparable sales in the corridor — and Andre and Lisa were already asking Priya about their next acquisition.",
    stats: [
      { label: "Capital Deployed", value: "$587K" },
      { label: "Monthly Income", value: "$7,200" },
      { label: "Properties Acquired", value: "3" },
      { label: "Blended Cap Rate", value: "7.8%" },
    ],
  },
];

export function getSuccessStoryBySlug(
  slug: string
): SuccessStory | undefined {
  return successStories.find((s) => s.slug === slug);
}
