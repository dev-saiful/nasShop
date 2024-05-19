import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { useCreateOrderMutation } from "../slice/orderApiSlice";
import { clearCartItems } from "../slice/cartSlice";

export default function Placeorder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [createOrder, {isLoading, isError}] = useCreateOrderMutation()
  // console.log(useCreateOrderMutation());
  // console.log(createOrder);
  console.log(cart);
  const { cartItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice, taxPrice } = cart;
  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    } else if (!paymentMethod) {
      navigate("/payment");
    }
  }, [shippingAddress, paymentMethod, navigate]);
  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: itemsPrice,
        taxPrice: taxPrice,
        shippingPrice: shippingPrice,
        totalPrice: totalPrice}).unwrap()
        console.log(res);
      dispatch(clearCartItems())
      navigate(`/order/${res.data._id}`)
      toast.success(res.message)
    } catch (error) {
      toast.error(error)
      // console.log(error);
    }
  }
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className=" grid sm:grid-cols-12">
        <div className=" sm:col-span-8">
          <div>
            <h3>Shipping</h3>
            <p>
              <span>Address: </span>
              {`${shippingAddress.address}, ${shippingAddress.city} ${shippingAddress.postalCode}, ${shippingAddress.country}`}
            </p>
          </div>
          <hr />
          <div>
            <h3>Payment Method</h3>
            <p>
              <span>Method: </span>
              {paymentMethod}
            </p>
          </div>
          <hr />
          <div>
            <h3>Order Item</h3>
            <div>
              {cartItems.map((item, idx) => (
                <div key={idx}>
                  <div className=" grid grid-cols-7 gap-4">
                    <img src={item.image} alt="" className=" col-span-1" />
                    <p className=" col-span-4">
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </p>
                    <p className=" col-span-2">
                      {item.qty} x ${item.price} = ${item.qty * item.price}
                    </p>
                    {/* <p>{console.log(item)}</p> */}
                  </div>
                  {cartItems.length > idx+1  && <hr className=" my-3"></hr>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className=" grid gap-4 sm:col-span-4">
          <h3>Order Summary</h3>
          <div>
            <div className="grid grid-cols-2">
              <span className=" col-span-1">Item : </span><span className=" col-span-1">${itemsPrice}</span>
            </div>
            <hr />
            <div className="grid grid-cols-2">
              <span className=" col-span-1">Shipping : </span><span className=" col-span-1">${shippingPrice}</span>
            </div>
            <hr />
            <div className="grid grid-cols-2">
              <span className=" col-span-1">Tax : </span><span className=" col-span-1">${taxPrice}</span>
            </div>
            <hr />
            <div className="grid grid-cols-2">
              <span className=" col-span-1">Total : </span><span className=" col-span-1">${totalPrice}</span>
            </div>
          </div>
          <button className=" px-3 py-2 w-fit bg-black text-white font-medium rounded outline-none" type="button" disabled={cartItems.length === 0} onClick={placeOrderHandler}>Place Order</button>
          <div>
           {isLoading && <Loader></Loader>} 
          </div>
        </div>
      </div>
    </div>
  );
}
