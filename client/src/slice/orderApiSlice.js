import { ORDERS_URL, PAYPAL_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        createOrder : builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'POST',
                credentials:"include",
                body: {...order}
            })
        }),
        getOrderDetails : builder.query({
            query: (id) => ({
                url:`${ORDERS_URL}/${id}`,
                credentials: "include",
                method: 'GET'
            }),
            keepUnusedDataFor: 5
        }),

        payOrder : builder.mutation({
            query: ({id, details}) => ({
                url: `${ORDERS_URL}/${id}/pay`,
                credentials: "include",
                method: 'PUT',
                body: {...details}
            })
        }),

        getPayPalClientId: builder.query({
            query: () => ({
                url: PAYPAL_URL,
            }),
            keepUnusedDataFor: 5
        }),

        orders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/mine`,
                credentials: "include",
            }),
            keepUnusedDataFor: 5
        }),

        adminOrdersList: builder.query({
            query: () => ({
                url: ORDERS_URL,
                credentials: "include",
            }),
            keepUnusedDataFor: 5
        }),

        deliverOrder : builder.mutation({
            query: (id) => ({
                url: `${ORDERS_URL}/${id}/deliver`,
                credentials: "include",
                method: 'PUT',
                // body: {...details}
            })
        }),

    })
})

export const { useCreateOrderMutation, useGetOrderDetailsQuery, useGetPayPalClientIdQuery, usePayOrderMutation, useOrdersQuery, useAdminOrdersListQuery, useDeliverOrderMutation } = orderApiSlice