import { Card, CardContent, CardFooter, CardTitle } from './ui/card'
import { Crown, SkullIcon } from 'lucide-react'
import { Button } from './ui/button'

export default function GameOver({gameResult, solution}:{gameResult: 'lost'|'won'|'', solution: string}) {
    function handleRestart(){      
        window.location.reload()
    }
   
  return (  
          <div className='fixed inset-0 bg-primary/40 flex flex-col justify-center items-center min-h-screen min-w-screen top-0 left-0 z-10'>
              <Card className='relative rounded-lg bg-secondary/60 shadow-2xl w-80'>
              <Button onClick={handleRestart} className='absolute top-0 right-0 cursor-pointer text-center font-bold text-md p-1 h-14 w-14 rounded-md bg-transparent'>Close</Button>
                  <CardTitle className='border-b-amber-800 font-bold text-2xl text-center uppercase text-red-600'>Game over</CardTitle>
                  <CardContent className='flex flex-col justify-center items-center space-y-3'>
                  <h1 className='animate-bounce text-center'>{gameResult === 'lost'? 'You lost, better luck next time': 'congrats you just won !'}</h1>
                  <h1 className='text-secondary'>The solution is: <span className=' font-bold uppercase text-primary'>{solution}</span> </h1>
                  {
                    gameResult === 'lost' ?
                  <SkullIcon size={100} className='fill-violet-500'/>:
                  <Crown size={100} />
                  }
                  </CardContent>
                  <CardFooter className='border-t-amber-900 flex gap-2 items-center justify-center'>
                      <h2 className='text-primary'>Play again ? </h2>
                      <Button variant={'destructive'} className='cursor-pointer font-bold text-xl' onClick={handleRestart}>Restart</Button>
                  </CardFooter>
              </Card>
          </div>
  )
}
