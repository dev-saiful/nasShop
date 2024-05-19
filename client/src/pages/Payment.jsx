import { useEffect, useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../slice/cartSlice";


export default function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const cart = useSelector(state => state.cart)
  const {shippingAddress} = cart
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(()=>{
    if (!shippingAddress) {
      navigate('/shipping')
    }
  },[shippingAddress, navigate])

  const paymentHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }
  return (
    <div className="min-h-[88vh] flex-col gap-6 w-full flex items-center justify-center">
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form action="" onSubmit={paymentHandler} className=" sm:w-[500px] w-full flex flex-col gap-3">
        <p className=" font-semibold text-2xl">Select Method</p>
        <div>
          <input
            type="radio"
            name="paymentMethod"
            value={paymentMethod}
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
            id="paymentMethod"
          />
          <label htmlFor="paymentMethod">PayPal or Card</label>
        </div>
        <button className=" px-5 w-fit py-2 bg-black text-white font-medium rounded outline-none">Continue</button>
      </form>
    </div>
  );
}
