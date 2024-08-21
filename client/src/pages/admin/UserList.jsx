import { useEffect } from "react";
import { useAdminQuery } from "../../slice/userApiSlice";

export default function UserList() {
    // const [userList] = useAdminQuery()
    // const [customer] = useCustomerQuery()
    
    console.log(useAdminQuery());
    useEffect(()=>{
        // const res = userList().unwrap()
        // const rest = customer().unwrap()
        // console.log(rest);
        // console.log(res);
    },[])

  return (
    <div>UserList</div>
  )
}
