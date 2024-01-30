import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const PostsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),

  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: '/mongo/api',
        method: 'GET',
      }),
    }),
    addPost: builder.mutation({
      query: (obj) => ({
        url: '/mongo/api',
        method: 'POST',
        body: obj,
      }),
    }),
  }),
});

export const {useAddPostMutation, useGetPostsQuery, useEditCartMutation} =
  PostsApi;
