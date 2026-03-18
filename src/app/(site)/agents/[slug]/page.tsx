import { notFound } from "next/navigation";
import { getAgentBySlug, agents } from "@/data/agents";
import AgentProfileClient from "./AgentProfileClient";

export function generateStaticParams() {
  return agents.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);
  if (!agent) return { title: "Agent Not Found" };
  return {
    title: `${agent.fullName} — ${agent.title}`,
    description: `${agent.fullName} is a ${agent.title} at Tauro Realty Philadelphia. ${agent.bio?.slice(0, 120) || "Contact for expert real estate guidance."}`,
  };
}

export default async function AgentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);
  if (!agent) notFound();
  return <AgentProfileClient slug={slug} />;
}
