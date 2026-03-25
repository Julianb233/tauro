export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage: string;
  category: BlogCategory;
  coverImage: string;
  publishedAt: string;
  readTime: number;
}

export type BlogCategory =
  | "Market Trends"
  | "Neighborhoods"
  | "Buying"
  | "Selling"
  | "Lifestyle";

export const blogCategories: BlogCategory[] = [
  "Market Trends",
  "Neighborhoods",
  "Buying",
  "Selling",
  "Lifestyle",
];

export const blogPosts: BlogPost[] = [
  {
    id: "6",
    slug: "q4-2025-philadelphia-market-report",
    title: "Q4 2025 Philadelphia Market Report: Seasonal Cooldown Sets Stage for Spring Rebound",
    excerpt:
      "A data-driven look at how Philadelphia's housing market performed in the fourth quarter of 2025 — with neighborhood breakdowns, pricing trends, and what the numbers mean for buyers and sellers heading into 2026.",
    content: `Philadelphia's real estate market followed its familiar seasonal rhythm in Q4 2025, with prices easing from their summer peaks and inventory ticking upward as buyer urgency softened through the holiday months. But beneath the surface-level cooldown, the fundamentals remain remarkably strong — and the data points to a competitive spring ahead.

## Q4 2025 By the Numbers

The city-wide median home price closed Q4 at $280,000, down from the June peak of $298,000 but still representing a healthy 3.7% gain over Q4 2024. Active inventory rose to 3,600 listings by November before settling at 3,700 in December — a seasonal pattern consistent with prior years.

Average days on market stretched from 27 in October to 33 in December, giving buyers slightly more breathing room than the frenetic spring and summer months. The price per square foot ended the quarter at $198, down modestly from the $212 peak in June.

<!--charts:price-trend-->

## Neighborhood Performance

Not all neighborhoods experienced the Q4 cooldown equally. Fishtown and Northern Liberties continued to outperform, with year-over-year price gains of 6.1% and 5.2% respectively — well above the citywide average. These markets benefit from sustained demand among young professionals and limited new inventory.

South Philly posted a solid 4.5% annual gain, driven by continued interest in the East Passyunk corridor. Center City held steady at 3.8% appreciation, while Rittenhouse Square's 2.5% growth reflects its mature, lower-volatility profile.

<!--charts:neighborhood-prices-->

## Days on Market: Where Homes Sell Fastest

Market speed varied significantly by neighborhood in Q4. Fishtown remained the city's fastest-moving market at just 15 average days on market, followed closely by Northern Liberties at 17. Rittenhouse Square's 18-day average reflects strong demand for its limited luxury inventory.

Old City showed the longest average at 26 days, though this partly reflects the condo-heavy inventory mix in the neighborhood, which typically moves more slowly than rowhomes.

<!--charts:neighborhood-dom-->

## What Drove the Q4 Trends

**Mortgage rates stabilized.** After the volatility of 2023 and 2024, rates settled into the low-to-mid 6% range through Q4, providing buyers with more predictable financing conditions — though still elevated enough to keep some first-time buyers on the sidelines.

**Seasonal patterns held.** The traditional autumn slowdown played out as expected: families settled into the school year, holiday distractions increased, and sellers who could wait pulled listings to relist in spring.

**Inventory remained structurally tight.** Even with Q4's seasonal increase, active listings finished the quarter 8% below Q4 2024 levels. This structural undersupply continues to put a floor under prices and limits meaningful correction risk.

## What It Means for Buyers

Q4 was the best buying window of 2025 for those willing to act. Less competition, slightly more inventory, and motivated sellers created opportunities — particularly in neighborhoods where prices had appreciated rapidly through the spring and summer.

Heading into 2026, buyers should expect competition to intensify by March. Those who get pre-approved now and begin their search in January and February will have a meaningful advantage over the spring rush.

## What It Means for Sellers

If you listed in Q4 and priced accurately, you likely sold — just at a slightly more measured pace than summer. The data confirms that well-priced homes continued to attract offers within 30 days across most neighborhoods.

For sellers planning a spring listing, the message is clear: the market fundamentals strongly favor you. Low inventory, stable demand, and moderating rates point toward another competitive spring season. The key is preparation — professional staging, photography, and accurate pricing from day one.

## Looking Ahead to 2026

The Q4 data reinforces Philadelphia's position as one of the Northeast's most resilient housing markets. Moderate, sustainable appreciation; structurally low inventory; and diverse neighborhood-level demand create a market that rewards both buyers and sellers who approach it with data and local expertise.

Our full 2026 market outlook will be published shortly, but the Q4 numbers give us confidence in the trajectory: steady growth, neighborhood-driven opportunity, and a market that continues to favor the prepared.`,
    author: "Julian Bradley",
    authorImage:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
    category: "Market Trends",
    coverImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    publishedAt: "2026-01-05",
    readTime: 9,
  },
  {
    id: "1",
    slug: "2026-philadelphia-real-estate-market-outlook",
    title: "2026 Philadelphia Real Estate Market Outlook",
    excerpt:
      "From shifting interest rates to surging demand in emerging corridors, here is what buyers and sellers should expect from Philly's housing market this year.",
    content: `Philadelphia's real estate market enters 2026 with a fascinating blend of momentum and recalibration. After years of relentless price appreciation, the city's housing landscape is maturing into something more nuanced --- and more strategic for those who know where to look.

## The Big Picture

The Federal Reserve's measured approach to rate adjustments has brought 30-year mortgage rates into the low-to-mid 6% range, a meaningful improvement from the peaks of 2023 and 2024. This shift has unlocked pent-up demand, particularly among first-time buyers who had been sidelined.

Philadelphia's median home price now sits at approximately $295,000 --- up 4.2% year-over-year --- but the story varies dramatically by neighborhood. Established luxury markets like Rittenhouse Square and Chestnut Hill are appreciating at a measured 2--3%, while emerging corridors are posting gains of 6--8%.

## Neighborhoods to Watch

**Brewerytown** continues its remarkable ascent, with median prices climbing 8.2% year-over-year. The combination of proximity to Fairmount Park, new restaurant openings, and relative affordability compared to neighboring Fairmount makes it one of the city's most compelling investment plays.

**Point Breeze** is following a similar trajectory. Infrastructure improvements, new construction, and a growing creative community have transformed blocks that were overlooked just five years ago. Savvy buyers are finding townhouses here at $100,000--$150,000 less than comparable homes in Graduate Hospital, just a few blocks north.

**Kensington** remains the market's wildcard. Appreciation of 7.8% reflects genuine momentum, but the neighborhood's transformation is uneven. Buyers should work with agents who know the micro-markets block by block.

## What It Means for Buyers

The window of opportunity is real but narrowing. Inventory remains tight --- down 8% year-over-year --- which means well-priced homes attract multiple offers quickly. Buyers who are pre-approved, flexible on closing timelines, and willing to move decisively will have a significant advantage.

For those priced out of Center City, the emerging neighborhoods offer genuine value. A $350,000 budget that barely gets a one-bedroom condo in Rittenhouse can secure a renovated three-bedroom townhouse in Brewerytown or Point Breeze.

## What It Means for Sellers

Low inventory is your greatest asset. Well-prepared homes are selling in an average of 28 days --- and significantly faster in hot neighborhoods. The key is pricing accurately from day one. Overpriced listings that linger lose their luster and ultimately sell for less than homes priced right at launch.

Professional staging and photography are no longer optional --- they are table stakes. In a market where buyers begin their search online, the first impression is often the only impression.

## The Bottom Line

Philadelphia's 2026 market rewards preparation and local expertise. Whether you are buying your first home in Fishtown or selling a legacy property in Society Hill, the fundamentals favor those who move with intention. The days of throwing darts at a map and winning are over. This is a market for the informed.`,
    author: "Julian Bradley",
    authorImage:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
    category: "Market Trends",
    coverImage:
      "https://images.unsplash.com/photo-1575517111478-7f6afd0973db?w=1200&q=80",
    publishedAt: "2026-03-15",
    readTime: 7,
  },
  {
    id: "2",
    slug: "top-5-neighborhoods-first-time-buyers-philly",
    title: "Top 5 Neighborhoods for First-Time Buyers in Philly",
    excerpt:
      "Breaking into the Philadelphia market does not require a seven-figure budget. These five neighborhoods offer the best combination of value, livability, and long-term appreciation.",
    content: `Philadelphia has long been one of the most accessible major-city housing markets in the Northeast, and 2026 continues that tradition --- if you know where to look. For first-time buyers navigating the market, the right neighborhood can mean the difference between stretching beyond your means and finding a home you genuinely love at a price that makes sense.

Here are five neighborhoods where we are consistently helping first-time buyers find their footing.

## 1. Fishtown

**Median Price:** $385,000 | **Avg Days on Market:** 15

Yes, Fishtown has gotten more expensive. But for first-time buyers who prioritize walkability, nightlife, and a vibrant creative community, it remains unmatched. The neighborhood's mix of renovated rowhomes and new construction offers entry points at various price ranges, and the appreciation trajectory --- 6.1% year-over-year --- means your investment is likely to grow.

**Best for:** Young professionals, creatives, and anyone who wants to walk to dinner.

**Pro tip:** Look south of Girard Avenue for slightly lower prices with the same energy.

## 2. Graduate Hospital

**Median Price:** $410,000 | **Avg Days on Market:** 19

Grad Hospital punches above its weight in livability. Tree-lined streets, excellent restaurants along South Street West, and easy access to the Schuylkill River Trail make it feel far more expensive than it is. The housing stock is predominantly classic Philadelphia rowhomes --- many beautifully renovated --- and the neighborhood has a settled, community-oriented feel that appeals to buyers ready to put down roots.

**Best for:** Couples, young families, and anyone who wants urban living with a quieter pace.

## 3. Manayunk

**Median Price:** $310,000 | **Avg Days on Market:** 25

Manayunk offers something rare in Philadelphia: genuine affordability combined with a distinct village character. Main Street's restaurants and shops, the towpath along the canal, and proximity to the Wissahickon make it a lifestyle neighborhood at a fraction of Center City prices. The $310,000 median means many buyers can purchase a three-bedroom twin or townhouse with a manageable monthly payment.

**Best for:** Outdoor enthusiasts, value seekers, and buyers who want more space for their money.

## 4. South Philadelphia (East Passyunk Corridor)

**Median Price:** $295,000 | **Avg Days on Market:** 24

The East Passyunk corridor has become one of Philadelphia's most celebrated dining and shopping destinations, and the surrounding residential blocks offer excellent value. Classic South Philly rowhomes at approachable prices, strong community identity, and some of the best food in the city --- it is hard to argue with the proposition.

**Best for:** Food lovers, culture seekers, and buyers who appreciate authentic neighborhood character.

## 5. Brewerytown

**Median Price:** $280,000 | **Avg Days on Market:** 16

Brewerytown is where opportunity meets momentum. The neighborhood's proximity to Fairmount Park, growing restaurant scene, and rapid development make it one of the strongest appreciation plays in the city. At a $280,000 median, first-time buyers can enter a market that is appreciating at 8.2% annually --- the highest rate in Philadelphia.

**Best for:** Investors-at-heart, buyers seeking maximum appreciation, and anyone who wants to be part of a neighborhood's next chapter.

## The Common Thread

Each of these neighborhoods shares a few critical qualities: strong public transit access, walkable amenities, and a clear trajectory of improvement. The most successful first-time buyers we work with prioritize these fundamentals over fleeting trends.

Philadelphia rewards those who buy thoughtfully. If you are ready to start your search, our team can help you find the right neighborhood for your lifestyle and budget.`,
    author: "Sofia Martinez",
    authorImage:
      "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=200&q=80",
    category: "Buying",
    coverImage:
      "https://images.unsplash.com/photo-1501446529957-6226bd447c46?w=1200&q=80",
    publishedAt: "2026-03-08",
    readTime: 8,
  },
  {
    id: "3",
    slug: "selling-your-philadelphia-home-complete-guide",
    title: "Selling Your Philadelphia Home: A Complete Guide",
    excerpt:
      "From pricing strategy to closing day, everything you need to know about selling a home in Philadelphia's current market.",
    content: `Selling a home is one of the largest financial transactions most people will ever make, and in Philadelphia's current market, the stakes --- and the opportunities --- are significant. Low inventory and steady demand mean sellers hold meaningful leverage, but only if they approach the process strategically.

This guide walks through every stage of selling your Philadelphia home, from preparation to closing.

## Stage 1: Preparation (4--6 Weeks Before Listing)

### Get a Pre-Listing Market Analysis

Before setting a price or making a single repair, understand what your home is actually worth in today's market. A comparative market analysis (CMA) from a local agent examines recent sales of similar homes in your neighborhood, current competition, and market conditions to establish a realistic price range.

### Make Strategic Improvements

Not every renovation pays for itself at resale. Focus on high-return improvements:

- **Kitchen and bathroom updates** --- Even minor refreshes (new hardware, fresh paint, updated light fixtures) can dramatically change buyer perception.
- **Curb appeal** --- Power washing, fresh mulch, and a painted front door cost little but create a powerful first impression.
- **Neutral paint** --- If your walls are bold, consider repainting in warm neutral tones. Buyers need to envision themselves in the space.

### Declutter and Stage

Professional staging is not a luxury --- it is a strategy. Staged homes sell faster and for more money. At minimum, declutter aggressively, depersonalize, and ensure every room has a clear purpose.

## Stage 2: Pricing (The Most Critical Decision)

Pricing is where most sellers make their biggest mistake. The temptation to "test the market" with an aspirational price is understandable but counterproductive.

**Homes priced right from day one:**
- Attract more showings in the critical first two weeks
- Generate competitive offers
- Sell faster and for more money on average

**Overpriced homes:**
- Sit on the market, becoming "stale" in buyers' minds
- Require price reductions that signal desperation
- Ultimately sell for less than they would have at the correct initial price

Your agent's CMA, combined with their knowledge of current buyer behavior, should guide this decision. Trust the data.

## Stage 3: Marketing

In a market where 97% of buyers begin their search online, marketing quality directly impacts your outcome.

### Professional Photography and Video

This is non-negotiable. Dark, blurry phone photos will cost you tens of thousands of dollars. Professional photography, drone footage for properties with notable outdoor space, and video walkthroughs are standard expectations in Philadelphia's competitive market.

### Digital Strategy

Your listing should appear across every major platform --- MLS, Zillow, Realtor.com, social media --- with compelling copy that highlights what makes your home and neighborhood special. The best agents craft narratives, not just bullet points.

### Open Houses and Private Showings

A well-executed open house creates urgency and competition. Weekend open houses in the first two weeks of listing are essential. Accommodate private showings as flexibly as possible --- every missed showing is a potentially missed offer.

## Stage 4: Offers and Negotiation

In Philadelphia's current market, well-priced homes often receive multiple offers within the first week. Your agent should help you evaluate offers holistically --- not just on price, but on:

- **Financing strength** --- Cash and conventional loans typically close more reliably than FHA or VA.
- **Contingencies** --- Fewer contingencies mean less risk of the deal falling through.
- **Closing timeline** --- Does the buyer's timeline align with yours?
- **Escalation clauses** --- Some buyers include automatic escalation up to a ceiling price.

## Stage 5: Under Contract to Closing (30--45 Days)

Once you accept an offer, the process moves through inspection, appraisal, and closing. Common Philadelphia-specific considerations:

- **Inspection issues** --- Older Philadelphia homes often have deferred maintenance. Be prepared to negotiate repairs or credits.
- **Transfer taxes** --- Philadelphia's combined transfer tax is 4.278%, typically split between buyer and seller.
- **Certificate of occupancy** --- Required in Philadelphia for most residential sales.

## The Tauro Approach

We believe selling your home should feel like a partnership, not a transaction. From pricing strategy to closing coordination, our agents manage every detail so you can focus on your next chapter.`,
    author: "Damon Reeves",
    authorImage:
      "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=200&q=80",
    category: "Selling",
    coverImage:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
    publishedAt: "2026-02-22",
    readTime: 10,
  },
  {
    id: "4",
    slug: "why-rittenhouse-square-remains-phillys-most-desirable-address",
    title: "Why Rittenhouse Square Remains Philly's Most Desirable Address",
    excerpt:
      "A look at the enduring appeal of Philadelphia's premier neighborhood --- and why demand continues to outpace supply.",
    content: `In a city full of remarkable neighborhoods, Rittenhouse Square occupies a category of its own. For over a century, this leafy enclave surrounding one of America's most beautiful urban parks has been Philadelphia's most coveted address --- and in 2026, that distinction shows no signs of fading.

## The Numbers Tell the Story

Rittenhouse Square's median home price of $520,000 reflects its premium positioning, but the real story is in the pace of sales. With an average of just 18 days on market, well-priced Rittenhouse properties move faster than the citywide average of 28 days. The sale-to-list ratio consistently exceeds 99%, meaning buyers pay very close to --- or above --- asking price.

Year-over-year appreciation of 2.5% might seem modest compared to emerging neighborhoods, but this reflects maturity, not stagnation. Rittenhouse values have appreciated steadily for decades, compounding into one of the strongest long-term real estate investments in the region.

## What Makes Rittenhouse Irreplaceable

### The Park

Rittenhouse Square park is the neighborhood's beating heart --- a meticulously maintained 6.5-acre green space that hosts farmers' markets, art shows, and the daily rituals of one of Philadelphia's most engaged communities. Unlike many urban parks, Rittenhouse feels intimate and safe at every hour, a quality that profoundly impacts property values within its orbit.

### Walkability

Few neighborhoods in America match Rittenhouse's walkability. Within a ten-minute stroll, residents access world-class dining (Vetri, Parc, Lacroix), independent boutiques along Walnut Street, multiple grocery options, cultural institutions, and some of the city's best coffee shops. The neighborhood earns a near-perfect Walk Score, and many residents find car ownership entirely optional.

### Architectural Character

Rittenhouse's housing stock spans elegant pre-war brownstones, grand Beaux-Arts apartment buildings, sleek modern condominiums, and stately townhouses. This architectural diversity creates a layered streetscape that feels curated rather than manufactured --- a quality that distinguishes it from newer luxury developments.

### The Resident Community

Rittenhouse attracts a distinctive mix: established professionals, entrepreneurs, empty nesters drawn from the Main Line, and young executives who prioritize quality of life. This demographic diversity creates a vibrant, year-round community that sustains the neighborhood's legendary restaurant and retail scene.

## The Investment Case

For buyers considering Rittenhouse as an investment, the fundamentals are compelling:

- **Scarcity drives value.** The neighborhood is fully built out, meaning new inventory is limited to rare teardowns and conversion projects. This supply constraint supports long-term price stability.
- **Recession resilience.** Rittenhouse historically outperforms the broader market during downturns, with smaller price declines and faster recoveries.
- **Rental demand.** For investor-buyers, Rittenhouse commands some of the highest rents per square foot in Philadelphia, with consistently low vacancy rates.

## What to Expect When Buying in Rittenhouse

Competition is intense. Multiple-offer situations are common, and buyers who hesitate often lose out. Success in Rittenhouse requires:

- Pre-approval from a reputable lender (or proof of funds for cash buyers)
- Willingness to move quickly --- sometimes within 24 hours of a listing
- An agent with deep relationships in the neighborhood who may access off-market opportunities
- Realistic expectations about price per square foot

## The Enduring Appeal

Rittenhouse Square endures because it delivers something increasingly rare in American cities: a genuinely walkable, architecturally beautiful, culturally rich neighborhood where daily life feels elevated without feeling exclusive. It is not the cheapest place to buy in Philadelphia, but for those who value quality of life above all else, it remains the address.`,
    author: "Julian Bradley",
    authorImage:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
    category: "Neighborhoods",
    coverImage:
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1200&q=80",
    publishedAt: "2026-02-10",
    readTime: 7,
  },
  {
    id: "5",
    slug: "the-rise-of-fishtown-from-industrial-to-trendy",
    title: "The Rise of Fishtown: From Industrial to Trendy",
    excerpt:
      "How a working-class neighborhood along the Delaware became one of Philadelphia's hottest real estate markets --- and what comes next.",
    content: `If you had told a Philadelphia real estate agent in 2005 that Fishtown would become one of the city's most desirable neighborhoods, they might have laughed. The area along the Delaware River, historically home to factories, working-class families, and industrial warehouses, seemed an unlikely candidate for transformation.

Two decades later, that transformation is not just complete --- it is accelerating.

## A Brief History

Fishtown earned its name from the shad fisheries that lined the Delaware River in the 18th and 19th centuries. For most of its history, the neighborhood was defined by its blue-collar character: generations of families working in the Kensington mills, the Frankford Arsenal, and the neighborhood's many small manufacturers.

The decline of Philadelphia's industrial base hit Fishtown hard. By the 1990s, vacant factories dotted the landscape, and population decline had left stretches of Frankford Avenue feeling abandoned. But the same forces that emptied the neighborhood --- cheap rent, available space, proximity to Center City --- would eventually fuel its rebirth.

## The Transformation

Artists and musicians arrived first, drawn by affordable warehouse spaces and the neighborhood's gritty authenticity. Galleries opened in converted factories. Johnny Brenda's, the bar and music venue that opened in 2003, became an early anchor of what would become one of Philadelphia's most vibrant commercial corridors.

Restaurants followed. Then coffee shops. Then craft cocktail bars. By 2015, Frankford Avenue had been named one of America's great commercial streets, and Fishtown's transformation was making national headlines.

The real estate market responded accordingly. Developers converted warehouses into luxury lofts. New construction filled vacant lots with contemporary townhouses. And prices --- once a fraction of Center City's --- began climbing at rates that surprised even optimistic observers.

## Fishtown in 2026

Today's Fishtown is a mature but still-evolving neighborhood with some of the strongest fundamentals in Philadelphia:

- **Median Price:** $385,000 --- up 6.1% year-over-year
- **Average Days on Market:** 15 --- among the fastest in the city
- **Housing Mix:** Classic rowhomes, converted loft condos, and modern new construction

The neighborhood's appeal extends well beyond nightlife and restaurants. Fishtown's public spaces --- Penn Treaty Park, the Delaware River Trail, the Fillmore Philadelphia --- create genuine community infrastructure. Young families are increasingly common, drawn by the neighborhood's energy and its growing network of family-friendly amenities.

## The Development Pipeline

Several major projects are reshaping Fishtown's landscape:

- The continued development along the Delaware River waterfront is adding thousands of residential units, retail spaces, and public amenities.
- Adaptive reuse projects are converting remaining industrial buildings into mixed-use developments that honor the neighborhood's character.
- Infrastructure improvements, including enhanced bike lanes and public transit connections, are improving connectivity to Center City and beyond.

## Investment Considerations

Fishtown's appreciation trajectory makes it one of Philadelphia's strongest investment markets, but buyers should be strategic:

**Strengths:**
- Consistent demand from a deep buyer pool
- Strong rental market driven by young professionals
- Ongoing development that adds amenities without diluting character
- Excellent transit connections (Market-Frankford Line, multiple bus routes)

**Considerations:**
- Prices have risen significantly --- the "early adopter" discount is long gone
- Some blocks still contend with quality-of-life issues common to transitioning neighborhoods
- New construction can vary significantly in build quality
- Property taxes have increased alongside rising assessments

## What Comes Next

The question for Fishtown is no longer whether it will succeed --- that debate is settled. The question is what kind of neighborhood it becomes as it matures. The tension between preserving the creative, independent spirit that drove the transformation and accommodating the market forces that followed is real and ongoing.

For buyers, Fishtown in 2026 offers a compelling proposition: a vibrant, walkable neighborhood with strong fundamentals and a track record of appreciation. The key is working with an agent who knows the micro-markets --- because in Fishtown, two blocks can make a meaningful difference in value and experience.`,
    author: "Sofia Martinez",
    authorImage:
      "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=200&q=80",
    category: "Neighborhoods",
    coverImage:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&q=80",
    publishedAt: "2026-01-28",
    readTime: 8,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogPostsByCategory(category: BlogCategory): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}

const STOP_WORDS = new Set([
  "a","an","the","and","or","but","in","on","at","to","for","of","with",
  "by","from","is","are","was","were","be","been","being","have","has",
  "had","do","does","did","will","would","could","should","may","might",
  "this","that","these","those","it","its","how","what","when","where","why",
  "your","our","their","you","i","we","they","he","she","who","which",
]);

function extractKeywords(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 3 && !STOP_WORDS.has(w))
  );
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const current = getBlogPostBySlug(currentSlug);
  if (!current) return blogPosts.slice(0, limit);

  const currentKeywords = extractKeywords(current.title + " " + current.excerpt);

  const candidates = blogPosts.filter((p) => p.slug !== currentSlug);

  // Score: 3 pts for same category, 1 pt per shared keyword in title/excerpt
  const scored = candidates.map((p) => {
    let score = 0;
    if (p.category === current.category) score += 3;
    const pKeywords = extractKeywords(p.title + " " + p.excerpt);
    for (const kw of currentKeywords) {
      if (pKeywords.has(kw)) score += 1;
    }
    return { post: p, score };
  });

  return scored
    .sort((a, b) => b.score - a.score || b.post.publishedAt.localeCompare(a.post.publishedAt))
    .slice(0, limit)
    .map((s) => s.post);
}
