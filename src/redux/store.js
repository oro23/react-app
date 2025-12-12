import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import counterReducer from "./counterSlice";
import jsonphReducer from "./jsonphSlice";
import loginreducer from "./loginSlice";

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    product: productReducer,
    cart: cartReducer,
    counter: counterReducer,
    jsonph: jsonphReducer,
    login: loginreducer,
  },
});

// 🔥 Save cart to localStorage on every change
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("cart", JSON.stringify(state.cart.items));
});
