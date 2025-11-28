import Grid from './components/Grid';
import { useEffect, useState } from 'react';
import Keyboard from './components/Keyboard';
import Message from './components/Message';
import { getKeyboardStates } from './lib/utils';
import words from './assets/words.json';
import Hint from './components/Hint';
import GameOver from './components/game-over-modal';
import Start from './components/Start';
import Timer from './components/Timer';

export default function App() {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [solution, setSolution] = useState('');
  const [message, setMessage] = useState('');
  const [hint, setHint] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [startGame, setStartGame] = useState(false)
  const [difficulty, setDifficulty] = useState<'Easy'|'Medium'|'Hard'>('Easy')
  const [timer, setTimer] = useState(120)
  const [boxes, setBoxes] = useState({row: 6, col:5})
  const [gameResult, setGameResult] = useState<'lost'| 'won' | ''>('')

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
        setHint(definition);
      } catch (error) {
        console.log('Error:', error);
        setHint('hint unavailable');
      }
    }
    fetchHint();
  }, [solution]);

  function showMessage(text: string) {
    setMessage(text);
    setTimeout(() => {
      setMessage('');
    }, 2000);
  }
  function handleKeys(key: string) {
    if (guesses.length === boxes.row) {
      setGameResult('lost')
      showMessage('You are out of guesses!');
      setIsGameOver(true)
      setGuesses([])
      return;
    }
    if (key === 'ENTER') {
      if (currentGuess.length === boxes.col) {
        setGuesses([...guesses, currentGuess]);

        if (currentGuess === solution) {
          showMessage('Congrats, you won');
          setIsGameOver(true);
          setGameResult('won')
        }
        setCurrentGuess('');
      }
    } else if (key === 'BACKSPACE') {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (currentGuess.length < boxes.row) {
      setCurrentGuess((prevGuess) => prevGuess + key.toLocaleLowerCase());
    }
  }
  const keyboardStates = getKeyboardStates(guesses, solution);

  useEffect(()=>{
    if(!startGame || isGameOver || difficulty !== 'Hard') return;
    const countDown = setInterval(()=>{
      setTimer(prev=>{
        if(prev <= 1) {
          setIsGameOver(true)
          clearInterval(countDown)
          return 0;
        };
        return prev - 1;
      })      
    }, 1000)  
    return ()=> clearInterval(countDown)
   }, [startGame, difficulty, isGameOver])
 console.log('the solution is: ' + solution)
  return (
    <>
    {
      startGame ?
    <div className='flex flex-col justify-center items-center dark'>
      {hint && difficulty === 'Easy' && <Hint hint={hint}/>}
      {difficulty === 'Hard' && <Timer timer={timer}/>}
      <Grid
        guesses={guesses}
        currentGuess={currentGuess}
        boxes = {boxes}
        solution={solution}
        />
        {message && <Message message={message} />}
      <Keyboard
        onKeyPress={handleKeys}
        keyboardStates={keyboardStates}
        isGameOver={isGameOver}
      />
    </div> :
    <Start setStartGame={setStartGame} difficulty={difficulty} setDifficulty={setDifficulty} setBoxes={setBoxes}/>
    }
    {isGameOver && <GameOver gameResult = {gameResult} solution={solution}/> }
    </>
  );
}
