import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constant";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,

  }),
  tagTypes: ["Product", "Order", "User"],
  endpoints: (builder) => ({}),
});

// const baseQuery = fetchBaseQuery({
//     baseUrl: 'https://api.example.com/',
//     prepareHeaders: (headers, { getState }) => {
//       const token = getState().auth.userInfo.data.accessToken; // Assuming you have the token stored in the Redux state
//       if (token) {
//         headers.set('Authorization', `Bearer ${token}`);
//       }
//       return headers;
//     },
//   });


// prepareHeaders: (headers, { getState }) => {
//     const token = getState().auth.userInfo.data.accessToken; // Assuming you have the token stored in the Redux state
//     console.log(token);
//     if (token) {
//       headers.set("Authorization", `Bearer ${token}`);
//       console.log(token);
//       console.log(headers);
//     }
//     return headers;
//   }