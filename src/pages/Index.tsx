import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GameBoard } from "@/components/GameBoard";
import type { GameMode, Difficulty } from "@/lib/gameEngine";
import { Zap, Clock, Hash, Calendar, ArrowRight } from "lucide-react";

const Index = () => {
  const [screen, setScreen] = useState<"menu" | "game">("menu");
  const [mode, setMode] = useState<GameMode>("classic");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [isDaily, setIsDaily] = useState(false);

  const startGame = (m: GameMode, d: Difficulty, daily = false) => {
    setMode(m);
    setDifficulty(d);
    setIsDaily(daily);
    setScreen("game");
  };

  if (screen === "game") {
    return (
      <div className="min-h-screen bg-background px-4 py-8">
        <GameBoard mode={mode} difficulty={difficulty} isDaily={isDaily} onBack={() => setScreen("menu")} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {["W", "O", "R", "D"].map((l, i) => (
                <span
                  key={i}
                  className="flex h-10 w-10 items-center justify-center rounded-md bg-primary font-mono text-lg font-bold text-primary-foreground"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">
            Word Evolution
          </h1>
          <p className="text-sm text-muted-foreground max-w-xs">
            Transform one word into another, one letter at a time. Every step must be a real word.
          </p>
        </div>

        {/* Daily Challenge */}
        <Button
          className="w-full h-14 text-base gap-3 bg-accent hover:bg-accent/90 text-accent-foreground"
          onClick={() => startGame("classic", "medium", true)}
        >
          <Calendar className="h-5 w-5" />
          Daily Challenge
          <ArrowRight className="h-4 w-4 ml-auto" />
        </Button>

        {/* Game Modes */}
        <div className="w-full space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Game Modes
          </h2>
          <div className="grid gap-2">
            <ModeCard
              icon={<Zap className="h-5 w-5" />}
              title="Classic"
              desc="No limits, just solve it"
              onClick={(d) => startGame("classic", d)}
            />
            <ModeCard
              icon={<Clock className="h-5 w-5" />}
              title="Timed"
              desc="Beat the clock"
              onClick={(d) => startGame("timed", d)}
            />
            <ModeCard
              icon={<Hash className="h-5 w-5" />}
              title="Limited Moves"
              desc="Solve in fewer steps"
              onClick={(d) => startGame("limited", d)}
            />
          </div>
        </div>

        {/* How to play */}
        <div className="w-full rounded-lg border bg-card p-4 space-y-2">
          <h3 className="font-heading text-sm font-semibold">How to Play</h3>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li>• Change exactly <strong className="text-foreground">one letter</strong> per step</li>
            <li>• Each word must be a <strong className="text-foreground">valid English word</strong></li>
            <li>• Word length stays the <strong className="text-foreground">same</strong></li>
            <li>• Try to match the <strong className="text-foreground">optimal</strong> number of steps</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

function ModeCard({ icon, title, desc, onClick }: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  onClick: (d: Difficulty) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-lg border bg-card overflow-hidden transition-all">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-3 p-3 text-left hover:bg-muted/50 transition-colors"
      >
        <span className="text-primary">{icon}</span>
        <div className="flex-1">
          <p className="font-heading text-sm font-semibold">{title}</p>
          <p className="text-xs text-muted-foreground">{desc}</p>
        </div>
        <ArrowRight className={`h-4 w-4 text-muted-foreground transition-transform ${expanded ? "rotate-90" : ""}`} />
      </button>
      {expanded && (
        <div className="flex gap-2 px-3 pb-3 animate-slide-up">
          {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
            <Button key={d} variant="outline" size="sm" className="flex-1 capitalize" onClick={() => onClick(d)}>
              {d}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Index;
