import { USERS_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data,
                credentials:"include"
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/register`,
                method: 'POST',
                body: data,
                // credentials:"include"
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
                credentials:"include"
            }),
        }),
        admin: builder.query({
            query: () => ({
                url: `${USERS_URL}/admin`,
                method: 'GET',
                credentials:"include",
                // body: data,
            }),
        }),
        customer: builder.query({
            query: () => ({
                url: `${USERS_URL}/customer`,
                method: 'GET',
                credentials:"include",
                // body: data,
            }),
        }),
    }),
})


export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useAdminQuery, useCustomerQuery } = userApiSlice