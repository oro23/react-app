import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";
import productReducer from "./productSlice";

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    product: productReducer,
  },
});
