export type KEY_PRESS = {onKeyPress:(key:string)=>void, keyboardStates: Record<string, string>,   isGameOver: boolean;}
export type GRID_PROPS = {
  guesses: string[];
  currentGuess: string;
  solution: string;
};