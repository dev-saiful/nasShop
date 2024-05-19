import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../slice/cartSlice";

export default function Carts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, totalPrice } = useSelector((state) => state.cart);

  //here x is the each item

  const changeHandler = async (x, e) => {
    dispatch(addToCart({ ...x, qty: e }));
  };

  const removeFromCartHandler = async (x) => {
    dispatch(removeFromCart(x));
  };

  function checkOutHandler() {
    //if user logged in then show shipping page otherwise show login page
    navigate("/login?redirect=/shipping");
  }

  return (
    <div>
      {cartItems.length > 0 ? (
        <div className=" grid w-full sm:grid-cols-12 sm:px-14">
          <div className=" sm:col-span-9 px-5">
            <p>Shopping Cart</p>
            {cartItems.map((x, idx) => (
              <div key={x._id}>
                <div className=" grid sm:grid-cols-7 items-start ">
                  <img
                    src={x.image}
                    className="sm:col-span-1"
                    alt="product_image"
                  />
                  <Link
                    className="sm:col-span-3 sm:px-3"
                    to={`/product/${x._id}`}
                  >
                    <p>{x.description}</p>
                  </Link>
                  <p className="sm:col-span-1">${x.price}</p>
                  <input
                    className="sm:col-span-1 sm:pl-3 sm:mx-4 border-solid rounded-md border outline-none  font-medium"
                    type="number"
                    value={x.qty}
                    min={1}
                    max={x.countInStock}
                    onChange={(e) => changeHandler(x, Number(e.target.value))}
                  />
                  <MdDelete
                    onClick={() => removeFromCartHandler(x)}
                    className="sm:col-span-1 text-2xl cursor-pointer"
                  ></MdDelete>
                </div>
                {cartItems.length > idx + 1 && <hr className=" my-3"></hr>}
              </div>
            ))}
          </div>
          <div className=" sm:col-span-3 p-4 border rounded shadow-sm mt-4">
            <p className="text-2xl font-semibold py-2">
              Total {cartItems.reduce((acc, qt) => acc + qt.qty, 0)} items
            </p>
            <p>${totalPrice}</p>
            <hr className="my-4" />
            <button
              onClick={checkOutHandler}
              disabled={cartItems.length <= 0}
              className=" rounded bg-black text-white font-medium py-2 px-4"
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>No Item</p>
        </div>
      )}
    </div>
  );
}
