import { isValidWord, getWordsOfLength } from "./dictionary";

export type GameMode = "classic" | "timed" | "limited";
export type Difficulty = "easy" | "medium" | "hard";

export interface GameState {
  startWord: string;
  targetWord: string;
  path: string[];
  mode: GameMode;
  difficulty: Difficulty;
  optimalSteps: number;
  hintsUsed: number;
  startTime: number;
  timeLimit?: number; // seconds, for timed mode
  moveLimit?: number; // for limited mode
  isComplete: boolean;
  isWon: boolean;
  score: number;
}

/** Check if two words differ by exactly one letter */
export function differsByOneLetter(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diffs = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) diffs++;
    if (diffs > 1) return false;
  }
  return diffs === 1;
}

/** Get the index of the changed letter between two words */
export function getChangedIndex(a: string, b: string): number {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return i;
  }
  return -1;
}

/** BFS to find shortest path between two words */
export function findShortestPath(start: string, target: string): string[] | null {
  if (start === target) return [start];
  const len = start.length;
  const words = getWordsOfLength(len);
  const wordSet = new Set(words);
  
  if (!wordSet.has(start) || !wordSet.has(target)) return null;

  const queue: string[][] = [[start]];
  const visited = new Set<string>([start]);

  while (queue.length > 0) {
    const path = queue.shift()!;
    const current = path[path.length - 1];

    // Find all neighbors (words differing by one letter)
    for (const word of wordSet) {
      if (visited.has(word)) continue;
      if (!differsByOneLetter(current, word)) continue;
      
      const newPath = [...path, word];
      if (word === target) return newPath;
      
      visited.add(word);
      queue.push(newPath);
    }
  }

  return null; // No path found
}

/** Get hint: the next word in the optimal path from current position */
export function getHint(currentWord: string, targetWord: string): string | null {
  const path = findShortestPath(currentWord, targetWord);
  if (!path || path.length < 2) return null;
  return path[1];
}

/** Generate a random puzzle for the given difficulty */
export function generatePuzzle(difficulty: Difficulty): { start: string; target: string; optimalSteps: number } {
  const lengthMap: Record<Difficulty, number[]> = {
    easy: [3, 4],
    medium: [4, 5],
    hard: [5, 6],
  };

  const lengths = lengthMap[difficulty];
  const wordLength = lengths[Math.floor(Math.random() * lengths.length)];
  const words = getWordsOfLength(wordLength);

  // Try to find a pair with a path of reasonable length
  const targetSteps: Record<Difficulty, [number, number]> = {
    easy: [2, 4],
    medium: [3, 6],
    hard: [4, 8],
  };

  const [minSteps, maxSteps] = targetSteps[difficulty];
  
  // Attempt up to 200 random pairs
  for (let attempt = 0; attempt < 200; attempt++) {
    const startIdx = Math.floor(Math.random() * words.length);
    const targetIdx = Math.floor(Math.random() * words.length);
    if (startIdx === targetIdx) continue;

    const start = words[startIdx];
    const target = words[targetIdx];
    
    const path = findShortestPath(start, target);
    if (path && path.length - 1 >= minSteps && path.length - 1 <= maxSteps) {
      return { start, target, optimalSteps: path.length - 1 };
    }
  }

  // Fallback: known good pairs
  const fallbacks: Record<Difficulty, { start: string; target: string; optimalSteps: number }[]> = {
    easy: [
      { start: "cat", target: "dog", optimalSteps: 3 },
      { start: "hot", target: "ice", optimalSteps: 3 },
      { start: "red", target: "sun", optimalSteps: 3 },
    ],
    medium: [
      { start: "cold", target: "warm", optimalSteps: 4 },
      { start: "lead", target: "gold", optimalSteps: 4 },
      { start: "head", target: "tail", optimalSteps: 5 },
    ],
    hard: [
      { start: "black", target: "white", optimalSteps: 6 },
      { start: "stone", target: "money", optimalSteps: 5 },
      { start: "brain", target: "storm", optimalSteps: 5 },
    ],
  };

  const options = fallbacks[difficulty];
  return options[Math.floor(Math.random() * options.length)];
}

/** Generate daily challenge based on date */
export function getDailyChallenge(): { start: string; target: string; optimalSteps: number; date: string } {
  const today = new Date();
  const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
  // Use date as seed for deterministic puzzle
  let seed = 0;
  for (let i = 0; i < dateStr.length; i++) {
    seed = ((seed << 5) - seed + dateStr.charCodeAt(i)) | 0;
  }
  
  const words4 = getWordsOfLength(4);
  const abseed = Math.abs(seed);
  
  // Try pairs deterministically
  for (let i = 0; i < 100; i++) {
    const startIdx = (abseed + i * 7) % words4.length;
    const targetIdx = (abseed + i * 13 + 41) % words4.length;
    if (startIdx === targetIdx) continue;
    
    const start = words4[startIdx];
    const target = words4[targetIdx];
    const path = findShortestPath(start, target);
    
    if (path && path.length - 1 >= 3 && path.length - 1 <= 6) {
      return { start, target, optimalSteps: path.length - 1, date: dateStr };
    }
  }

  return { start: "cold", target: "warm", optimalSteps: 4, date: dateStr };
}

/** Calculate score */
export function calculateScore(
  steps: number,
  optimalSteps: number,
  timeTaken: number,
  hintsUsed: number
): number {
  const stepBonus = Math.max(0, 100 - (steps - optimalSteps) * 15);
  const timeBonus = Math.max(0, 50 - Math.floor(timeTaken / 10));
  const hintPenalty = hintsUsed * 20;
  return Math.max(0, stepBonus + timeBonus - hintPenalty);
}

/** Validate a move */
export function validateMove(currentWord: string, nextWord: string): { valid: boolean; error?: string } {
  const curr = currentWord.toLowerCase().trim();
  const next = nextWord.toLowerCase().trim();

  if (next.length !== curr.length) {
    return { valid: false, error: "Word must be the same length" };
  }
  if (!differsByOneLetter(curr, next)) {
    return { valid: false, error: "Change exactly one letter" };
  }
  if (!isValidWord(next)) {
    return { valid: false, error: "Not a valid word" };
  }
  return { valid: true };
}
