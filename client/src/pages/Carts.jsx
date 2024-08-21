// import { useDispatch, useSelector } from "react-redux";
// import { MdDelete } from "react-icons/md";
// import { Link, useNavigate } from "react-router-dom";
// import { addToCart, removeFromCart } from "../slice/cartSlice";

// export default function Carts() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { cartItems, totalPrice } = useSelector((state) => state.cart);

//   //here x is the each item

//   const changeHandler = async (x, e) => {
//     dispatch(addToCart({ ...x, qty: e }));
//   };

//   const removeFromCartHandler = async (x) => {
//     dispatch(removeFromCart(x));
//   };

//   function checkOutHandler() {
//     //if user logged in then show shipping page otherwise show login page
//     navigate("/login?redirect=/shipping");
//   }

//   return (
//     <div>
//       {cartItems.length > 0 ? (
//         <div className=" grid w-full sm:grid-cols-12 sm:px-14">
//           <div className=" sm:col-span-9 px-5">
//             <p>Shopping Cart</p>
//             {cartItems.map((x, idx) => (
//               <div key={x._id}>
//                 <div className=" grid sm:grid-cols-7 items-start ">
//                   <img
//                     src={x.image}
//                     className="sm:col-span-1"
//                     alt="product_image"
//                   />
//                   <Link
//                     className="sm:col-span-3 sm:px-3"
//                     to={`/product/${x._id}`}
//                   >
//                     <p>{x.description}</p>
//                   </Link>
//                   <p className="sm:col-span-1">${x.price}</p>
//                   <input
//                     className="sm:col-span-1 sm:pl-3 sm:mx-4 border-solid rounded-md border outline-none  font-medium"
//                     type="number"
//                     value={x.qty}
//                     min={1}
//                     max={x.countInStock}
//                     onChange={(e) => changeHandler(x, Number(e.target.value))}
//                   />
//                   <MdDelete
//                     onClick={() => removeFromCartHandler(x)}
//                     className="sm:col-span-1 text-2xl cursor-pointer"
//                   ></MdDelete>
//                 </div>
//                 {cartItems.length > idx + 1 && <hr className=" my-3"></hr>}
//               </div>
//             ))}
//           </div>
//           <div className=" sm:col-span-3 p-4 border rounded shadow-sm mt-4">
//             <p className="text-2xl font-semibold py-2">
//               Total {cartItems.reduce((acc, qt) => acc + qt.qty, 0)} items
//             </p>
//             <p>${totalPrice}</p>
//             <hr className="my-4" />
//             <button
//               onClick={checkOutHandler}
//               disabled={cartItems.length <= 0}
//               className=" rounded bg-black text-white font-medium py-2 px-4"
//             >
//               Proceed To Checkout
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div>
//           <p>No Item</p>
//         </div>
//       )}
//     </div>
//   );
// }
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../slice/cartSlice";
import QuantitySelector from "../components/QuantitySelector";

export default function Carts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, totalPrice } = useSelector((state) => state.cart);

  const changeHandler = async (item, qty) => {
    dispatch(addToCart({ ...item, qty }));
  };

  const removeFromCartHandler = async (item) => {
    dispatch(removeFromCart(item));
  };

  function checkOutHandler() {
    navigate("/login?redirect=/shipping");
  }

  return (
    <div className="px-4 sm:px-14 py-8">
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <h1 className="text-2xl font-semibold">Shopping Cart</h1>
            {cartItems.map((item) => (
              <div key={item._id} className="flex flex-col sm:flex-row items-center bg-white p-4 shadow-sm rounded-lg overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg sm:w-32 sm:h-32"
                />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full mt-4 sm:mt-0 sm:ml-4">
                  <Link
                    to={`/product/${item._id}`}
                    className="text-lg font-medium text-gray-800 sm:flex-1"
                  >
                    {item.name}
                  </Link>
                  <p className="text-lg font-semibold text-gray-800 sm:flex-1 sm:text-center">
                    ${item.price}
                  </p>
                  <div className="flex items-center mt-4 sm:mt-0 sm:flex-1 sm:justify-center">
                    <QuantitySelector
                      initialQty={item.qty}
                      maxQty={item.countInStock}
                      onChange={(qty) => changeHandler(item, qty)}
                    />
                  </div>
                  <div onClick={() => removeFromCartHandler(item)} className=" cursor-pointer w-full sm:w-fit px-6 py-2 mt-4 sm:mt-0 sm:ml-4 rounded flex justify-center bg-slate-300">
                  <MdDelete
                    
                    className="text-2xl text-red-600 cursor-pointer"
                  /> </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-xl font-semibold">Summary</h2>
            <p className="text-lg font-medium mt-2">
              Total Items: {cartItems.reduce((acc, item) => acc + item.qty, 0)}
            </p>
            <p className="text-lg font-semibold mt-2">
              Total Price: ${totalPrice}
            </p>
            <button
              onClick={checkOutHandler}
              disabled={cartItems.length <= 0}
              className="w-full mt-4 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">Your cart is empty.</p>
          <Link
            to="/"
            className="mt-4 inline-block text-indigo-600 hover:underline"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
