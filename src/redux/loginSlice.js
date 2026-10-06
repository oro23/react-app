import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getLogin = createAsyncThunk(
  "login/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, expiresInMins: 30 }),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data || "Login failed");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState: { isLoggedIn: false, data: null, loading: false, error: null },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getLogin.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
