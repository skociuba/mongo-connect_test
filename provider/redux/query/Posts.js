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
    addToCart: builder.mutation({
      query: (obj) => ({
        url: '/add-cart',
        method: 'POST',
        body: {id: obj},
      }),
    }),

    editCart: builder.mutation({
      query: (obj) => ({
        url: '/edit-cart',
        method: 'POST',
        body: {
          id: obj.id,
          action: obj.action,
        },
      }),
    }),
  }),
});

export const {useAddToCartMutation, useGetPostsQuery, useEditCartMutation} =
  PostsApi;
