import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
  "jsonph/fetchPosts",
  async (page, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${page}`
      );
      if (!response.ok) throw new Error("Failed to fetch posts");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const jsonphSlice = createSlice({
  name: "jsonph",
  initialState: {
    posts: [],
    selectedPost: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchPostsSuccess: (state, action) => {
      state.selectedPost = action.payload;
    },

    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = [action.payload]; // Store as an array
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { fetchPostsSuccess, addPost } = jsonphSlice.actions;
export default jsonphSlice.reducer;
