import { notFound } from "next/navigation";
import { loadAgentBySlug, loadAgents } from "@/lib/data";
import AgentProfileClient from "./AgentProfileClient";

export const revalidate = 3600;

export async function generateStaticParams() {
  const agents = await loadAgents();
  return agents.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await loadAgentBySlug(slug);
  if (!result) return { title: "Agent Not Found" };
  const { agent } = result;
  return {
    title: `${agent.fullName} — ${agent.title}`,
    description: `${agent.fullName} is a ${agent.title} at Tauro Realty Philadelphia. ${agent.bio?.slice(0, 120) || "Contact for expert real estate guidance."}`,
  };
}

export default async function AgentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await loadAgentBySlug(slug);
  if (!result) notFound();
  return <AgentProfileClient agent={result.agent} activeListings={result.listings} />;
}
