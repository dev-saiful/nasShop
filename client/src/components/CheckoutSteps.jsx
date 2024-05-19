import { Link } from "react-router-dom"

export default function CheckoutSteps({step1, step2, step3, step4}) {
  return (
    <div className=" flex w-full sm:w-[500px] items-center justify-between gap-6 font-medium">
        <div className=" px-3 py-2 rounded-sm bg-black text-white">
            {
                step1 ? <Link to='/login'>Sign In</Link> : <Link className=" pointer-events-none opacity-50" >Sign In</Link>
            }
        </div>
        <div className=" px-3 py-2 rounded-sm bg-black text-white">
            {
                step2 ? <Link to='/shipping'>Shipping</Link> : <Link className=" pointer-events-none opacity-50" >Shipping</Link>
            }
        </div>
        <div className=" px-3 py-2 rounded-sm bg-black text-white">
            {
                step3 ? <Link to='/payment'>Payment</Link> : <Link className="pointer-events-none opacity-50" >Payment</Link>
            }
        </div>
        <div className=" px-3 py-2 rounded-sm bg-black text-white">
            {
                step4 ? <Link to='/placeorder'>Placeorder</Link> : <Link className=" pointer-events-none opacity-50" >Placeorder</Link>
            }
        </div>
    </div>
  )
}
