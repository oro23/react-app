import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { setSelectedPostId: null },
  reducers: {
    setSelectedPostId: (state, action) => {
      state.setSelectedPostId = action.payload;
    },
  },
});

export const { setSelectedPostId } = uiSlice.actions;
export default uiSlice.reducer;
