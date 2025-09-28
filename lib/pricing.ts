import pricing from "@/config/pricing.config.json";

export type Engine = "veo-fast" | "veo-quality" | "fal-pika" | "fal-luma";

export function estimateCostEUR(
  engine: Engine,
  durationSec: number,
  qty: number,
  withAudio: boolean
): number {
  const safeQty = Math.max(1, Math.floor(qty || 1));
  let unit = 0;

  if (engine === "veo-fast") {
    unit = pricing.veo.fast[withAudio ? "audio" : "mute"];
  } else if (engine === "veo-quality") {
    unit = pricing.veo.quality[withAudio ? "audio" : "mute"];
  } else if (engine === "fal-pika") {
    unit = pricing.fal.pika.per_second;
  } else if (engine === "fal-luma") {
    unit = pricing.fal.luma.per_second;
  }

  const total = unit * durationSec * safeQty;
  return Math.round(total * 100) / 100; // arrondi au centime
}
