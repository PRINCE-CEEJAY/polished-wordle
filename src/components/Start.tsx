import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import type { SetStateAction } from 'react';
import type React from 'react';

type START_PROPS = {
  setStartGame: React.Dispatch<SetStateAction<boolean>>;
  difficulty: "Easy" | "Medium" | "Hard";
  setDifficulty: React.Dispatch<SetStateAction<"Easy" | "Medium" | "Hard">>;
  setBoxes: React.Dispatch<SetStateAction<{row: number, col: number}>>
}
export default function Start({setStartGame, difficulty, setDifficulty, setBoxes}:START_PROPS) {
  function handleStart(){
    switch(difficulty){
      case 'Medium':{
        setBoxes(prev=>({...prev, row: 5}))
        break;
      }
      case 'Hard': {
        setBoxes(prev=>({...prev, row: 5}))
        break;
      }
      default: setBoxes(prev=>({...prev, row: 6}))
    }
    setStartGame(true)
  }
  return (
    <div className='fixed inset-0 bg-secondary/50 flex flex-col justify-center items-center min-h-screen'>
      <Card className='w-md text-center z-15 bg-secondary'>
        <CardHeader>
          <CardTitle className='border-b-4'>WORDLE GAME</CardTitle>
          <CardDescription>
            Configure your game choices below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h1 className='text-center font-bold'>Choose Game Level</h1>
          <select className='w-sm font-bold rounded-lg bg-background p-2' value={difficulty} onChange={(event)=>setDifficulty(event.target.value as "Easy" | "Medium" | "Hard")}>
            <option value= {'Easy'}>Easy</option>
            <option value={'Medium'}>Medium</option>
            <option value={'Hard'}>Hard</option>
          </select>
        </CardContent>
        <CardFooter className='flex-col gap-2'>
          <Button            
          variant={'outline'}
            className='w-full cursor-pointer font-bold'
            onClick = {handleStart}
          >
            Start Game
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
