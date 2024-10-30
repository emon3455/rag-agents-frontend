import { apiSlice } from "../api/api";

export const agentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAgent: builder.query({
      query: () => ({
        url: "/api/agents",
        method: "GET",
      }),
    }),

    getUserAllAgent: builder.query({
      query: () => ({
        url: `/api/agents/userAllAgent?userId=67178a2386cc1454cdac7fb5`,
        method: "GET",
      }),
    }),

    // Add the query to get a single agent by ID
    getAgentById: builder.query({
      query: (id) => ({
        url: `/api/agents/${id}`, // Adjust the URL based on your API design
        method: "GET",
      }),
    }),

    createAgent: builder.mutation({
      query: (data) => ({
        url: "/api/agents",
        method: "POST",
        body: data,
      }),
    }),

    askQuestion: builder.mutation({
      query: (data) => ({
        url: "/api/agents/ask-question",
        method: "POST",
        body: data,
      }),
    }),

    // Update deleteAgent mutation to send agentId in the body
    deleteAgent: builder.mutation({
      query: (agentId) => ({
        url: `/api/agents`,
        method: "DELETE",
        body: { agentId },
      }),
    }),

    updateAgent: builder.mutation({
      query: ({ agentId, email, agent_name, knowledge, prompt }) => ({
        url: `/api/agents`,
        method: "PUT",
        body: { agentId, email, agent_name, knowledge, prompt },
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useAskQuestionMutation,
  useCreateAgentMutation,
  useGetAllAgentQuery,
  useGetUserAllAgentQuery,
  useDeleteAgentMutation,
  useUpdateAgentMutation,
  useGetAgentByIdQuery, // Export the getAgentById hook
} = agentApiSlice;
