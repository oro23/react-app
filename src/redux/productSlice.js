import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ---------------------
// ASYNC THUNK
// ---------------------
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://jsonfakery.com/products/paginated?page=${page}`
      );
      // console.log("Products List:", response.data);
      return response.data; // what reducer will receive
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ---------------------
// SLICE
// ---------------------
const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    filteredProducts: [],
    selectedProducts: null,
    lastPage: 1,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProducts = action.payload;
    },
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
    },
    // setFilteredProducts: (state, action) => {
    //   const term = action.payload.toLowerCase();
    //   state.filteredProducts = state.products.filter((product) =>
    //     product.name.toLowerCase().includes(term)
    //   );
    // },
  },

  extraReducers: (builder) => {
    builder
      // pending (loading)
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // success
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;

        // API response data structure:
        // { data: [...], last_page, current_page, ... }
        state.products = action.payload.data;
        state.filteredProducts = action.payload.data;
        state.lastPage = action.payload.last_page;
      })

      // error
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedProduct, setFilteredProducts } = productSlice.actions;
export default productSlice.reducer;
