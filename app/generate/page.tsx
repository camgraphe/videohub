"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [ratio, setRatio] = useState<"9:16" | "16:9">("9:16");
  const [duration, setDuration] = useState<6 | 8>(8);
  const [audio, setAudio] = useState(true);
  const [engine, setEngine] = useState<"veo-fast" | "veo-quality" | "fal-pika" | "fal-luma">("veo-fast");
  const [qty, setQty] = useState(1);

  // Estimation mock (on branchera la vraie config ensuite)
  const PRICE = {
    "veo-quality": { audio: 0.60, mute: 0.50 },
    "veo-fast":    { audio: 0.25, mute: 0.20 },
    "fal-pika":    { audio: 0.20, mute: 0.18 },
    "fal-luma":    { audio: 0.24, mute: 0.22 },
  } as const;
  const unit = PRICE[engine][audio ? "audio" : "mute"];
  const total = (unit * duration * qty).toFixed(2);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Mock OK. Estimation ≈ ${total} €`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Generate</h1>
      <p className="text-muted-foreground">Formulaire minimal — estimation en direct (mock).</p>

      <Card className="p-6 space-y-6">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Prompt</Label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              placeholder="ex: A cinematic slow push-in shot of neon-lit rainy street..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Ratio</Label>
              <Select value={ratio} onValueChange={(v) => setRatio(v as any)}>
                <SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="9:16">Vertical 9:16</SelectItem>
                  <SelectItem value="16:9">Horizontal 16:9</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Durée</Label>
              <Select value={String(duration)} onValueChange={(v) => setDuration(Number(v) as 6 | 8)}>
                <SelectTrigger><SelectValue placeholder="Durée" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6 s</SelectItem>
                  <SelectItem value="8">8 s</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Moteur</Label>
              <Select value={engine} onValueChange={(v) => setEngine(v as any)}>
                <SelectTrigger><SelectValue placeholder="Moteur" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="veo-fast">Veo 3 — Fast</SelectItem>
                  <SelectItem value="veo-quality">Veo 3 — Quality</SelectItem>
                  <SelectItem value="fal-pika">FAL — Pika</SelectItem>
                  <SelectItem value="fal-luma">FAL — Luma</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <Label>Quantité</Label>
              <Input
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch id="audio" checked={audio} onCheckedChange={setAudio} />
              <Label htmlFor="audio">Inclure l’audio natif</Label>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {engine}, {duration}s, {audio ? "audio on" : "mute"}, x{qty}
            </div>
            <div className="text-xl font-semibold">≈ {total} €</div>
          </div>

          <Button type="submit" className="w-full md:w-auto">Générer (mock)</Button>
        </form>
      </Card>
    </div>
  );
}
