import type {MESSAGE_PROPS} from '../../Types'
export default function Message({message, hint}: MESSAGE_PROPS) {
  return <div>
    <h1 className='py-1 px-3 rounded-xl w-fit text-center text-primary bg-amber-600 font-bold'>{message}</h1>
    <h1 className='py-1 px-3 rounded-xl w-fit text-center text-background bg-amber-900 font-bold'>{hint}</h1>    
  </div>
}
