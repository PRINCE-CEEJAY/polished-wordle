import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const states: string[] = Array(5).fill('')
export function getLetterState(guess:string, solution:string){
if(!guess || !solution) return Array(5).fill('absent');

const guessChars: string[] = [...guess]
const solutionChars: string[] = [...solution]

// Mark green
guessChars.forEach((char, i)=>{
  if(char === solutionChars[i]){
    states[i] = 'correct';
    solutionChars[i] = ''
  }
})


// Mark yellow
guessChars.forEach((char, i) => {
  if(states[i]=== 'correct') return;
  const solutionIndex = solutionChars.indexOf(char)
  if(solutionIndex !== -1){
    states[i] = 'present'
    solutionChars[solutionIndex] = ''
  }
});
return states;
}