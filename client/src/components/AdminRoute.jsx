import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

export default function AdminRoute() {
    const {userInfo} = useSelector(state => state.auth)
    // console.log(userInfo.data.userFound.role);

  return (
    userInfo && userInfo.data.userFound.role === "Admin" ? <Outlet></Outlet> : <Navigate to='/login' replace></Navigate>
  )
}
