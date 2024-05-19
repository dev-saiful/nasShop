import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useGetOrderDetailsQuery,
  useGetPayPalClientIdQuery,
  usePayOrderMutation,
} from "../slice/orderApiSlice";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

export default function Order() {
  const { id } = useParams();
  const [toPrice, setToPrice] = useState(0);

  console.log(useGetOrderDetailsQuery(id));

  const {
    data,
    isLoading: load,
    isError,
    refetch,
    originalArgs,
  } = useGetOrderDetailsQuery(id);

  useEffect(() => {
    !load && setToPrice(Number(data.data.totalPrice));
  }, [toPrice, load, data]);
  // console.log(toPrice);
  // console.log(data);

  // const { userInfo } = useSelector((state) => state.auth);

  const [payOrder, { isLoading }] = usePayOrderMutation();

  // console.log(usePayPalScriptReducer());

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: paypalLoading,
    isError: paypalError,
  } = useGetPayPalClientIdQuery();

  // console.log(paypal, paypalLoading, paypalError);

  // const testPay = async () => {
  //   await payOrder({id, details: { payer: { } }})
  //   refetch()
  //   toast.success('Payment Success!')
  // }

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ id, details });
        refetch();
        toast.success("Payment Success");
      } catch (error) {
        console.log(error, "hell");
        toast.error(error?.data.message || error?.message);
      }
    });
  };

  // console.log(data.data.totalPrice);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: toPrice,
          },
        },
      ],
    });
  };

  const onError = (error) => {
    // console.log(error, "hea");
    toast.error(error?.message);
  };

  useEffect(() => {
    if (!paypalError && !paypalLoading && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
            intent: "capture",
          },
        });
        // console.log('pay');
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (!load && data.data.orderItems && !data.data.isPaid) {
        if (!window.paypal) {
          // console.log(data.data.orderItems , !data.data.isPaid, 'hello');
          loadPaypalScript();
        }
      }
    }
  }, [data, paypal, paypalDispatch, paypalLoading, paypalError, load]);

  return (
    <div>
      {load ? (
        <Loader></Loader>
      ) : isError ? (
        <p>{isError}</p>
      ) : (
        <div className=" grid sm:grid-cols-12">
          <div className=" sm:col-span-8">
            <p>Order {originalArgs}</p>
            <div>
              <h3>Shipping</h3>
              <p>
                <span>Name: </span> <span>{data.data.user.name}</span>
              </p>
              <p>
                <span>Email: </span> <span>{data.data.user.email}</span>
              </p>
              <p>
                <span>Address: </span>
                {`${data.data.shippingAddress.address}, ${data.data.shippingAddress.city} ${data.data.shippingAddress.postalCode}, ${data.data.shippingAddress.country}`}
              </p>
              {data.data.isDelivered ? (
                <div className=" bg-green-200 px-4 py-2 rounded font-medium text-green-800">
                  Delivered
                </div>
              ) : (
                <div className=" bg-red-200 px-4 py-2 rounded font-medium text-red-500">
                  Not Delivered
                </div>
              )}
            </div>
            <hr />
            <div>
              <h3>Payment Method</h3>
              <p>
                <span>Method: </span>
                {data.data.paymentMethod}
              </p>
              {data.data.isPaid ? (
                <div className=" bg-green-200 px-4 py-2 rounded font-medium text-green-800">
                  Paid
                </div>
              ) : (
                <div className=" bg-red-200 px-4 py-2 rounded font-medium text-red-500">
                  Not Paid
                </div>
              )}
            </div>
            <hr />
            <div>
              <h3>Order Item</h3>
              <div>
                {data.data.orderItems.map((item, idx) => (
                  <div key={idx}>
                    <div className=" grid grid-cols-7 gap-4">
                      <img src={item.image} alt="" className=" col-span-1" />
                      <p className=" col-span-4">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </p>
                      <p className=" col-span-2">
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </p>
                    </div>
                    {data.data.orderItems.length > idx + 1 && (
                      <hr className=" my-3"></hr>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className=" grid h-min gap-4 sm:col-span-4">
            <h3>Order Summary</h3>
            <div>
              <div className="grid grid-cols-2">
                <span className=" col-span-1">Item : </span>
                <span className=" col-span-1">${data.data.itemsPrice}</span>
              </div>
              <hr />
              <div className="grid grid-cols-2">
                <span className=" col-span-1">Shipping : </span>
                <span className=" col-span-1">${data.data.shippingPrice}</span>
              </div>
              <hr />
              <div className="grid grid-cols-2">
                <span className=" col-span-1">Tax : </span>
                <span className=" col-span-1">${data.data.taxPrice}</span>
              </div>
              <hr />
              <div className="grid grid-cols-2">
                <span className=" col-span-1">Total : </span>
                <span className=" col-span-1">${data.data.totalPrice}</span>
              </div>
            </div>
            <div>
              {!data.data.isPaid && (
                <div>
                  {isLoading && <Loader></Loader>}
                  {isPending ? (
                    <Loader></Loader>
                  ) : (
                    <div>
                      <PayPalButtons
                        className=" w-48 z-0 relative"
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      ></PayPalButtons>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}




{
  /* <div> <button onClick={testPay}>Test Pay Order</button> </div> */
}
