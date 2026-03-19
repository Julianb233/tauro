import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  href?: string;
}

export function StatCard({ title, value, icon: Icon, change, href }: StatCardProps) {
  const content = (
    <div
      className={cn(
        "group rounded-xl border border-white/10 bg-[#1E1E32] p-5 transition-all",
        href && "cursor-pointer hover:border-gold/30 hover:brightness-110",
      )}
    >
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-gold/15">
        <Icon className="h-[18px] w-[18px] text-gold" />
      </div>
      <p className="text-2xl font-bold text-off-white">{value}</p>
      <p className="mt-0.5 text-sm text-off-white/60">{title}</p>
      {change && (
        <p
          className={cn(
            "mt-2 text-xs font-medium",
            change.startsWith("+") ? "text-emerald-400" : "text-red-400",
          )}
        >
          {change}
        </p>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
