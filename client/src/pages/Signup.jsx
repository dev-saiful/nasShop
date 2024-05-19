import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useLoginMutation, useRegisterMutation } from "../slice/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setCredentials } from "../slice/authSlice";

export default function Signup() {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [signUp, setSignUp] = useState({
    name: "",
    // lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [show, setShow] = useState(false);
  const [hide, setHide] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const [login] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  // console.log(register);

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
    setSignUp((signUp) => {
      return { ...signUp, [e.target.name]: e.target.value };
    });
    // setSignIn({...signIn, [e.target.name]: e.target.value})

    setLoginInfo((loginInfo) => {
      return { ...loginInfo, [e.target.name]: e.target.value };
    });
  };

  const showHandler = () => {
    setShow((show) => !show);
  };

  const hideHandler = () => {
    setHide((hide) => !hide);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // if the password is shown
    if (show === true) {
      setShow((show) => !show);
    }
    if (hide === true) {
      setHide((hide) => !hide);
    }
    try {
      if (signUp.password !== signUp.confirmPassword) {
        toast.error("Password not Matched");
      } else {
        // console.log(await register(signUp).unwrap());
        const res = await register(signUp).unwrap();
        // console.log(res);
        toast.success(res?.message);
        const response = await login(loginInfo).unwrap();
        // console.log(response);
        dispatch(setCredentials({ ...response }));
        toast.success(response?.message);
        navigate(redirect);
      }
    } catch (error) {
      // console.log(error);
      toast.error(error?.data?.message || error.error);
    }
    setSignUp({
      name: "",
      // lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="min-h-[88vh] w-full flex items-center justify-center">
      <div className=" w-full mx-6 sm:w-[32rem] flex flex-col gap-5">
        <p className=" text-3xl font-semibold">Sign Up</p>

        <form
          action=""
          onSubmit={submitHandler}
          className="border shadow-sm flex flex-col items-start p-6 gap-3 rounded-md"
        >
          <div className="flex w-full gap-2 sm:flex-row flex-col">
            <div className=" font-medium flex flex-col w-full  gap-1">
              <label htmlFor="name">Name</label>
              <input
                className="border rounded outline-none px-3 py-2"
                type="text"
                name="name"
                value={signUp.name}
                id="name"
                onChange={changeHandler}
                placeholder="Enter your name"
                required
              />
            </div>

            {/* <div className=" font-medium flex flex-col w-full sm:w-1/2 gap-1">
              <label htmlFor="lastName">Last Name</label>
              <input
                className="border rounded outline-none px-3 py-2"
                type="text"
                name="lastName"
                value={signUp.lastName}
                id="lastName"
                onChange={changeHandler}
                placeholder="Last Name"
                required
              />
            </div> */}
          </div>

          <div className="flex flex-col w-full font-medium gap-1">
            <label htmlFor="email">Email Address</label>
            <input
              className="border rounded outline-none px-3 py-2"
              type="email"
              name="email"
              value={signUp.email}
              id="email"
              onChange={changeHandler}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="flex w-full font-medium gap-2 sm:flex-row flex-col">
            <div className="flex flex-col w-full sm:w-1/2 font-medium gap-1 relative">
              <label htmlFor="password">Password</label>
              <input
                className="border rounded outline-none px-3 py-2"
                type={show ? "text" : "password"}
                name="password"
                value={signUp.password}
                id="password"
                onChange={changeHandler}
                placeholder="Enter password"
                required
              />
              {!show ? (
                <IoMdEye
                  onClick={showHandler}
                  className=" text-2xl absolute right-2 bottom-2 cursor-pointer z-10 bg-white"
                ></IoMdEye>
              ) : (
                <IoMdEyeOff
                  onClick={showHandler}
                  className=" text-2xl absolute right-2 bottom-2 cursor-pointer z-10 bg-white"
                ></IoMdEyeOff>
              )}
            </div>
            <div className="flex flex-col w-full sm:w-1/2 font-medium gap-1 relative">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                className="border rounded outline-none px-3 py-2"
                type={hide ? "text" : "password"}
                name="confirmPassword"
                value={signUp.confirmPassword}
                id="confirmPassword"
                onChange={changeHandler}
                placeholder="Confirm password"
                required
              />
              {!hide ? (
                <IoMdEye
                  onClick={hideHandler}
                  className=" text-2xl absolute right-2 bottom-2 cursor-pointer z-10 bg-white"
                ></IoMdEye>
              ) : (
                <IoMdEyeOff
                  onClick={hideHandler}
                  className=" text-2xl absolute right-2 bottom-2 cursor-pointer z-10 bg-white"
                ></IoMdEyeOff>
              )}
            </div>
          </div>

          <button className=" px-5 py-2 bg-black text-white font-medium rounded outline-none">
            Sign Up
          </button>

          <p>
            Already have any account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className=" font-medium underline text-blue-500"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
