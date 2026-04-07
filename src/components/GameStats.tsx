import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Timer, Footprints, Lightbulb, Trophy } from "lucide-react";

interface GameStatsProps {
  steps: number;
  optimalSteps: number;
  hintsUsed: number;
  startTime: number;
  timeLimit?: number;
  moveLimit?: number;
  isComplete: boolean;
  onTimeUp?: () => void;
}

export function GameStats({
  steps,
  optimalSteps,
  hintsUsed,
  startTime,
  timeLimit,
  moveLimit,
  isComplete,
  onTimeUp,
}: GameStatsProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (isComplete) return;
    const interval = setInterval(() => {
      const now = Math.floor((Date.now() - startTime) / 1000);
      setElapsed(now);
      if (timeLimit && now >= timeLimit) {
        onTimeUp?.();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime, isComplete, timeLimit, onTimeUp]);

  const remaining = timeLimit ? Math.max(0, timeLimit - elapsed) : null;
  const movesLeft = moveLimit ? moveLimit - steps : null;

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 rounded-lg border bg-card p-3">
      <Stat
        icon={<Footprints className="h-4 w-4" />}
        label="Steps"
        value={`${steps}/${optimalSteps}`}
        highlight={steps <= optimalSteps}
      />
      <Stat
        icon={<Timer className="h-4 w-4" />}
        label={remaining !== null ? "Time Left" : "Time"}
        value={formatTime(remaining ?? elapsed)}
        highlight={false}
        danger={remaining !== null && remaining <= 10}
      />
      {movesLeft !== null && (
        <Stat
          icon={<Trophy className="h-4 w-4" />}
          label="Moves Left"
          value={String(movesLeft)}
          highlight={false}
          danger={movesLeft <= 2}
        />
      )}
      <Stat
        icon={<Lightbulb className="h-4 w-4" />}
        label="Hints"
        value={String(hintsUsed)}
        highlight={hintsUsed === 0}
      />
    </div>
  );
}

function Stat({ icon, label, value, highlight, danger }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight: boolean;
  danger?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className={cn(
        "text-muted-foreground",
        highlight && "text-primary",
        danger && "text-destructive"
      )}>
        {icon}
      </span>
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className={cn(
          "font-mono text-sm font-bold",
          highlight && "text-primary",
          danger && "text-destructive"
        )}>
          {value}
        </span>
      </div>
    </div>
  );
}
