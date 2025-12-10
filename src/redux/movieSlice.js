import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ---------------------
// ASYNC THUNK
// ---------------------
export const fetchMovies = createAsyncThunk(
  "movie/fetchMovies",
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://jsonfakery.com/movies/paginated?page=${page}`
      );
      return response.data; // what reducer will receive
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// -------------------------------------
// SLICE
// ---------------------
// ---------------------
// SLICE
// ---------------------
const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movies: [],
    filteredMovies: [],
    selectedMovie: null,
    lastPage: 1,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // pending (loading)
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // success
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;

        // API response data structure:
        // { data: [...], last_page, current_page, ... }
        state.movies = action.payload.data;
        state.filteredMovies = action.payload.data;
        state.lastPage = action.payload.last_page;
      })

      // error
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedMovie } = movieSlice.actions;
export default movieSlice.reducer;
