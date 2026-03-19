import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  href?: string;
}

export function StatCard({ title, value, icon: Icon, href }: StatCardProps) {
  const content = (
    <div className="rounded-xl border border-white/10 bg-[#1E1E32] p-4 transition-colors hover:border-gold/20">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-off-white/40">
            {title}
          </p>
          <p className="mt-1 text-2xl font-bold text-off-white">{value}</p>
        </div>
        <div className="rounded-lg bg-gold/10 p-2.5">
          <Icon className="h-5 w-5 text-gold" />
        </div>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
