// // import { useCustomerMutation } from "../slice/userApiSlice";
// import { useOrdersQuery } from "../slice/orderApiSlice";
// import { useSelector } from "react-redux";
// import Loader from "../components/Loader";
// import { Link } from "react-router-dom";

// export default function Profile() {
//   const { userInfo } = useSelector((state) => state.auth);
//   // console.log(userInfo);
//   // console.log(useOrdersQuery(userInfo.data.userFound._id));
//   // console.log(useCustomerMutation(userInfo.data.userFound._id));
//   const { isLoading, isError, data } = useOrdersQuery(
//     userInfo.data.userFound._id
//   );
//   console.log(data);
  
//   return (
//     <div>
//       {isLoading ? (
//         <Loader></Loader>
//       ) : isError ? (
//         <p>{isError}</p>
//       ) : (
//         <div>
//           {data.data.map((item, idx) => (
//             <div key={idx} className=" flex gap-2">
//               <p>{item._id}</p>
//               <p>{item.createdAt.substring(0, 10)}</p>
//               <p>${item.totalPrice}</p>
//               <p>
//                 {item.isPaid ? (
//                   <p>{item.paidAt.substring(0, 10)}</p>
//                 ) : (
//                   <p>Not Paid</p>
//                 )}
//               </p>
//               <p>
//                 {item.isDelivered ? (
//                   <p>{item.updatedAt.substring(0, 10)}</p>
//                 ) : (
//                   <p>Not Delivered</p>
//                 )}
//               </p>
//               <Link to={`/order/${item._id}`}>Details</Link>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }






import { useOrdersQuery } from "../slice/orderApiSlice";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

export default function Profile() {
  const { userInfo } = useSelector((state) => state.auth);
  const { isLoading, isError, data } = useOrdersQuery(userInfo.data.userFound._id);

  return (
    <div className="p-4">
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <p className="text-red-500">Error: {isError.message}</p>
      ) : (
        <div>
          <div className="hidden sm:grid grid-cols-6 gap-4 mb-4 font-medium text-gray-600">
            <p>Order ID</p>
            <p>Date</p>
            <p>Total Price</p>
            <p>Paid</p>
            <p>Delivered</p>
            <p>Actions</p>
          </div>

          {data.data.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-1 sm:grid-cols-6 gap-4 mb-4 p-4 border border-gray-300 rounded-lg shadow-sm"
            >
              <p
                className="truncate text-sm sm:text-base"
                style={{
                  minWidth: '0',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {item._id}
              </p>
              <p
                className="truncate text-sm sm:text-base"
                style={{
                  minWidth: '0',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {item.createdAt.substring(0, 10)}
              </p>
              <p
                className="truncate text-sm sm:text-base"
                style={{
                  minWidth: '0',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                ${item.totalPrice}
              </p>
              <p
                className="truncate text-sm sm:text-base"
                style={{
                  minWidth: '0',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {item.isPaid ? item.paidAt.substring(0, 10) : 'Not Paid'}
              </p>
              <p
                className="truncate text-sm sm:text-base"
                style={{
                  minWidth: '0',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {item.isDelivered ? item.updatedAt.substring(0, 10) : 'Not Delivered'}
              </p>
              <Link
                to={`/order/${item._id}`}
                className="text-blue-500 hover:underline"
              >
                Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
