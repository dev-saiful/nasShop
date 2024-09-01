import { PRODUCT_URL, UPLOAD_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: PRODUCT_URL,
        params: {
          keyword,
          pageNumber,
        },
        credentials:"include",
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),

    getProductsDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCT_URL,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/${data._id}`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    uploadImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),

    // url: `${PRODUCT_URL}/${data.productId}/reviews`,
    createReview: builder.mutation({
      query: ({ productId, rating, comment }) => ({
        url: `${PRODUCT_URL}/${productId}/reviews`,
        method: "POST",
        credentials: "include",
        body: { rating, comment },
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
} = productsApiSlice;
