import type { GRID_PROPS } from "../../Types";
const rows = 6;
const cols = 5;

export default function Grid({ guesses, currentGuess }: GRID_PROPS) {
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
          return (
            <div
              key={rowIndex}
              className='flex gap-[5px]'
            >
              {Array(cols)
                .fill('')
                .map((_, colIndex) => {
                  const letter: string =
                    allGuesses[rowIndex]?.[colIndex] || '';
                  return (
                    <div
                      key={rowIndex - colIndex}
                      className='flex justify-center items-center w-12 h-12 border-[#636569] border-2 font-bold text-3xl uppercase rounded-xl'
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
