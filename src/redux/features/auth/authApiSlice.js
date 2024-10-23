import { apiSlice } from "../api/api";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => {
        return {
          url: "/api/users/login",
          method: "POST",
          body: data,
        };
      },
    }),
    
    register: builder.mutation({
      query: (data) => {
        return {
          url: "/api/users/register",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
