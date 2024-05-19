import { PRODUCT_URL, UPLOAD_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCT_URL,
            }),
            providesTags: ['Products'],
            keepUnusedDataFor: 5,
        }),

        getProductsDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`
            }),
            keepUnusedDataFor: 5
        }),

        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCT_URL,
                method: 'POST',
                credentials: 'include'
            }),
            invalidatesTags: ['Products'],
        }),

        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCT_URL}/${data._id}`,
                method: 'PUT',
                credentials: 'include',
                body: data
            }),
            invalidatesTags: ['Products'],
        }),

        uploadImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}`,
                method: 'POST',
                credentials: 'include',
                body: data
            }),
        }),

    }),
})


export const { useGetProductsQuery, useGetProductsDetailsQuery, useCreateProductMutation, useUpdateProductMutation, useUploadImageMutation } = productsApiSlice