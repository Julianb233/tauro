import { notFound } from "next/navigation";
import { loadAgentBySlug, loadAgents } from "@/lib/data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { siteUrl } from "@/lib/site-config";
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
  const title = `${agent.fullName} — ${agent.title}`;
  const description = `${agent.fullName} is a ${agent.title} at Tauro Realty Philadelphia. ${agent.bio?.slice(0, 120) || "Contact for expert real estate guidance."}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/agents/${agent.slug}`,
      images: [{ url: agent.photo, width: 600, height: 600, alt: agent.fullName }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [agent.photo],
    },
  };
}

export default async function AgentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await loadAgentBySlug(slug);
  if (!result) notFound();
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Agents", href: "/agents" },
          { label: result.agent.fullName, href: `/agents/${result.agent.slug}` },
        ]}
      />
      <AgentProfileClient agent={result.agent} activeListings={result.listings} />
    </>
  );
}
