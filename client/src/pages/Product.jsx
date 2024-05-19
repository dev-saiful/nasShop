import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Ratting from "../components/Ratting";
import { useGetProductsDetailsQuery } from "../slice/productsApiSlice";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { useState } from "react";
import { addToCart } from "../slice/cartSlice";
  

export default function Product() {
  const { productId } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data, isError,error, isLoading } = useGetProductsDetailsQuery(productId);
  console.log(data);
  // console.log(useGetProductsDetailsQuery(productId));
  const [qty, setQty] = useState(1)
  function onQty(e){
    setQty(Number(e.target.value))
  }

  // console.log(addToCart({...data.data, qty}));

  function addToCartHandler() {
    dispatch(addToCart({...data.data, qty}))
    // console.log(dispatch(addToCart({...data.data, qty})));
    navigate('/cart')
  }

  // console.log(typeof qty);
  // console.log(data.data);

  return (
    <div>
      {isLoading ? (
        <Loader></Loader>
      ) : isError ? (
        toast.error(error.error)
      ) : (
        <div className="grid lg:grid-cols-9 gap-6 p-6">
          <div className=" w-[300px] rounded-xl lg:w-full sm:col-span-2 lg:col-span-3">
            <img
              className="rounded-xl"
              src={data.data.image}
              alt="product_image"
            />
            {console.log(data.data.image)}
          </div>

          <div className=" w-full flex flex-col gap-3 lg:col-span-4">
            <h2 className="text-3xl font-medium">{data.data.name}</h2>
            <hr />
            <Ratting
              stars={data.data.rating}
              reviews={data.data.numReviews}
            ></Ratting>
            <hr />
            <p className=" text-lg font-medium">Price: ${data.data.price}</p>
            <hr />
            <p>Description: {data.data.description}</p>
          </div>

          <div className=" w-full h-fit flex flex-col gap-3 border rounded-lg px-9 py-4 shadow-md lg:col-span-2">
            <p className=" text-xl font-medium">Price: ${data.data.price}</p>
            <hr />
            <p
              className={`${
                data.data.countInStock > 0 ? "text-green-900" : " text-red-900"
              }`}
            >
              Status: {data.data.countInStock > 0 ? "In Stock" : "Out of Stock"}
            </p>
            <hr />
            {
              data.data.countInStock > 0 && <div>
                <label htmlFor="qty">Quantity:  </label>
                <input className="border-solid rounded-md px-2 py-1 border outline-none w-fit font-medium" type="number" name="qty" value={qty} onChange={onQty} id="qty" max={data.data.countInStock} min={1}/>
              </div>
            }
            <button
              className=" w-fit px-4 py-2 sm:p-2 bg-black text-white rounded"
              disabled={data.data.countInStock <= 0}
              onClick={addToCartHandler}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
