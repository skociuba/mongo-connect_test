import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';

import {PostsApi} from './query/Posts';

export const store = configureStore({
  reducer: {
    [PostsApi.reducerPath]: PostsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(PostsApi.middleware),
});

setupListeners(store.dispatch);
