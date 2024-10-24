import { apiSlice } from "../api/api";

export const agentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAgent: builder.query({
      query: () => {
        return {
          url: "/api/agents",
          method: "GET",
        };
      },
    }),

    getUserAllAgent: builder.query({
      query: () => {
        return {
          url: `/api/agents/userAllAgent?userId=67178a2386cc1454cdac7fb5`,
          method: "GET",
        };
      },
    }),

    createAgent: builder.mutation({
      query: (data) => {
        return {
          url: "/api/agents",
          method: "POST",
          body: data,
        };
      },
    }),
    askQuestion: builder.mutation({
      query: (data) => {
        return {
          url: "/api/agents/ask-question",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useAskQuestionMutation,
  useCreateAgentMutation,
  useGetAllAgentQuery,
  useGetUserAllAgentQuery,
} = agentApiSlice;
