
export default function Timer({timer}:{timer: number}) {
  return (
    <div className="flex justify-center items-center p-1 h-10 w-10 rounded-full font-bold text-xl bg-amber-800 text-primary-foreground border-2 border-black">{timer}</div>
  )
}
