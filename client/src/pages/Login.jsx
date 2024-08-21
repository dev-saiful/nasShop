// import { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { useLoginMutation } from "../slice/userApiSlice";
// import { setCredentials } from "../slice/authSlice";
// import Loader from "../components/Loader";
// import { IoMdEye, IoMdEyeOff } from "react-icons/io";

// export default function Login() {
//   const [signIn, setSignIn] = useState({ email: "", password: "" });
//   const [show, setShow] = useState(false);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [login, { isLoading }] = useLoginMutation();
//   const { userInfo } = useSelector((state) => state.auth);

//   // console.log(userInfo);
//   // console.log(useLoginMutation());

//   const { search } = useLocation();
//   const sp = new URLSearchParams(search);
//   const redirect = sp.get("redirect") || "/";
//   console.log(redirect);

//   useEffect(() => {
//     if (userInfo) {
//       navigate(redirect);
//     }
//   }, [userInfo, redirect, navigate]);

//   const changeHandler = (e) => {
//     //both are right
//     setSignIn((signIn) => {
//       return { ...signIn, [e.target.name]: e.target.value };
//     });
//     // setSignIn({...signIn, [e.target.name]: e.target.value})
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await login(signIn).unwrap();
//       dispatch(setCredentials({ ...res }));
//       // console.log(res.message);
//       toast.success(res?.message);
//       navigate(redirect);
//     } catch (error) {
//       toast.error(error?.data?.message || error.error);
//     }
//     setSignIn({ email: "", password: "" });
//   };

//   const showHandler = () => {
//     setShow((show) => !show);
//   };

//   return (
//     <div className="min-h-[88vh] w-full flex items-center justify-center relative">
//       {isLoading ? (
//         <Loader className="absolute z-10"></Loader>
//       ) : (
//         <div className=" w-full mx-6 sm:w-[32rem] flex flex-col gap-5">
//           <p className=" text-3xl font-semibold">Sign In</p>

//           <form
//             action=""
//             onSubmit={submitHandler}
//             className="border shadow-sm  flex flex-col items-start p-6 gap-3 rounded-md"
//           >
//             <div className="flex flex-col w-full font-medium gap-1">
//               <label htmlFor="email">Email Address</label>
//               <input
//                 className="border rounded outline-none px-3 py-2"
//                 type="email"
//                 name="email"
//                 value={signIn.email}
//                 id="email"
//                 onChange={changeHandler}
//                 placeholder="Enter email"
//                 required
//               />
//             </div>

//             <div className="flex flex-col w-full font-medium gap-1 relative">
//               <label htmlFor="password">Password</label>
//               <input
//                 className="border rounded outline-none px-3 py-2"
//                 type={show ? "text" : "password"}
//                 name="password"
//                 value={signIn.password}
//                 id="password"
//                 onChange={changeHandler}
//                 placeholder="Enter password"
//                 required
//               />
//               {!show ? (
//                 <IoMdEye
//                   onClick={showHandler}
//                   className=" text-2xl absolute right-2 bottom-2 cursor-pointer"
//                 ></IoMdEye>
//               ) : (
//                 <IoMdEyeOff
//                   onClick={showHandler}
//                   className=" text-2xl absolute right-2 bottom-2 cursor-pointer"
//                 ></IoMdEyeOff>
//               )}
//             </div>

//             <button
//               className=" px-5 py-2 bg-black text-white font-medium rounded outline-none"
//               disabled={isLoading}
//             >
//               Sign In
//             </button>

//             <p>
//               Don't have any account?{" "}
//               <Link
//                 to={redirect ? `/signup?redirect=${redirect}` : "/signup"}
//                 className=" font-medium underline text-blue-500"
//               >
//                 Register
//               </Link>
//             </p>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slice/userApiSlice";
import { setCredentials } from "../slice/authSlice";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

export default function Login() {
  const [signIn, setSignIn] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignIn((prevState) => ({ ...prevState, [name]: value }));
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(signIn).unwrap();
      dispatch(setCredentials(res));
      toast.success("Logged in successfully!");
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || "An error occurred during login.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={signIn.email}
              onChange={handleChange}
              className="mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col relative">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={signIn.password}
              onChange={handleChange}
              className="mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-3 top-9 text-xl text-gray-600 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center px-4 py-2 bg-gray-800 text-white font-medium rounded-md hover:bg-teal-700 transition duration-300 disabled:bg-teal-400"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to={redirect ? `/signup?redirect=${redirect}` : "/signup"}
              className="text-teal-600 hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
