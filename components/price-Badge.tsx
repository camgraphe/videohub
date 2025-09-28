"use client";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

export function PriceBadge({
  amount,
  breakdown,
  className,
}: {
  amount: number;
  breakdown?: string;
  className?: string;
}) {
  const text = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(amount);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-sm",
        className
      )}
      title={breakdown}
    >
      <span className="font-medium">{text}</span>
      {breakdown ? (
        <span className="inline-flex items-center gap-1 text-neutral-500">
          <Info className="h-3.5 w-3.5" />
          <span>estimation</span>
        </span>
      ) : null}
    </div>
  );
}
