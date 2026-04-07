import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { WordDisplay } from "./WordDisplay";
import { WordInput } from "./WordInput";
import { GameStats } from "./GameStats";
import { GameComplete } from "./GameComplete";
import {
  GameMode,
  Difficulty,
  generatePuzzle,
  getDailyChallenge,
  validateMove,
  getHint,
  calculateScore,
} from "@/lib/gameEngine";
import { Lightbulb, RotateCcw, ArrowDown, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface GameBoardProps {
  mode: GameMode;
  difficulty: Difficulty;
  isDaily?: boolean;
  onBack: () => void;
}

interface ActiveGame {
  startWord: string;
  targetWord: string;
  path: string[];
  optimalSteps: number;
  hintsUsed: number;
  startTime: number;
  isComplete: boolean;
  isWon: boolean;
}

export function GameBoard({ mode, difficulty, isDaily, onBack }: GameBoardProps) {
  const [error, setError] = useState<string>();

  const initGame = useCallback((): ActiveGame => {
    const puzzle = isDaily ? getDailyChallenge() : generatePuzzle(difficulty);
    return {
      startWord: puzzle.start,
      targetWord: puzzle.target,
      path: [puzzle.start],
      optimalSteps: puzzle.optimalSteps,
      hintsUsed: 0,
      startTime: Date.now(),
      isComplete: false,
      isWon: false,
    };
  }, [difficulty, isDaily]);

  const [game, setGame] = useState<ActiveGame>(initGame);

  const currentWord = game.path[game.path.length - 1];
  const timeLimit = mode === "timed" ? (difficulty === "easy" ? 60 : difficulty === "medium" ? 90 : 120) : undefined;
  const moveLimit = mode === "limited" ? game.optimalSteps + 3 : undefined;

  const handleSubmit = (word: string) => {
    setError(undefined);
    const result = validateMove(currentWord, word);

    if (!result.valid) {
      setError(result.error);
      return;
    }

    // Check if word is already in path (no loops)
    if (game.path.includes(word)) {
      setError("Word already used in your path");
      return;
    }

    const newPath = [...game.path, word];
    const won = word === game.targetWord;
    const outOfMoves = moveLimit ? newPath.length - 1 >= moveLimit : false;

    setGame((prev) => ({
      ...prev,
      path: newPath,
      isComplete: won || outOfMoves,
      isWon: won,
    }));

    if (won) {
      toast.success("You solved it! 🎉");
    } else if (outOfMoves) {
      toast.error("Out of moves! 😔");
    }
  };

  const handleHint = () => {
    const hint = getHint(currentWord, game.targetWord);
    if (hint) {
      toast.info(`Try: ${hint.toUpperCase()}`, { duration: 3000 });
      setGame((prev) => ({ ...prev, hintsUsed: prev.hintsUsed + 1 }));
    } else {
      toast.error("No hint available from this position. Try undoing a step.");
    }
  };

  const handleUndo = () => {
    if (game.path.length <= 1) return;
    setGame((prev) => ({
      ...prev,
      path: prev.path.slice(0, -1),
    }));
    setError(undefined);
  };

  const handleTimeUp = () => {
    setGame((prev) => ({ ...prev, isComplete: true, isWon: false }));
    toast.error("Time's up! ⏰");
  };

  const handleRestart = () => {
    setGame((prev) => ({
      ...prev,
      path: [prev.startWord],
      hintsUsed: 0,
      startTime: Date.now(),
      isComplete: false,
      isWon: false,
    }));
    setError(undefined);
  };

  const handleNewGame = () => {
    setGame(initGame());
    setError(undefined);
  };

  const timeTaken = (Date.now() - game.startTime) / 1000;

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex w-full items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack}>
          ← Menu
        </Button>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium capitalize text-muted-foreground">
            {isDaily ? "Daily" : mode}
          </span>
          {!isDaily && (
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium capitalize text-muted-foreground">
              {difficulty}
            </span>
          )}
        </div>
      </div>

      {/* Stats */}
      <GameStats
        steps={game.path.length - 1}
        optimalSteps={game.optimalSteps}
        hintsUsed={game.hintsUsed}
        startTime={game.startTime}
        timeLimit={timeLimit}
        moveLimit={moveLimit}
        isComplete={game.isComplete}
        onTimeUp={handleTimeUp}
      />

      {/* Game area */}
      {!game.isComplete ? (
        <>
          {/* Start word */}
          <WordDisplay word={game.startWord} label="Start" variant="start" />

          {/* Path */}
          {game.path.length > 1 && (
            <div className="flex flex-col items-center gap-2">
              {game.path.slice(1).map((word, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <ArrowDown className="h-4 w-4 text-muted-foreground" />
                  <WordDisplay
                    word={word}
                    comparedTo={game.path[i]}
                    variant="path"
                    animate
                  />
                </div>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex flex-col items-center gap-2">
            <ArrowDown className="h-4 w-4 text-muted-foreground" />
            <WordInput
              wordLength={game.startWord.length}
              onSubmit={handleSubmit}
              error={error}
            />
          </div>

          {/* Target word */}
          <div className="flex flex-col items-center gap-1">
            <ArrowDown className="h-4 w-4 text-muted-foreground opacity-30" />
            <span className="text-xs text-muted-foreground">⋮</span>
            <ArrowDown className="h-4 w-4 text-muted-foreground opacity-30" />
          </div>
          <WordDisplay word={game.targetWord} label="Target" variant="target" />

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={handleUndo} disabled={game.path.length <= 1}>
              <RotateCcw className="mr-1 h-3.5 w-3.5" /> Undo
            </Button>
            <Button variant="outline" size="sm" onClick={handleHint}>
              <Lightbulb className="mr-1 h-3.5 w-3.5" /> Hint
            </Button>
            <Button variant="outline" size="sm" onClick={handleRestart}>
              <Sparkles className="mr-1 h-3.5 w-3.5" /> Reset
            </Button>
          </div>
        </>
      ) : (
        <GameComplete
          isWon={game.isWon}
          path={game.path}
          optimalSteps={game.optimalSteps}
          timeTaken={timeTaken}
          hintsUsed={game.hintsUsed}
          startWord={game.startWord}
          targetWord={game.targetWord}
          onNewGame={handleNewGame}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
