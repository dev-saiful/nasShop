import toast from "react-hot-toast";
import Loader from "../../components/Loader";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../slice/productsApiSlice";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import Pagination from "../../components/Pagination";

export default function ProductsList() {
  const { pageNumber = 1 } = useParams(); // Default to page 1
  const { data, isLoading, isError, refetch } = useGetProductsQuery({ pageNumber });
  const [deleteProduct] = useDeleteProductMutation();

  const deleteProductHandler = async (id) => {
    if (window.confirm("Do you want to delete the product")) {
      try {
        const res = await deleteProduct(id).unwrap();
        toast.success(res?.message);
        refetch();
      } catch (error) {
        toast.error(error?.message);
      }
    }
  };

  const [create, { isLoading: productLoad }] = useCreateProductMutation();

  const newProduct = async () => {
    if (window.confirm("Do you want to create a new product?")) {
      try {
        const res = await create().unwrap();
        refetch();
        toast.success(res.message);
      } catch (error) {
        toast.error(error?.data?.message);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <span className="text-3xl md:text-4xl text-[#04AA6D] font-semibold">Products</span>
        <button
          className="px-4 py-2 bg-[#04AA6D] text-white rounded-md hover:bg-[#038f5a] transition-all"
          onClick={newProduct}
        >
          Create Product
        </button>
      </div>

      {productLoad && <Loader />}

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <p>{isError}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-[#04AA6D] text-white">
                <th className="px-4 py-2 border-b">Index</th>
                <th className="px-4 py-2 border-b">Id</th>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Price</th>
                <th className="px-4 py-2 border-b">Category</th>
                <th className="px-4 py-2 border-b">Brand</th>
                <th className="px-4 py-2 border-b">Edit</th>
                <th className="px-4 py-2 border-b">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.data.products.map((item, idx) => (
                <tr
                  key={item._id}
                  className="text-center hover:bg-gray-100 transition-all"
                >
                  <td className="px-4 py-2 border-b">{(pageNumber - 1) * data.data.products.length + (idx + 1)
                  }</td>
                  <td className="px-4 py-2 border-b">{item._id}</td>
                  <td className="px-4 py-2 border-b">
                    {item.name.length < 18 ? item.name : item.name.substring(0, 15) + "..."}
                  </td>
                  <td className="px-4 py-2 border-b">${item.price}</td>
                  <td className="px-4 py-2 border-b">{item.category}</td>
                  <td className="px-4 py-2 border-b">{item.brand}</td>
                  <td className="px-4 py-2 border-b text-xl">
                    <Link to={`/admin/product/${item._id}/edit`}>
                      <FaEdit className="text-blue-500 hover:text-blue-700 cursor-pointer" />
                    </Link>
                  </td>
                  <td
                    className="px-4 py-2 border-b text-xl"
                    onClick={() => deleteProductHandler(item._id)}
                  >
                    <MdDelete className="text-red-500 hover:text-red-700 cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-8">
        {
          isLoading ? <p>Loading</p> : <Pagination page={Number(pageNumber)} totalPages={data.data.pages} admin='admin' />
        }
        
      </div>
    </div>
  );
}
