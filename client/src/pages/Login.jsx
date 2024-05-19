import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slice/userApiSlice";
import { setCredentials } from "../slice/authSlice";
import Loader from "../components/Loader";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

export default function Login() {
  const [signIn, setSignIn] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  // console.log(userInfo);
  // console.log(useLoginMutation());

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";
  console.log(redirect);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const changeHandler = (e) => {
    //both are right
    setSignIn((signIn) => {
      return { ...signIn, [e.target.name]: e.target.value };
    });
    // setSignIn({...signIn, [e.target.name]: e.target.value})
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login(signIn).unwrap();
      dispatch(setCredentials({ ...res }));
      // console.log(res.message);
      toast.success(res?.message);
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
    setSignIn({ email: "", password: "" });
  };

  const showHandler = () => {
    setShow((show) => !show);
  };

  return (
    <div className="min-h-[88vh] w-full flex items-center justify-center relative">
      {isLoading ? (
        <Loader className="absolute z-10"></Loader>
      ) : (
        <div className=" w-full mx-6 sm:w-[32rem] flex flex-col gap-5">
          <p className=" text-3xl font-semibold">Sign In</p>

          <form
            action=""
            onSubmit={submitHandler}
            className="border shadow-sm  flex flex-col items-start p-6 gap-3 rounded-md"
          >
            <div className="flex flex-col w-full font-medium gap-1">
              <label htmlFor="email">Email Address</label>
              <input
                className="border rounded outline-none px-3 py-2"
                type="email"
                name="email"
                value={signIn.email}
                id="email"
                onChange={changeHandler}
                placeholder="Enter email"
                required
              />
            </div>

            <div className="flex flex-col w-full font-medium gap-1 relative">
              <label htmlFor="password">Password</label>
              <input
                className="border rounded outline-none px-3 py-2"
                type={show ? "text" : "password"}
                name="password"
                value={signIn.password}
                id="password"
                onChange={changeHandler}
                placeholder="Enter password"
                required
              />
              {!show ? (
                <IoMdEye
                  onClick={showHandler}
                  className=" text-2xl absolute right-2 bottom-2 cursor-pointer"
                ></IoMdEye>
              ) : (
                <IoMdEyeOff
                  onClick={showHandler}
                  className=" text-2xl absolute right-2 bottom-2 cursor-pointer"
                ></IoMdEyeOff>
              )}
            </div>

            <button
              className=" px-5 py-2 bg-black text-white font-medium rounded outline-none"
              disabled={isLoading}
            >
              Sign In
            </button>

            <p>
              Don't have any account?{" "}
              <Link
                to={redirect ? `/signup?redirect=${redirect}` : "/signup"}
                className=" font-medium underline text-blue-500"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      )}
    </div>
  );
}
