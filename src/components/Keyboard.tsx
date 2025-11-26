import { Delete } from 'lucide-react';
import { useEffect } from 'react';
import type { KEY_PRESS } from '../../Types';
const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace'],
];

export default function Keyboard({ onKeyPress }: KEY_PRESS) {
  const handleClick = (key: string) => {
    onKeyPress(key.toUpperCase());
    console.log(key)
  };
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      if (key == 'Enter' || key == 'Backspace' || /^[a-zA-Z]$/.test(key)) {        
        onKeyPress(key.toUpperCase());
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onKeyPress]);

  return (
    <div className='flex flex-col gap-1 pt-0 pb-0 pl-2 pr-2 min-w-[50%] max-w-[60%] justify-center'>
      {KEYBOARD_ROWS.map((row, rowIndex) => {
        return (
          <div
            key={rowIndex}
            className='flex justify-center gap-1.5 w-full'
          >
            {row.map((key) => (
              <button
                key={key}
                onClick={() => handleClick(key)}
                className={`items-center justify-center rounded-md p-1 font-bold border-0 h-9 cursor-pointer text-white flex-1 ${
                  key === 'Backspace' || key === 'Enter'
                    ? 'bg-red-800 w-[90px]'
                    : 'bg-green-800'
                }`}
              >
                {key === 'Backspace' ? <Delete /> : key}
              </button>
            ))}
          </div>
        );
      })}
    </div>
  );
}
