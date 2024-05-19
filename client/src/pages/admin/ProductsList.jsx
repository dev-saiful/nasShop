import toast from "react-hot-toast";
import Loader from "../../components/Loader";
import {
  useCreateProductMutation,
  useGetProductsQuery,
} from "../../slice/productsApiSlice";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

export default function ProductsList() {
  const { data, isLoading, isError, refetch } = useGetProductsQuery();
  console.log(useGetProductsQuery());
  const deleteProduct = (id) => {
    console.log("delete", id);
  };

  const nextPage = () => {};

  const [create, { isLoading: productLoad }] = useCreateProductMutation();

  const newProduct = async () => {
    if (window.confirm("Do you want to create a new product?")) {
      try {
        const res = await create().unwrap();
        console.log(res);
        refetch();
        toast.success(res.message);
      } catch (error) {
        toast.error(error?.data?.message);
      }
    }
  };

  //   console.log(data.data.products[]);
  //   console.log(create());
  //   console.log(useCreateProductMutation());
  return (
    <div>
      <div className="flex justify-between my-5 mx-10">
        <span className=" text-4xl text-[#04AA6D] font-semibold">Products</span>{" "}
        <button className="w-fit px-4 py-2 text-white bg-[#04AA6D] rounded font-semibold" onClick={newProduct}>Create Product</button>
      </div>

      {productLoad && <Loader></Loader>}

      {isLoading ? (
        <Loader></Loader>
      ) : isError ? (
        <p>{isError}</p>
      ) : (
        <div className=" flex justify-center w-full my-8">
          <table className=" w-fit border-collapse border border-slate-400">
          <thead>
            <tr className=" text-center bg-[#04AA6D] text-white">
              <th className=" px-4 py-2 border border-slate-300">Index</th>
              <th className=" px-4 py-2 border border-slate-300">Id</th>
              <th className=" px-4 py-2 border border-slate-300">Name</th>
              <th className=" px-4 py-2 border border-slate-300">Price</th>
              <th className=" px-4 py-2 border border-slate-300">Category</th>
              <th className=" px-4 py-2 border border-slate-300">Brand</th>
              <th className=" px-4 py-2 border border-slate-300">Edit</th>
              <th className=" px-4 py-2 border border-slate-300">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.data.products.map((item, idx) => (
              <tr key={item._id} className='bg-white odd:bg-gray-100 hover:bg-[#ddd] text-center'>
                <td className=" px-4 py-2 border border-slate-300">{idx + 1}</td>
                <td className=" px-4 py-2 border border-slate-300">{item._id}</td>
                <td className=" px-4 py-2 border border-slate-300">{item.name.length < 18 ? (item.name) : item.name.substring(0,15)+'...'}</td>
                <td className=" px-4 py-2 border border-slate-300">${item.price}</td>
                <td className=" px-4 py-2 border border-slate-300">{item.category}</td>
                <td className=" px-4 py-2 border border-slate-300">{item.brand}</td>
                <td className=" px-4 py-2 border border-slate-300 text-xl">
                  {" "}
                  <Link to={`/admin/product/${item._id}/edit`} >
                    <FaEdit className="cursor-pointer"></FaEdit>
                  </Link>{" "}
                </td>
                <td
                  className=" px-4 py-2 border border-slate-300 text-xl"
                  
                >
                  {" "}
                  <MdDelete onClick={() => deleteProduct(item._id)} className="cursor-pointer"></MdDelete>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
      <button onClick={nextPage}>Next</button>
    </div>
  );
}
