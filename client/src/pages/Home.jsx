import { Link, useParams } from "react-router-dom";
import Ratting from "../components/Rating";
import { useGetProductsQuery } from "../slice/productsApiSlice";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import Carousel from "../components/Carousel";
// import toast from "react-hot-toast";

export default function Home() {
  const { keyword, pageNumber = 1 } = useParams();

  const { data, isLoading, isError } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <div className="container mx-auto px-3 sm:px-6 lg:px-14 py-10">
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <p className="text-center text-red-500">No Products Found</p>
      ) : (
        <div>
          <Carousel items={data.data.products.slice(0, 15)} />
          <div className="grid grid-cols-1 my-12 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {data.data.products.map((product) => {
              return (
                <Link key={product._id} to={`/product/${product._id}`}>
                  <div className="bg-white border p-4 border-gray-200 rounded-md overflow-hidden">
                    <div className="w-full h-0 pb-[75%] relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="absolute top-1/2 left-1/2 w-full h-full object-contain transform -translate-x-1/2 -translate-y-1/2"
                      />
                    </div>
                    <div className="pt-3">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {product.name}
                      </p>
                      <Ratting
                        stars={product.rating}
                        reviews={product.numReviews}
                      />
                      <p className="mt-2 text-lg font-bold text-gray-900">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="mt-10 flex justify-center">
            <Pagination
              page={Number(pageNumber)}
              totalPages={data.data.pages}
              keyword = {keyword ? keyword : ''}
            />
          </div>
        </div>
      )}
    </div>
  );
}
