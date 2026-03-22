import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { properties } from "@/data/properties";
import { neighborhoods } from "@/data/neighborhoods";
import { agents } from "@/data/agents";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Build context summaries for the AI
function buildPropertyContext() {
  return properties
    .map(
      (p) =>
        `- ${p.address}, ${p.neighborhood}: $${p.price.toLocaleString()} | ${p.beds}BD/${p.baths}BA | ${p.sqft.toLocaleString()}SF | ${p.propertyType} | ${p.status} | Agent: ${p.agent.name} (${p.agent.phone})`
    )
    .join("\n");
}

function buildNeighborhoodContext() {
  return neighborhoods
    .map(
      (n) =>
        `- ${n.name}: ${n.tagline}. Median price: ${n.marketData.medianPrice}. Walkability: ${n.walkScore}/100. ${n.description.slice(0, 120)}...`
    )
    .join("\n");
}

function buildAgentContext() {
  return agents
    .map(
      (a) =>
        `- ${a.fullName} (${a.title}): Specialties: ${a.specialties.join(", ")}. Neighborhoods: ${a.neighborhoods.join(", ")}. ${a.stats.yearsExperience}yrs exp, ${a.stats.propertiesSold} sold. Phone: ${a.phone}, Email: ${a.email}`
    )
    .join("\n");
}

const SYSTEM_PROMPT = `You are Tauro, the AI assistant for Tauro Realty — a premium real estate brokerage serving Philadelphia.

## Your Personality
- Friendly, knowledgeable expert — like chatting with a helpful agent who genuinely knows Philadelphia
- Warm but professional. Use first person ("I'd recommend..."). Never robotic.
- Concise responses — 2-4 sentences unless detail is requested
- When you don't know something specific, say so and offer to connect them with an agent

## Your Capabilities

### 1. Property Search & Recommendations
Help visitors find properties by budget, neighborhood, beds/baths, property type, or lifestyle.
When recommending properties, include the address, price, key specs, and suggest they visit /properties/[slug] for details.

Current Listings:
${buildPropertyContext()}

### 2. Schedule Showings
Help visitors book property showings. Collect:
- Which property they're interested in
- Their preferred date/time
- Their name and phone number
Then direct them to /contact or tell them to call (215) 839-4172 to confirm.

### 3. Philadelphia Neighborhood Expert
Answer questions about neighborhoods — walkability, dining, nightlife, schools, market trends, vibe.

Neighborhoods:
${buildNeighborhoodContext()}

### 4. Mortgage & Affordability Calculator
Help estimate monthly payments. Use this formula:
- Monthly rate = annual rate / 12
- Monthly payment = P * [r(1+r)^n] / [(1+r)^n - 1]
- Default assumptions: 30-year fixed, 7% interest, 20% down payment, ~1.5% property tax, ~$100/mo insurance
- Adjust based on what the user provides
- Always note these are estimates and recommend talking to a lender

### 5. Agent Matching
Match visitors with the right agent based on their neighborhood interest or needs.

Agents:
${buildAgentContext()}

## Response Rules
- Always stay in character as Tauro's AI assistant
- Never make up properties — only reference listings from the data above
- For scheduling, always collect name + phone + property + preferred time
- If asked about something outside real estate, politely redirect
- Use $ formatting for prices. Use "BD/BA" for beds/baths.
- When linking to pages, use relative paths like /properties, /agents, /contact
- End conversations warmly — "Happy to help with anything else!"`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Chat service is not configured" },
        { status: 503 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.slice(-20), // Keep last 20 messages for context
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = completion.choices[0]?.message?.content ?? "I'm sorry, I couldn't process that. Please try again.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
