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
    deletePost: builder.mutation({
      query: (_id) => ({
        url: '/mongo/api',
        method: 'DELETE',
        body: {_id},
      }),
    }),

    updatePost: builder.mutation({
      query: (updatedPost) => ({
        url: '/mongo/api',
        method: 'PUT',
        body: updatedPost,
      }),
    }),
  }),
});

export const {
  useAddPostMutation,
  useGetPostsQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
} = PostsApi;
