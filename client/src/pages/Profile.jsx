import { useCustomerMutation } from "../slice/userApiSlice";
import { useOrdersQuery } from "../slice/orderApiSlice";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

export default function Profile() {
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);
  console.log(useOrdersQuery(userInfo.data.userFound._id));
  console.log(useCustomerMutation(userInfo.data.userFound._id));
  const { isLoading, isError, data } = useOrdersQuery(
    userInfo.data.userFound._id
  );
  return (
    <div>
      {isLoading ? (
        <Loader></Loader>
      ) : isError ? (
        <p>{isError}</p>
      ) : (
        <div>
          {data.data.map((item, idx) => (
            <div key={idx} className=" flex gap-2">
              <p>{item._id}</p>
              <p>{item.createdAt.substring(0, 10)}</p>
              <p>${item.totalPrice}</p>
              <p>
                {item.isPaid ? (
                  <p>{item.paidAt.substring(0, 10)}</p>
                ) : (
                  <p>Not Paid</p>
                )}
              </p>
              <p>
                {item.isDelivered ? (
                  <p>{item.isDeliveredAt.substring(0, 10)}</p>
                ) : (
                  <p>Not Delivered</p>
                )}
              </p>
              <Link to={`/order/${item._id}`}>Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
