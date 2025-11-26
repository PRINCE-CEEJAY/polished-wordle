import type { GRID_PROPS } from '../../Types';
import { getLetterState } from '../lib/utils';
const rows = 6;
const cols = 5;

export default function Grid({ guesses, currentGuess, solution }: GRID_PROPS) {
  const allGuesses = [...guesses];
  if (currentGuess) {
    allGuesses.push(currentGuess);
  }
  while (allGuesses.length < rows) {
    allGuesses.push('');
  }

  return (
    <div className='flex flex-col justify-center items-center p-2.5 gap-[5px]'>
      {Array(rows)
        .fill('')
        .map((_, rowIndex) => {
          const isComplete = guesses.length > rowIndex;
          const states = isComplete
            ? getLetterState(allGuesses[rowIndex], solution)
            : Array(5).fill('');
          return (
            <div
              key={rowIndex}
              className='flex gap-[5px]'
            >
              {Array(cols)
                .fill('')
                .map((_, colIndex) => {
                  const letter: string = allGuesses[rowIndex]?.[colIndex] || '';
                  const letterState: string = states[colIndex];
                  return (
                    <div
                      key={rowIndex - colIndex}
                      className={`cell cell-${letterState}`}
                    >
                      {letter}
                    </div>
                  );
                })}
            </div>
          );
        })}
    </div>
  );
}
