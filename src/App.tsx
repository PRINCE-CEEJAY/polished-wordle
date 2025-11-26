import Grid from './components/Grid';
import { useEffect, useState } from 'react';
import Keyboard from './components/Keyboard';
import Message from './components/Message';
import { getKeyboardStates } from './lib/utils';
import words from './assets/words.json';
import Hint from './components/Hint';

export default function App() {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [solution, setSolution] = useState('');
  const [message, setMessage] = useState('');
  const [hint, setHint] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);

  const data = words.words
  
  useEffect(() => {
    async function fetchWord() {
      try {
        const randomWord = data[Math.floor(Math.random() * data.length)];
        setSolution(randomWord);
      } catch (error) {
        console.log('Error:', error);
        setSolution('ninja');
      }
    }
    fetchWord();
  }, [data]);
  
  useEffect(() => {
    async function fetchHint() {
      if (!solution) return;
      try {
        const response = await fetch(`/api/${solution}`);
        const responseData = await response.json();
        const definition = responseData.entries[0].senses[0].definition;
        console.log(definition);
        setHint(definition);
      } catch (error) {
        console.log('Error:', error);
        setHint('hint unavailable');
      }
    }
    fetchHint();
  }, [solution]);

  console.log(solution);
  
  function showMessage(text: string) {
    setMessage(text);
    setTimeout(() => {
      setMessage('');
    }, 2000);
  }
  function handleKeys(key: string) {
    if (guesses.length === 6) {
      showMessage('You are out of guesses!');
      return;
    }
    if (key === 'ENTER') {
      if (currentGuess.length === 5) {
        setGuesses([...guesses, currentGuess]);

        if (currentGuess === solution) {
          setIsGameOver(true);
          showMessage('Congrats, you won');
        }
        setCurrentGuess('');
      }
    } else if (key === 'BACKSPACE') {
      showMessage('backspace pressed');
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (currentGuess.length < 5) {
      setCurrentGuess((prevGuess) => prevGuess + key.toLocaleLowerCase());
    }
  }
  const keyboardStates = getKeyboardStates(guesses, solution);

  setTimeout(() => {
    console.log(solution);
  }, 1200);

  return (
    <div className='flex flex-col justify-center items-center dark'>
      {hint && <Hint hint={hint}/>}
      <Grid
        guesses={guesses}
        currentGuess={currentGuess}
        solution={solution}
        />
        {message && <Message message={message} />}
      <Keyboard
        onKeyPress={handleKeys}
        keyboardStates={keyboardStates}
        isGameOver={isGameOver}
      />
    </div>
  );
}
