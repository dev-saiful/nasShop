// import {
//   useAdminOrdersListQuery,
//   useDeliverOrderMutation,
// } from "../../slice/orderApiSlice";
// import Loader from "../../components/Loader";
// import toast from "react-hot-toast";

// export default function AdminOrderList() {
//   const { data, isLoading, isError, refetch } = useAdminOrdersListQuery();
//   // console.log(useDeliverOrderMutation());
//   const [deliverOrder] = useDeliverOrderMutation();
//   const deliverPercel = async (id) => {
//     try {
//       await deliverOrder(id);
//       refetch();
//       toast.success("Delivered");
//     } catch (error) {
//       toast.error(error);
//     }
//   };
//   console.log(useAdminOrdersListQuery());
//   return (
//     <div>
//       {isLoading ? (
//         <Loader></Loader>
//       ) : isError ? (
//         <p>{isError}</p>
//       ) : (
//         <div className=" flex justify-center w-full my-8">
//           <table className=" w-fit border-collapse border border-slate-400">
//             <thead>
//               <tr className=" text-center bg-[#04AA6D] text-white">
//                 <th className=" px-4 py-2 border border-slate-300">Index</th>
//                 <th className=" px-4 py-2 border border-slate-300">Id</th>
//                 <th className=" px-4 py-2 border border-slate-300">Name</th>
//                 <th className=" px-4 py-2 border border-slate-300">Ordered</th>
//                 <th className=" px-4 py-2 border border-slate-300">Price</th>
//                 <th className=" px-4 py-2 border border-slate-300">Paid</th>
//                 <th className=" px-4 py-2 border border-slate-300">
//                   Delivered
//                 </th>
//                 <th className=" px-4 py-2 border border-slate-300">Approved</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.data.map((item, idx) => (
//                 <tr
//                   key={item._id}
//                   className="bg-white odd:bg-gray-100 hover:bg-[#ddd] text-center"
//                 >
//                   <td className=" px-4 py-2 border border-slate-300">
//                     {idx + 1}
//                   </td>
//                   <td className=" px-4 py-2 border border-slate-300">
//                     {item._id}
//                   </td>
//                   <td className=" px-4 py-2 border border-slate-300">
//                     {item.user.name}
//                   </td>
//                   <td className=" px-4 py-2 border border-slate-300">
//                     {item.createdAt.substring(0, 10)}
//                   </td>
//                   <td className=" px-4 py-2 border border-slate-300">
//                     ${item.totalPrice}
//                   </td>
//                   <td className=" px-4 py-2 border border-slate-300">
//                     {" "}
//                     {item.isPaid ? (
//                       <span>{item.paidAt.substring(0, 10)}</span>
//                     ) : (
//                       <span>Not Paid</span>
//                     )}
//                   </td>
//                   <td className=" px-4 py-2 border border-slate-300">
//                     {" "}
//                     {item.isDelivered ? (
//                       <span>{item.deliveredAt.substring(0, 10)}</span>
//                     ) : (
//                       <span>Not Paid</span>
//                     )}
//                   </td>
//                   <td className=" px-4 py-2 border border-slate-300 cursor-pointer text-xl">
//                     <button
//                       disabled={item.isDelivered}
//                       onClick={() => deliverPercel(item._id)}
//                     >
//                       Deliver Percel
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// Details button will not work, because it has no route in OrderRoute (backend)
{
  /* <Link to={`/order/${item._id}`}>Details</Link> */
}

import {
  useAdminOrdersListQuery,
  useDeliverOrderMutation,
} from "../../slice/orderApiSlice";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";

export default function AdminOrderList() {
  const { data, isLoading, isError, refetch } = useAdminOrdersListQuery();
  const [deliverOrder] = useDeliverOrderMutation();

  const deliverPercel = async (id) => {
    try {
      await deliverOrder(id);
      refetch();
      toast.success("Order marked as delivered");
    } catch (error) {
      toast.error("Failed to deliver order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <p className="text-red-600 text-center">An error occurred. Please try again later.</p>
      ) : (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-teal-600 text-white text-sm uppercase">
              <tr>
                <th className="px-6 py-4 border-b">Index</th>
                <th className="px-6 py-4 border-b">Order ID</th>
                <th className="px-6 py-4 border-b">Customer Name</th>
                <th className="px-6 py-4 border-b">Date Ordered</th>
                <th className="px-6 py-4 border-b">Total Price</th>
                <th className="px-6 py-4 border-b">Payment Status</th>
                <th className="px-6 py-4 border-b">Delivery Status</th>
                <th className="px-6 py-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {data.data.map((item, idx) => (
                <tr
                  key={item._id}
                  className="odd:bg-gray-100 even:bg-white hover:bg-gray-200 text-center"
                >
                  <td className="px-6 py-4 border-b">{idx + 1}</td>
                  <td className="px-6 py-4 border-b">{item._id}</td>
                  <td className="px-6 py-4 border-b">{item.user.name}</td>
                  <td className="px-6 py-4 border-b">
                    {item.createdAt.substring(0, 10)}
                  </td>
                  <td className="px-6 py-4 border-b">${item.totalPrice}</td>
                  <td className="px-6 py-4 border-b">
                    {item.isPaid ? (
                      <span className="text-green-600 font-semibold">
                        {item.paidAt.substring(0, 10)}
                      </span>
                    ) : (
                      <span className="text-red-600 font-semibold">Not Paid</span>
                    )}
                  </td>
                  <td className="px-6 py-4 border-b">
                    {item.isDelivered ? (
                      <span className="text-green-600 font-semibold">
                        {item.deliveredAt.substring(0, 10)}
                      </span>
                    ) : (
                      <span className="text-red-600 font-semibold">Not Delivered</span>
                    )}
                  </td>
                  <td className="px-6 py-4 border-b">
                    <button
                      disabled={item.isDelivered}
                      onClick={() => deliverPercel(item._id)}
                      className={`${
                        item.isDelivered
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-teal-600 hover:bg-teal-700"
                      } text-white px-4 py-2 rounded-lg text-sm`}
                    >
                      {item.isDelivered ? "Delivered" : "Deliver Order"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
