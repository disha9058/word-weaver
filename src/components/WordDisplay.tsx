import { cn } from "@/lib/utils";

interface WordDisplayProps {
  word: string;
  comparedTo?: string;
  label?: string;
  variant?: "start" | "target" | "path" | "current";
  animate?: boolean;
}

export function WordDisplay({ word, comparedTo, label, variant = "path", animate = false }: WordDisplayProps) {
  const letters = word.split("");

  const variantStyles = {
    start: "bg-primary/10 border-primary/30",
    target: "bg-accent/10 border-accent/30",
    path: "bg-card border-border",
    current: "bg-primary/5 border-primary/50 animate-pulse-glow",
  };

  return (
    <div className={cn("flex flex-col items-center gap-1", animate && "animate-slide-up")}>
      {label && (
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
      )}
      <div className={cn("flex gap-1.5 rounded-lg border p-2", variantStyles[variant])}>
        {letters.map((letter, i) => {
          const isChanged = comparedTo && comparedTo[i] !== letter;
          return (
            <div
              key={`${i}-${letter}`}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-md font-mono text-lg font-bold uppercase transition-all sm:h-12 sm:w-12 sm:text-xl",
                isChanged
                  ? "bg-primary text-primary-foreground scale-105"
                  : "bg-muted text-foreground",
                animate && isChanged && "animate-letter-pop"
              )}
            >
              {letter}
            </div>
          );
        })}
      </div>
    </div>
  );
}
