import { useState, useRef, useEffect } from "react";
// import nas from '../assets/oebicLog.png'
import Search from "./Search";
import { FaCartShopping } from "react-icons/fa6";
import { MdAccountCircle } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slice/authSlice";
import { useLogoutMutation } from "../slice/userApiSlice";
import toast from "react-hot-toast";

export default function Header() {
  // const [isLoggedIn, setIsLoggedIn] = useState(true)
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [account, setAccount] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);

  const open = useRef();

  useEffect(() => {
    let outsideHandler = (e) => {
      if (account && open.current && !open.current.contains(e.target)) {
        setAccount(false);
      }
    };

    document.addEventListener("click", outsideHandler);

    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener("click", outsideHandler);
    };
  }, [account]);

  const accountHandler = () => {
    setAccount(!account);
  };

  const [logoutApiCall] = useLogoutMutation();

  const clickHandler = async () => {
    try {
      const res = await logoutApiCall().unwrap();
      console.log(res);
      dispatch(logout());
      toast.success(res.message);
      navigate("/login");
      setAccount(!account);
    } catch (error) {
      toast.error(error.data.message);
      console.log(error);
    }
  };

  return (
    <header className="bg-[#f6f6ec] max-w-full z-50 min-h-[10vh] flex items-center justify-between sticky top-0 px-2 py-4 sm:px-14">
      <Link to="/">
        {/* <img src={nas} alt="NasStoreLogo" className="nasLogo" /> */}
        <h1 className=" text-3xl font-semibold">NasStore</h1>
      </Link>
      <Search></Search>
      <div className="max-w-fit flex gap-4 sm:gap-6">
        <Link to="/cart" className="flex relative items-center justify-center">
          <FaCartShopping className=" h-7 w-7 sm:h-9 text-[#393f47] sm:w-9"></FaCartShopping>
          {cartItems.length > 0 && (
            <span className=" absolute top-[-0.5rem] right-[-0.5rem] w-5 h-5 flex items-center justify-center animate-bounce rounded-full p-1 font-semibold  bg-[green] text-white sm:w-7 sm:h-7">
              {cartItems.reduce((acc, tot) => acc + tot.qty, 0)}
            </span>
          )}
        </Link>
        {userInfo ? (
          <div>
            {userInfo.data.userFound.role === "Admin" ? (
              <div
                ref={open}
                className="max-w-fit relative flex gap-2 items-center"
              >
                <MdAccountCircle
                  onClick={accountHandler}
                  className="h-7 w-7 text-[#393f47] cursor-pointer flex items-center justify-center sm:h-9 sm:w-9"
                ></MdAccountCircle>
                {account && (
                  <div className=" absolute bg-[#393f47] right-0 top-10 w-max px-6 py-4 rounded-lg text-cyan-50 flex flex-col gap-4 sm:top-12">
                    <h3>
                      {userInfo.data.userFound.name.toUpperCase() ||
                        userInfo.data.name.toUpperCase()} [Admin]
                    </h3>
                    <Link to='/admin/orderlist'>Order List</Link>
                    <Link to='/admin/products'>Product List</Link>
                    <h3 className=" cursor-pointer" onClick={clickHandler}>
                      Log Out
                    </h3>
                  </div>
                )}
              </div>
            ) : (
              <div
                ref={open}
                className="max-w-fit relative flex gap-2 items-center"
              >
                <MdAccountCircle
                  onClick={accountHandler}
                  className="h-7 w-7 text-[#393f47] cursor-pointer flex items-center justify-center sm:h-9 sm:w-9"
                ></MdAccountCircle>
                {account && (
                  <div className=" absolute bg-[#393f47] right-0 top-10 w-max px-6 py-4 rounded-lg text-cyan-50 flex flex-col gap-4 sm:top-12">
                    <h3>
                      {userInfo.data.userFound.name.toUpperCase() ||
                        userInfo.data.name.toUpperCase()}
                    </h3>
                    <Link to="/profile">Profile</Link>
                    <h3>Product</h3>
                    <h3>Settings</h3>
                    <h3 className=" cursor-pointer" onClick={clickHandler}>
                      Log Out
                    </h3>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-fit flex gap-1 sm:gap-4">
            <Link
              to="/login"
              className=" px-2 py-1 flex items-center justify-between bg-[#393f47] text-cyan-50 text-xs rounded sm:px-4 sm:py-2 sm:text-base sm:font-semibold"
            >
              LOGIN
            </Link>
            <Link
              to="/signup"
              className=" px-2 py-1 flex items-center justify-between bg-[#393f47] text-cyan-50 text-xs rounded sm:px-4 sm:py-2 sm:text-base sm:font-semibold"
            >
              SIGNUP
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
