export type MESSAGE_PROPS = {message: string, hint: string}
export type KEY_PRESS = {onKeyPress:(key:string)=>void}
export type GRID_PROPS = {
  guesses: string[];
  currentGuess: string;
};