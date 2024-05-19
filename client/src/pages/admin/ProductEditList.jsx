import toast from "react-hot-toast";
import Loader from "../../components/Loader";
import {
  useGetProductsDetailsQuery,
  useUpdateProductMutation,
  useUploadImageMutation,
} from "../../slice/productsApiSlice";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function ProductEditList() {
  const [updateProduct, setUpdateProduct] = useState({
    name: "",
    price: 0,
    description: "",
    image: "",
    brand: "",
    category: "",
    countInStock: 0,
  });
  const { id: productId } = useParams();
  const navigate = useNavigate();
  console.log(productId);

  console.log(useGetProductsDetailsQuery(productId));

  const { data, isLoading, isError, refetch } =
    useGetProductsDetailsQuery(productId);
  const [update, { isLoading: updateLoading }] = useUpdateProductMutation();
  const [uploadImage, { isLoading: uploadLoading }] = useUploadImageMutation();

  console.log(useUploadImageMutation());

  useEffect(() => {
    !isLoading &&
      setUpdateProduct({
        name: data.data.name,
        price: data.data.price,
        image: data.data.image,
        brand: data.data.brand,
        countInStock: data.data.countInStock,
        category: data.data.category,
        description: data.data.description,
      });
  }, [data, isLoading]);

  const changeHandler = (e) => {
    setUpdateProduct((product) => {
      return { ...product, [e.target.name]: e.target.value };
    });
  };

  const updateHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await update({ ...updateProduct, _id: productId }).unwrap();
      toast.success(res.message);
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData()
    formData.append('image',e.target.files[0])
    try {
      const res = await uploadImage(formData).unwrap()
      toast.success(res?.message);
      setUpdateProduct((state) => {
        return {
          ...state, image: res.data,
        }
      });
      console.log(res);
    } catch (error) {
      toast.error(error?.data?.message)
    }
  }

  console.log(updateProduct);
  console.log(data);

  return (
    <>
      <Link to="/admin/products">
        <button className=" w-fit px-4 py-3 text-white bg-black rounded font-semibold my-4 ml-2 sm:ml-14">
          Go Back
        </button>
      </Link>
      <div className=" min-h-max flex flex-col justify-center items-center pb-8">
        {updateLoading && <Loader></Loader>}
        {isLoading ? (
          <Loader></Loader>
        ) : isError ? (
          <span>{isError}</span>
        ) : (
          <form
            encType="multipart/form-data"
            onSubmit={updateHandler}
            action=""
            className=" sm:w-[600px] w-full p-4 flex flex-col gap-3"
          >
            <h1 className="font-semibold text-3xl">Edit Product</h1>

            <div className=" flex flex-col gap-1">
              <label htmlFor="name" className="font-semibold">
                Name
              </label>
              <input
                className=" border outline-none px-2 py-2 rounded"
                type="text"
                name="name"
                id="name"
                value={updateProduct.name}
                onChange={changeHandler}
              />
            </div>

            <div className=" flex flex-col gap-1">
              <label htmlFor="name" className="font-semibold">
                Price
              </label>
              <input
                className=" border outline-none px-2 py-2 rounded"
                type="number"
                name="price"
                id="price"
                value={updateProduct.price}
                onChange={changeHandler}
              />
            </div>

            <div className=" flex flex-col gap-1">
              <label htmlFor="image" className="font-semibold">
                Image{" "}
              </label>
              <input
                className=" border-0 outline-none px-2 py-2 rounded"
                type="text"
                name="image"
                id="image"
                disabled
                value={updateProduct.image}
                onChange={changeHandler}
              />
              
              <input
                type="file"
                className=" border-0 outline-none px-2 py-2 rounded"
                id="upload"
                onChange={uploadFileHandler}
              />
            </div>

            <div className=" flex flex-col gap-1">
              <label htmlFor="name" className="font-semibold">
                Brand
              </label>
              <input
                className=" border outline-none px-2 py-2 rounded"
                type="text"
                name="brand"
                id="brand"
                value={updateProduct.brand}
                onChange={changeHandler}
              />
            </div>

            <div className=" flex flex-col gap-1">
              <label htmlFor="name" className="font-semibold">
                Count In Stock
              </label>
              <input
                className=" border outline-none px-2 py-2 rounded"
                type="number"
                name="countInStock"
                id="countInStock"
                value={updateProduct.countInStock}
                onChange={changeHandler}
              />
            </div>

            <div className=" flex flex-col gap-1">
              <label htmlFor="name" className="font-semibold">
                Category
              </label>
              <input
                className=" border outline-none px-2 py-2 rounded"
                type="text"
                name="category"
                id="category"
                value={updateProduct.category}
                onChange={changeHandler}
              />
            </div>

            <div className=" flex flex-col gap-1">
              <label htmlFor="name" className="font-semibold">
                Description
              </label>
              {/* <textarea name="" id="" cols="30" rows="10"> */}
              <textarea
                className=" border outline-none px-2 py-2 rounded"
                type="text"
                name="description"
                id="description"
                value={updateProduct.description}
                onChange={changeHandler}
              >
                {" "}
              </textarea>
            </div>

            <button className="w-fit px-4 py-2 text-white bg-black rounded font-semibold">
              Update
            </button>
          </form>
        )}
      </div>
    </>
  );
}
