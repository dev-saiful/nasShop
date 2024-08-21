// import { Link } from "react-router-dom"

// export default function CheckoutSteps({step1, step2, step3, step4}) {
//   return (
//     <div className=" flex w-full sm:w-[500px] items-center justify-between gap-6 font-medium">
//         <div className=" px-3 py-2 rounded-sm bg-black text-white">
//             {
//                 step1 ? <Link to='/login'>Sign In</Link> : <Link className=" pointer-events-none opacity-50" >Sign In</Link>
//             }
//         </div>
//         <div className=" px-3 py-2 rounded-sm bg-black text-white">
//             {
//                 step2 ? <Link to='/shipping'>Shipping</Link> : <Link className=" pointer-events-none opacity-50" >Shipping</Link>
//             }
//         </div>
//         <div className=" px-3 py-2 rounded-sm bg-black text-white">
//             {
//                 step3 ? <Link to='/payment'>Payment</Link> : <Link className="pointer-events-none opacity-50" >Payment</Link>
//             }
//         </div>
//         <div className=" px-3 py-2 rounded-sm bg-black text-white">
//             {
//                 step4 ? <Link to='/placeorder'>Placeorder</Link> : <Link className=" pointer-events-none opacity-50" >Placeorder</Link>
//             }
//         </div>
//     </div>
//   )
// }
import { Link } from "react-router-dom";

export default function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <div className="flex items-center justify-between w-full sm:w-[500px] gap-2 sm:gap-4 text-xs sm:text-sm md:text-base font-medium">
      <div className="flex-1 text-center">
        {step1 ? (
          <Link to="/login" className="block py-2 px-1 sm:px-2 bg-black text-white rounded-sm">
            Sign In
          </Link>
        ) : (
          <span className="block py-2 px-1 sm:px-2 bg-gray-300 text-gray-500 rounded-sm cursor-not-allowed">
            Sign In
          </span>
        )}
      </div>
      <div className="flex-1 text-center">
        {step2 ? (
          <Link to="/shipping" className="block py-2 px-1 sm:px-2 bg-black text-white rounded-sm">
            Shipping
          </Link>
        ) : (
          <span className="block py-2 px-1 sm:px-2 bg-gray-300 text-gray-500 rounded-sm cursor-not-allowed">
            Shipping
          </span>
        )}
      </div>
      <div className="flex-1 text-center">
        {step3 ? (
          <Link to="/payment" className="block py-2 px-1 sm:px-2 bg-black text-white rounded-sm">
            Payment
          </Link>
        ) : (
          <span className="block py-2 px-1 sm:px-2 bg-gray-300 text-gray-500 rounded-sm cursor-not-allowed">
            Payment
          </span>
        )}
      </div>
      <div className="flex-1 text-center">
        {step4 ? (
          <Link to="/placeorder" className="block py-2 px-1 sm:px-2 bg-black text-white rounded-sm">
            Place Order
          </Link>
        ) : (
          <span className="block py-2 px-1 sm:px-2 bg-gray-300 text-gray-500 rounded-sm cursor-not-allowed">
            Place Order
          </span>
        )}
      </div>
    </div>
  );
}
