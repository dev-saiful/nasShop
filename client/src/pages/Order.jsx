// import { Link, useParams } from "react-router-dom";
// import Loader from "../components/Loader";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import {
//   useGetOrderDetailsQuery,
//   useGetPayPalClientIdQuery,
//   usePayOrderMutation,
// } from "../slice/orderApiSlice";
// import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

// export default function Order() {
//   const { id } = useParams();
//   const [toPrice, setToPrice] = useState(0);

//   console.log(useGetOrderDetailsQuery(id));

//   const {
//     data,
//     isLoading: load,
//     isError,
//     refetch,
//     originalArgs,
//   } = useGetOrderDetailsQuery(id);

//   useEffect(() => {
//     !load && setToPrice(Number(data.data.totalPrice));
//   }, [toPrice, load, data]);
//   // console.log(toPrice);
//   // console.log(data);

//   // const { userInfo } = useSelector((state) => state.auth);

//   const [payOrder, { isLoading }] = usePayOrderMutation();

//   // console.log(usePayPalScriptReducer());

//   const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

//   const {
//     data: paypal,
//     isLoading: paypalLoading,
//     isError: paypalError,
//   } = useGetPayPalClientIdQuery();

//   // console.log(paypal, paypalLoading, paypalError);

//   // const testPay = async () => {
//   //   await payOrder({id, details: { payer: { } }})
//   //   refetch()
//   //   toast.success('Payment Success!')
//   // }

//   const onApprove = (data, actions) => {
//     return actions.order.capture().then(async function (details) {
//       try {
//         await payOrder({ id, details });
//         refetch();
//         toast.success("Payment Success");
//       } catch (error) {
//         console.log(error, "hell");
//         toast.error(error?.data.message || error?.message);
//       }
//     });
//   };

//   // console.log(data.data.totalPrice);

//   const createOrder = (data, actions) => {
//     return actions.order.create({
//       purchase_units: [
//         {
//           amount: {
//             value: toPrice,
//           },
//         },
//       ],
//     });
//   };

//   const onError = (error) => {
//     // console.log(error, "hea");
//     toast.error(error?.message);
//   };

//   useEffect(() => {
//     if (!paypalError && !paypalLoading && paypal.clientId) {
//       const loadPaypalScript = async () => {
//         paypalDispatch({
//           type: "resetOptions",
//           value: {
//             "client-id": paypal.clientId,
//             currency: "USD",
//             intent: "capture",
//           },
//         });
//         // console.log('pay');
//         paypalDispatch({ type: "setLoadingStatus", value: "pending" });
//       };
//       if (!load && data.data.orderItems && !data.data.isPaid) {
//         if (!window.paypal) {
//           // console.log(data.data.orderItems , !data.data.isPaid, 'hello');
//           loadPaypalScript();
//         }
//       }
//     }
//   }, [data, paypal, paypalDispatch, paypalLoading, paypalError, load]);

//   return (
//     <div>
//       {load ? (
//         <Loader></Loader>
//       ) : isError ? (
//         <p>{isError}</p>
//       ) : (
//         <div className=" grid sm:grid-cols-12">
//           <div className=" sm:col-span-8">
//             <p>Order {originalArgs}</p>
//             <div>
//               <h3>Shipping</h3>
//               <p>
//                 <span>Name: </span> <span>{data.data.user.name}</span>
//               </p>
//               <p>
//                 <span>Email: </span> <span>{data.data.user.email}</span>
//               </p>
//               <p>
//                 <span>Address: </span>
//                 {`${data.data.shippingAddress.address}, ${data.data.shippingAddress.city} ${data.data.shippingAddress.postalCode}, ${data.data.shippingAddress.country}`}
//               </p>
//               {data.data.isDelivered ? (
//                 <div className=" bg-green-200 px-4 py-2 rounded font-medium text-green-800">
//                   Delivered
//                 </div>
//               ) : (
//                 <div className=" bg-red-200 px-4 py-2 rounded font-medium text-red-500">
//                   Not Delivered
//                 </div>
//               )}
//             </div>
//             <hr />
//             <div>
//               <h3>Payment Method</h3>
//               <p>
//                 <span>Method: </span>
//                 {data.data.paymentMethod}
//               </p>
//               {data.data.isPaid ? (
//                 <div className=" bg-green-200 px-4 py-2 rounded font-medium text-green-800">
//                   Paid
//                 </div>
//               ) : (
//                 <div className=" bg-red-200 px-4 py-2 rounded font-medium text-red-500">
//                   Not Paid
//                 </div>
//               )}
//             </div>
//             <hr />
//             <div>
//               <h3>Order Item</h3>
//               <div>
//                 {data.data.orderItems.map((item, idx) => (
//                   <div key={idx}>
//                     <div className=" grid grid-cols-7 gap-4">
//                       <img src={item.image} alt="" className=" col-span-1" />
//                       <p className=" col-span-4">
//                         <Link to={`/product/${item.product}`}>{item.name}</Link>
//                       </p>
//                       <p className=" col-span-2">
//                         {item.qty} x ${item.price} = ${item.qty * item.price}
//                       </p>
//                     </div>
//                     {data.data.orderItems.length > idx + 1 && (
//                       <hr className=" my-3"></hr>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className=" grid h-min gap-4 sm:col-span-4">
//             <h3>Order Summary</h3>
//             <div>
//               <div className="grid grid-cols-2">
//                 <span className=" col-span-1">Item : </span>
//                 <span className=" col-span-1">${data.data.itemsPrice}</span>
//               </div>
//               <hr />
//               <div className="grid grid-cols-2">
//                 <span className=" col-span-1">Shipping : </span>
//                 <span className=" col-span-1">${data.data.shippingPrice}</span>
//               </div>
//               <hr />
//               <div className="grid grid-cols-2">
//                 <span className=" col-span-1">Tax : </span>
//                 <span className=" col-span-1">${data.data.taxPrice}</span>
//               </div>
//               <hr />
//               <div className="grid grid-cols-2">
//                 <span className=" col-span-1">Total : </span>
//                 <span className=" col-span-1">${data.data.totalPrice}</span>
//               </div>
//             </div>
//             <div>
//               {!data.data.isPaid && (
//                 <div>
//                   {isLoading && <Loader></Loader>}
//                   {isPending ? (
//                     <Loader></Loader>
//                   ) : (
//                     <div>
//                       <PayPalButtons
//                         className=" w-48 z-0 relative"
//                         createOrder={createOrder}
//                         onApprove={onApprove}
//                         onError={onError}
//                       ></PayPalButtons>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




// {
//   /* <div> <button onClick={testPay}>Test Pay Order</button> </div> */
// }


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

  const { data, isLoading, isError, refetch } = useGetOrderDetailsQuery(id);

  useEffect(() => {
    if (data && !isLoading) {
      setToPrice(Number(data.data.totalPrice));
    }
  }, [data, isLoading]);

  const [payOrder, { isLoading: payLoading }] = usePayOrderMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { data: paypal, isLoading: paypalLoading, isError: paypalError } =
    useGetPayPalClientIdQuery();

  useEffect(() => {
    if (paypal && paypal.clientId && !paypalLoading && !paypalError) {
      const loadPaypalScript = () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
            intent: "capture",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (!isLoading && data?.data?.orderItems && !data.data.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [data, paypal, paypalDispatch, paypalLoading, paypalError, isLoading]);

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ id, details }).unwrap();
        refetch();
        toast.success("Payment Success");
      } catch (error) {
        toast.error(error?.data?.message || error?.message);
      }
    });
  };

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
    toast.error(error?.message);
  };

  return (
    <div className="container mx-auto p-4">
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <p className="text-red-500">{isError}</p>
      ) : (
        <div className="grid sm:grid-cols-12 gap-6">
          <div className="sm:col-span-8">
            <h2 className="text-xl font-semibold mb-4">Order {id}</h2>
            <div className="mb-6 p-4 border rounded-md">
              <h3 className="text-lg font-semibold mb-2">Shipping</h3>
              <p><strong>Name:</strong> {data.data.user.name}</p>
              <p><strong>Email:</strong> {data.data.user.email}</p>
              <p><strong>Address:</strong> {`${data.data.shippingAddress.address}, ${data.data.shippingAddress.city} ${data.data.shippingAddress.postalCode}, ${data.data.shippingAddress.country}`}</p>
              {data.data.isDelivered ? (
                <div className="mt-4 p-2 bg-green-200 text-green-800 rounded-md">
                  Delivered
                </div>
              ) : (
                <div className="mt-4 p-2 bg-red-200 text-red-800 rounded-md">
                  Not Delivered
                </div>
              )}
            </div>

            <div className="mb-6 p-4 border rounded-md">
              <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
              <p><strong>Method:</strong> {data.data.paymentMethod}</p>
              {data.data.isPaid ? (
                <div className="mt-4 p-2 bg-green-200 text-green-800 rounded-md">
                  Paid
                </div>
              ) : (
                <div className="mt-4 p-2 bg-red-200 text-red-800 rounded-md">
                  Not Paid
                </div>
              )}
            </div>

            <div className="p-4 border rounded-md">
              <h3 className="text-lg font-semibold mb-2">Order Items</h3>
              {data.data.orderItems.map((item, idx) => (
                <div key={idx} className="mb-4 last:mb-0">
                  <div className="grid grid-cols-7 gap-4 items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="col-span-1 rounded-md"
                    />
                    <p className="col-span-4">
                      <Link
                        to={`/product/${item.product}`}
                        className="text-blue-600 hover:underline"
                      >
                        {item.name}
                      </Link>
                    </p>
                    <p className="col-span-2 font-medium">
                      {item.qty} x ${item.price} = ${item.qty * item.price}
                    </p>
                  </div>
                  {data.data.orderItems.length > idx + 1 && (
                    <hr className="my-3" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="sm:col-span-4">
            <div className="p-4 border rounded-md">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="mb-4">
                <div className="flex justify-between">
                  <span>Items:</span>
                  <span>${data.data.itemsPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>${data.data.shippingPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${data.data.taxPrice}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${data.data.totalPrice}</span>
                </div>
              </div>
              {!data.data.isPaid && (
                <div>
                  {isLoading && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                      className="w-full"
                    />
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
