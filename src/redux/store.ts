import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "@/redux/features/auth/authSlice";

import { authApi } from "./services/auth.service";
import { bookApi } from "./services/books.service";
import { reviewApi } from "./services/reviews.service";
import { genreApi } from "./services/genres.service";
import { userApi } from "./services/users.service";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [genreApi.reducerPath]: genreApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      authApi.middleware,
      bookApi.middleware,
      reviewApi.middleware,
      genreApi.middleware,
      userApi.middleware,
    ]),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
