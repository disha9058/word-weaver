import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface WordInputProps {
  wordLength: number;
  onSubmit: (word: string) => void;
  disabled?: boolean;
  error?: string;
}

export function WordInput({ wordLength, onSubmit, disabled = false, error }: WordInputProps) {
  const [letters, setLetters] = useState<string[]>(Array(wordLength).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    setLetters(Array(wordLength).fill(""));
  }, [wordLength]);

  useEffect(() => {
    if (error) {
      setShaking(true);
      const t = setTimeout(() => setShaking(false), 400);
      return () => clearTimeout(t);
    }
  }, [error]);

  const handleChange = (index: number, value: string) => {
    const char = value.slice(-1).toLowerCase();
    if (char && !/^[a-z]$/.test(char)) return;

    const newLetters = [...letters];
    newLetters[index] = char;
    setLetters(newLetters);

    if (char && index < wordLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !letters[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "Enter") {
      const word = letters.join("");
      if (word.length === wordLength) {
        onSubmit(word);
        setLetters(Array(wordLength).fill(""));
        inputRefs.current[0]?.focus();
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={cn("flex gap-1.5", shaking && "animate-shake")}>
        {letters.map((letter, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            type="text"
            value={letter}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            disabled={disabled}
            maxLength={2}
            className={cn(
              "h-10 w-10 rounded-md border-2 bg-card text-center font-mono text-lg font-bold uppercase transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:h-12 sm:w-12 sm:text-xl",
              error ? "border-destructive" : "border-input",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          />
        ))}
      </div>
      {error && (
        <p className="text-sm font-medium text-destructive animate-slide-up">{error}</p>
      )}
      <p className="text-xs text-muted-foreground">
        Type a word and press Enter
      </p>
    </div>
  );
}
