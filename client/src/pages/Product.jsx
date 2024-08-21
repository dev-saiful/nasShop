// import { useParams, useNavigate, Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import Ratting from "../components/Ratting";
// import { useGetProductsDetailsQuery, useCreateReviewMutation } from "../slice/productsApiSlice";
// import toast from "react-hot-toast";
// import Loader from "../components/Loader";
// import { useState } from "react";
// import { addToCart } from "../slice/cartSlice";
  

// export default function Product() {
//   const { productId } = useParams();
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const {userInfo} = useSelector((state) => state.auth)
//   const { data, isError, error, isLoading, refetch } = useGetProductsDetailsQuery(productId);
//   const [createReview, {isLoading: reviewLoading}] = useCreateReviewMutation()
//   console.log(data);
//   // console.log(useGetProductsDetailsQuery(productId));
//   const [qty, setQty] = useState(1)
//   const [rating, setRating] = useState(0)
//   const [comment, setComment] = useState('')
//   function onQty(e){
//     setQty(Number(e.target.value))
//   }

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       await createReview({
//         productId, rating, comment
//       }).unwrap();
//       refetch();
//       toast.success('Review Submitted')
//       setRating(0)
//       setComment('')

//     } catch (error) {
//       toast.error(error?.data?.message || error.error)
//     }
//   }

//   // console.log(addToCart({...data.data, qty}));

//   function addToCartHandler() {
//     dispatch(addToCart({...data.data, qty}))
//     // console.log(dispatch(addToCart({...data.data, qty})));
//     navigate('/cart')
//   }

//   // console.log(typeof qty);
//   // console.log(data.data);

//   return (
//     <div>
//       {isLoading ? (
//         <Loader></Loader>
//       ) : isError ? (
//         toast.error(error.error)
//       ) : (
//         <>
//         <div className="grid lg:grid-cols-9 gap-6 p-6">
//           <div className=" w-[300px] rounded-xl lg:w-full sm:col-span-2 lg:col-span-3">
//             <img
//               className="rounded-xl"
//               src={data.data.image}
//               alt="product_image"
//             />
//             {/* {console.log(data.data.image)} */}
//           </div>

//           <div className=" w-full flex flex-col gap-3 lg:col-span-4">
//             <h2 className="text-3xl font-medium">{data.data.name}</h2>
//             <hr />
//             <Ratting
//               stars={data.data.rating}
//               reviews={data.data.numReviews}
//             ></Ratting>
//             <hr />
//             <p className=" text-lg font-medium">Price: ${data.data.price}</p>
//             <hr />
//             <p>Description: {data.data.description}</p>
//           </div>

//           <div className=" w-full h-fit flex flex-col gap-3 border rounded-lg px-9 py-4 shadow-md lg:col-span-2">
//             <p className=" text-xl font-medium">Price: ${data.data.price}</p>
//             <hr />
//             <p
//               className={`${
//                 data.data.countInStock > 0 ? "text-green-900" : " text-red-900"
//               }`}
//             >
//               Status: {data.data.countInStock > 0 ? "In Stock" : "Out of Stock"}
//             </p>
//             <hr />
//             {
//               data.data.countInStock > 0 && <div>
//                 <label htmlFor="qty">Quantity:  </label>
//                 <input className="border-solid rounded-md px-2 py-1 border outline-none w-fit font-medium" type="number" name="qty" value={qty} onChange={onQty} id="qty" max={data.data.countInStock} min={1}/>
//               </div>
//             }
//             <button
//               className=" w-fit px-4 py-2 sm:p-2 bg-black text-white rounded"
//               disabled={data.data.countInStock <= 0}
//               onClick={addToCartHandler}
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>

//         <div className="">
//           <h2>Reviews</h2>
//           {data.data.reviews.length === 0 && <p>No reviews</p> }
//           <div>
//             {
//               data.data.reviews.map((review) => (
//                 <div key={review._id}>
//                   <strong>{review.name}</strong>
//                   <Ratting stars={review.rating}></Ratting>
//                   <p>{review.createdAt.substring(0, 10)}</p>
//                   <p>{review.comment}</p>
//                 </div>
//               ))
//             }

//             <div>
//               <h2>Write a customer review</h2>
//               {
//                 reviewLoading && <Loader></Loader>
//               }

//               {
//                 userInfo ? (
//                   <form onSubmit={submitHandler}>
//                     <div>
//                     <label htmlFor="rating">Rating</label>
//                       <select value={rating} onChange={(e) => setRating(Number(e.target.value))} id="rating">
//                         <option value="">Select...</option>
//                         <option value="1">1 - Poor</option>
//                         <option value="2">2 - Fair</option>
//                         <option value="3">3 - Good</option>
//                         <option value="4">4 - Very Good</option>
//                         <option value="5">5 - Excellent</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label htmlFor="comment">Comment</label>
//                       <textarea name="comment" id="comment" value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
//                     </div>

//                     <button disabled={reviewLoading}
//                     type="submit">Submit</button>
//                   </form>
                  
//                 ) : ( <p>Please <Link to='/login'>Sign in</Link> to write a review</p> )
//               }
//             </div>
//           </div>
//         </div>
//         </>
//       )}
//     </div>
//   );
// }


// import { useParams, useNavigate, Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import Rating from "../components/Rating";
// import { useGetProductsDetailsQuery, useCreateReviewMutation } from "../slice/productsApiSlice";
// import toast from "react-hot-toast";
// import Loader from "../components/Loader";
// import { useState } from "react";
// import { addToCart } from "../slice/cartSlice";

// export default function Product() {
//   const { productId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { userInfo } = useSelector((state) => state.auth);
//   const { data, isError, error, isLoading, refetch } = useGetProductsDetailsQuery(productId);
//   const [createReview, { isLoading: reviewLoading }] = useCreateReviewMutation();
  
//   const [qty, setQty] = useState(1);
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState('');

//   function onQty(e) {
//     setQty(Number(e.target.value));
//   }

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       await createReview({ productId, rating, comment }).unwrap();
//       refetch();
//       toast.success("Review Submitted");
//       setRating(0);
//       setComment("");
//     } catch (error) {
//       toast.error(error?.data?.message || error.error);
//     }
//   }

//   function addToCartHandler() {
//     if (data?.data) {
//       dispatch(addToCart({ ...data.data, qty }));
//       navigate("/cart");
//     }
//   }

//   if (isLoading) return <Loader />;
//   if (isError) {
//     toast.error(error.error);
//     return null;
//   }

//   const product = data?.data;

//   return (
//     <div className="p-6 max-w-screen-lg mx-auto">
//       <div className="flex flex-col lg:flex-row gap-12">
//         {/* Column for Image, Description, Rating */}
//         <div className="flex-1">
//           <img
//             className="w-full h-auto rounded-lg"
//             src={product?.image}
//             alt={product?.name}
//           />
//           <div className="mt-6 flex flex-col gap-3">
//             <h2 className="text-3xl font-semibold text-gray-800">{product?.name}</h2>
//             <Rating stars={product?.rating} reviews={product?.numReviews} />
//             <p className="text-xl font-semibold text-gray-800">Price: ${product?.price}</p>
//             <p className="text-gray-700">{product?.description}</p>
//           </div>
//         </div>

//         {/* Column for Add to Cart */}
//         <div className="w-full h-fit lg:w-80 bg-gray-50 border border-gray-200 rounded-md p-6">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">Price: ${product?.price}</h2>
//           <p className={`text-lg font-semibold mb-4 ${product?.countInStock > 0 ? "text-green-600" : "text-red-600"}`}>
//             Status: {product?.countInStock > 0 ? "In Stock" : "Out of Stock"}
//           </p>
//           {product?.countInStock > 0 && (
//             <div className="mb-4">
//               <label htmlFor="qty" className="block text-gray-700 font-medium">Quantity:</label>
//               <input
//                 className="mt-1 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
//                 type="number"
//                 name="qty"
//                 value={qty}
//                 onChange={onQty}
//                 id="qty"
//                 max={product?.countInStock}
//                 min={1}
//               />
//             </div>
//           )}
//           <button
//             className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
//             disabled={product?.countInStock <= 0}
//             onClick={addToCartHandler}
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>

//       <div className="mt-12">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-6">Reviews</h2>
//         {product?.reviews.length === 0 ? (
//           <p className="text-gray-600">No reviews</p>
//         ) : (
//           <div className="space-y-6">
//             {product?.reviews.map((review) => (
//               <div key={review._id} className="bg-white p-4 rounded-md border border-gray-200">
//                 <strong className="text-gray-800">{review.name}</strong>
//                 <Rating stars={review.rating} />
//                 <p className="text-gray-500 text-sm">{review.createdAt.substring(0, 10)}</p>
//                 <p className="text-gray-700">{review.comment}</p>
//               </div>
//             ))}
//           </div>
//         )}

//         <div className="mt-8">
//           <h2 className="text-xl font-semibold text-gray-800">Write a Customer Review</h2>
//           {reviewLoading && <Loader />}
//           {userInfo ? (
//             <form onSubmit={submitHandler} className="mt-4 space-y-4">
//               <div>
//                 <label htmlFor="rating" className="block text-gray-700 font-medium">Rating</label>
//                 <select
//                   value={rating}
//                   onChange={(e) => setRating(Number(e.target.value))}
//                   id="rating"
//                   className="mt-1 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
//                 >
//                   <option value="">Select...</option>
//                   <option value="1">1 - Poor</option>
//                   <option value="2">2 - Fair</option>
//                   <option value="3">3 - Good</option>
//                   <option value="4">4 - Very Good</option>
//                   <option value="5">5 - Excellent</option>
//                 </select>
//               </div>
//               <div>
//                 <label htmlFor="comment" className="block text-gray-700 font-medium">Comment</label>
//                 <textarea
//                   name="comment"
//                   id="comment"
//                   value={comment}
//                   onChange={(e) => setComment(e.target.value)}
//                   className="mt-1 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
//                 ></textarea>
//               </div>
//               <button
//                 type="submit"
//                 disabled={reviewLoading}
//                 className="py-3 px-6 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
//               >
//                 Submit
//               </button>
//             </form>
//           ) : (
//             <p className="text-gray-600">
//               Please <Link to="/login" className="text-indigo-600 hover:underline">Sign in</Link> to write a review
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }













import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../components/Rating";
import QuantitySelector from "../components/QuantitySelector";
import { useGetProductsDetailsQuery, useCreateReviewMutation } from "../slice/productsApiSlice";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { useState } from "react";
import { addToCart } from "../slice/cartSlice";

export default function Product() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { data, isError, error, isLoading, refetch } = useGetProductsDetailsQuery(productId);
  const [createReview, { isLoading: reviewLoading }] = useCreateReviewMutation();
  
  const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({ productId, rating, comment }).unwrap();
      refetch();
      toast.success("Review Submitted");
      setRating(0);
      setComment("");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  }

  function addToCartHandler() {
    if (data?.data) {
      dispatch(addToCart({ ...data.data, qty }));
      navigate("/cart");
    }
  }

  if (isLoading) return <Loader />;
  if (isError) {
    toast.error('Something went wrong!');
    return null;
  }

  const product = data?.data;

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <img
            className="w-full h-auto rounded-lg"
            src={product?.image}
            alt={product?.name}
          />
          <div className="mt-6 flex flex-col gap-3">
            <h2 className="text-3xl font-semibold text-gray-800">{product?.name}</h2>
            <Rating stars={product?.rating} reviews={product?.numReviews} />
            <p className="text-xl font-semibold text-gray-800">Price: ${product?.price}</p>
            <p className="text-gray-700">{product?.description}</p>
          </div>
        </div>

        <div className="w-full h-fit lg:w-80 bg-gray-50 border border-gray-200 rounded-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Price: ${product?.price}</h2>
          <p className={`text-lg font-semibold mb-4 ${product?.countInStock > 0 ? "text-green-600" : "text-red-600"}`}>
            Status: {product?.countInStock > 0 ? "In Stock" : "Out of Stock"}
          </p>
          {product?.countInStock > 0 && (
            <div className="mb-4">
              <QuantitySelector
                initialQty={qty}
                maxQty={product?.countInStock}
                onChange={(value) => setQty(value)}
              />
            </div>
          )}
          <button
            className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
            disabled={product?.countInStock <= 0}
            onClick={addToCartHandler}
          >
            Add to Cart
          </button>
        </div>
      </div>
      {/* ...rest of the component */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Reviews</h2>
        {product?.reviews.length === 0 ? (
          <p className="text-gray-600">No reviews</p>
        ) : (
          <div className="space-y-6">
            {product?.reviews.map((review) => (
              <div key={review._id} className="bg-white p-4 rounded-md border border-gray-200">
                <strong className="text-gray-800">{review.name}</strong>
                <Rating stars={review.rating} rate={'rate'} />
                <p className="text-gray-500 text-sm">{review.createdAt.substring(0, 10)}</p>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800">Write a Customer Review</h2>
          {reviewLoading && <Loader />}
          {userInfo ? (
            <form onSubmit={submitHandler} className="mt-4 space-y-4">
              <div>
                <label htmlFor="rating" className="block text-gray-700 font-medium">Rating</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  id="rating"
                  className="mt-1 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>
              <div>
                <label htmlFor="comment" className="block text-gray-700 font-medium">Comment</label>
                <textarea
                  name="comment"
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={reviewLoading}
                className="py-3 px-6 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
              >
                Submit
              </button>
            </form>
          ) : (
            <p className="text-gray-600">
              Please <Link to="/login" className="text-indigo-600 hover:underline">Sign in</Link> to write a review
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
