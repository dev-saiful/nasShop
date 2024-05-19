import { Link } from "react-router-dom";
import Ratting from "../components/Ratting";
import { useGetProductsQuery } from "../slice/productsApiSlice";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

export default function Home() {
    // there are error, status in error
  const { data, isLoading, isError, error } = useGetProductsQuery();
  // console.log(data);

  //   doesn't work the destructuring
  //   const { data: { data: {products}  }, isLoading, isError, isSuccess } = useGetProductsQuery();

  return (
    <div>
      {isLoading ? (
        <Loader></Loader>
      ) : isError ? (
          // toast.error(error.error)
          <p>No Products Found</p>
      ) : (
        <div className=" w-fit mx-auto grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 px-5 sm:px-14 py-7">
          {data.data.products.map((product) => {
            return (
              <Link key={product._id} to={`/product/${product._id}`}>
                <div className="max-w-80 p-3 border border-solid rounded-lg">
                  <img src={product.image} alt="" />
                  <p className=" text-ellipsis overflow-hidden whitespace-nowrap">
                    {product.name}
                  </p>
                  <Ratting
                    stars={product.rating}
                    reviews={product.numReviews}
                  ></Ratting>
                  <p>${product.price}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
