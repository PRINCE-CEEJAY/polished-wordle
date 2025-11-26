export default function Hint({ hint }: { hint: string }) {
  return (
    <div>
      <h1 className='py-1 px-3 rounded-xl w-fit text-center text-primary bg-amber-600 font-bold'>
        {hint}
      </h1>
    </div>
  );
}
