import { Button } from "@/components/ui/button";
import { calculateScore, findShortestPath } from "@/lib/gameEngine";
import { Trophy, Star, Footprints, Timer, Lightbulb, RotateCcw, ArrowRight } from "lucide-react";
import { WordDisplay } from "./WordDisplay";

interface GameCompleteProps {
  isWon: boolean;
  path: string[];
  optimalSteps: number;
  timeTaken: number;
  hintsUsed: number;
  startWord: string;
  targetWord: string;
  onNewGame: () => void;
  onRestart: () => void;
}

export function GameComplete({
  isWon,
  path,
  optimalSteps,
  timeTaken,
  hintsUsed,
  startWord,
  targetWord,
  onNewGame,
  onRestart,
}: GameCompleteProps) {
  const steps = path.length - 1;
  const score = isWon ? calculateScore(steps, optimalSteps, timeTaken, hintsUsed) : 0;
  const optimalPath = findShortestPath(startWord, targetWord);

  const stars = score >= 120 ? 3 : score >= 80 ? 2 : score >= 40 ? 1 : 0;

  return (
    <div className="flex flex-col items-center gap-6 rounded-xl border bg-card p-6 shadow-lg animate-slide-up">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-bold">
          {isWon ? "🎉 Puzzle Solved!" : "😔 Game Over"}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {isWon ? "Great job transforming the word!" : "Better luck next time!"}
        </p>
      </div>

      {isWon && (
        <>
          <div className="flex gap-1">
            {[1, 2, 3].map((s) => (
              <Star
                key={s}
                className={`h-8 w-8 transition-all ${s <= stars ? "fill-warning text-warning scale-110" : "text-muted"}`}
              />
            ))}
          </div>

          <div className="flex gap-6 text-center">
            <div className="flex flex-col items-center">
              <Trophy className="h-5 w-5 text-primary mb-1" />
              <span className="font-mono text-2xl font-bold text-primary">{score}</span>
              <span className="text-xs text-muted-foreground">Score</span>
            </div>
            <div className="flex flex-col items-center">
              <Footprints className="h-5 w-5 text-muted-foreground mb-1" />
              <span className="font-mono text-2xl font-bold">{steps}</span>
              <span className="text-xs text-muted-foreground">Steps</span>
            </div>
            <div className="flex flex-col items-center">
              <Timer className="h-5 w-5 text-muted-foreground mb-1" />
              <span className="font-mono text-2xl font-bold">{Math.floor(timeTaken)}s</span>
              <span className="text-xs text-muted-foreground">Time</span>
            </div>
            <div className="flex flex-col items-center">
              <Lightbulb className="h-5 w-5 text-muted-foreground mb-1" />
              <span className="font-mono text-2xl font-bold">{hintsUsed}</span>
              <span className="text-xs text-muted-foreground">Hints</span>
            </div>
          </div>
        </>
      )}

      {optimalPath && optimalPath.length - 1 < steps && (
        <div className="w-full rounded-lg border bg-muted/50 p-3">
          <p className="text-xs font-medium text-muted-foreground mb-2">Optimal path ({optimalPath.length - 1} steps):</p>
          <div className="flex flex-wrap items-center gap-1">
            {optimalPath.map((w, i) => (
              <span key={i} className="flex items-center gap-1">
                <span className="font-mono text-sm font-semibold uppercase">{w}</span>
                {i < optimalPath.length - 1 && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <Button variant="outline" onClick={onRestart}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Restart
        </Button>
        <Button onClick={onNewGame}>
          New Game
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
