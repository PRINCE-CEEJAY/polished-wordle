import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLetterState(guess: string, solution: string | null) {
  if (!guess || !solution) return Array(5).fill('absent');

  const states = Array(5).fill('absent');
  const guessChars = [...guess];
  const solutionChars: (string | null)[] = [...solution];

  // First pass: mark correct
  guessChars.forEach((char, i) => {
    if (char === solutionChars[i]) {
      states[i] = 'correct';
      solutionChars[i] = null;
    }
  });

  // Second pass: mark present (yellow)
  guessChars.forEach((char, i) => {
    if (states[i] === 'correct') return;
    const indexInSolution = solutionChars.indexOf(char);
    if (indexInSolution !== -1) {
      states[i] = 'present';
      solutionChars[indexInSolution] = null;
    }
  });

  return states;
}

export function getKeyboardStates(guesses: string[], solution: string) {
  const keyStates: Record<string, string> = {};

  guesses.forEach((guess) => {
    const states = getLetterState(guess, solution);

    [...guess].forEach((letter, i) => {
      const currentState = keyStates[letter] || 'unused';
      const newState = states[i];

      if (currentState === 'correct') return;
      if (currentState === 'present' && newState !== 'correct') return;

      keyStates[letter] = newState;
    });
  });

  return keyStates;
}
