import {
  useAdminOrdersListQuery,
  useDeliverOrderMutation,
} from "../../slice/orderApiSlice";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";

export default function AdminOrderList() {
  const { data, isLoading, isError, refetch } = useAdminOrdersListQuery();
  // console.log(useDeliverOrderMutation());
  const [deliverOrder] = useDeliverOrderMutation();
  const deliverPercel = async (id) => {
    try {
      await deliverOrder(id);
      refetch();
      toast.success("Delivered");
    } catch (error) {
      toast.error(error);
    }
  };
  console.log(useAdminOrdersListQuery());
  return (
    <div>
      {isLoading ? (
        <Loader></Loader>
      ) : isError ? (
        <p>{isError}</p>
      ) : (
        <div className=" flex justify-center w-full my-8">
          <table className=" w-fit border-collapse border border-slate-400">
            <thead>
              <tr className=" text-center bg-[#04AA6D] text-white">
                <th className=" px-4 py-2 border border-slate-300">Index</th>
                <th className=" px-4 py-2 border border-slate-300">Id</th>
                <th className=" px-4 py-2 border border-slate-300">Name</th>
                <th className=" px-4 py-2 border border-slate-300">Ordered</th>
                <th className=" px-4 py-2 border border-slate-300">Price</th>
                <th className=" px-4 py-2 border border-slate-300">Paid</th>
                <th className=" px-4 py-2 border border-slate-300">
                  Delivered
                </th>
                <th className=" px-4 py-2 border border-slate-300">Approved</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((item, idx) => (
                <tr
                  key={item._id}
                  className="bg-white odd:bg-gray-100 hover:bg-[#ddd] text-center"
                >
                  <td className=" px-4 py-2 border border-slate-300">
                    {idx + 1}
                  </td>
                  <td className=" px-4 py-2 border border-slate-300">
                    {item._id}
                  </td>
                  <td className=" px-4 py-2 border border-slate-300">
                    {item.user.name}
                  </td>
                  <td className=" px-4 py-2 border border-slate-300">
                    {item.createdAt.substring(0, 10)}
                  </td>
                  <td className=" px-4 py-2 border border-slate-300">
                    ${item.totalPrice}
                  </td>
                  <td className=" px-4 py-2 border border-slate-300">
                    {" "}
                    {item.isPaid ? (
                      <span>{item.paidAt.substring(0, 10)}</span>
                    ) : (
                      <span>Not Paid</span>
                    )}
                  </td>
                  <td className=" px-4 py-2 border border-slate-300">
                    {" "}
                    {item.isDelivered ? (
                      <span>{item.deliveredAt.substring(0, 10)}</span>
                    ) : (
                      <span>Not Paid</span>
                    )}
                  </td>
                  <td className=" px-4 py-2 border border-slate-300 cursor-pointer text-xl">
                    <button
                      disabled={item.isDelivered}
                      onClick={() => deliverPercel(item._id)}
                    >
                      Deliver Percel
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

// Details button will not work, because it has no route in OrderRoute (backend)
{
  /* <Link to={`/order/${item._id}`}>Details</Link> */
}

