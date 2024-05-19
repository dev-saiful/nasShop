import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../slice/cartSlice";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

export default function Shipping() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [shipAddress, setShipAddress] = useState({
    address:
      (`${shippingAddress?.address}` !== "undefined" &&
        `${shippingAddress?.address}`) ||
      "",
    city:
      (`${shippingAddress?.city}` !== "undefined" &&
        `${shippingAddress?.city}`) ||
      "",
    postalCode:
      (`${shippingAddress?.postalCode}` !== "undefined" &&
        `${shippingAddress?.postalCode}`) ||
      "",
    country:
      (`${shippingAddress?.country}` !== "undefined" &&
        `${shippingAddress?.country}`) ||
      "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setShipAddress((shipAddress) => {
      return { ...shipAddress, [e.target.name]: e.target.value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(shipAddress));
    navigate("/payment");
  };
  return (
    <div className="min-h-[88vh] flex-col gap-6 w-full flex items-center justify-center">
      <CheckoutSteps step1 step2 ></CheckoutSteps>
      <form
        action=""
        onSubmit={submitHandler}
        className="border w-full  sm:w-[500px] mx-3 shadow-sm  flex flex-col items-start p-6 gap-3 rounded-md"
      >
        <div className=" flex flex-col w-full font-medium gap-1">
          <label htmlFor="address">Address</label>
          <input
            className="border rounded outline-none px-3 py-2"
            type="text"
            name="address"
            value={shipAddress.address}
            id="address"
            onChange={changeHandler}
            placeholder="Enter address"
            required
          />
        </div>
        <div className="flex flex-col w-full font-medium gap-1">
          <label htmlFor="city">City</label>
          <input
            className="border rounded outline-none px-3 py-2"
            type="text"
            name="city"
            value={shipAddress.city}
            id="city"
            onChange={changeHandler}
            placeholder="Enter city"
            required
          />
        </div>
        <div className="flex flex-col w-full font-medium gap-1">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            className="border rounded outline-none px-3 py-2"
            type="text"
            name="postalCode"
            value={shipAddress.postalCode}
            id="postalCode"
            onChange={changeHandler}
            placeholder="Enter postal code"
            required
          />
        </div>
        <div className="flex flex-col w-full font-medium gap-1">
          <label htmlFor="country">Country</label>
          <input
            className="border rounded outline-none px-3 py-2"
            type="country"
            name="country"
            value={shipAddress.country}
            id="country"
            onChange={changeHandler}
            placeholder="Enter county"
            required
          />
        </div>

        <button className=" px-5 py-2 bg-black text-white font-medium rounded outline-none">
          Continue
        </button>
      </form>
    </div>
  );
}
