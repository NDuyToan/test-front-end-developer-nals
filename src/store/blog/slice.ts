import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { BlogType } from "../../services/data";
import { getBlogs } from "../../services/blog";

export interface BlogState {
  blogs: BlogType[];
  status: string; // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string;
}

const initialState: BlogState = {
  blogs: [],
  status: "idle",
  error: "",
};

export const fetchBlogs = createAsyncThunk(
  "blog/getBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getBlogs();
      return response;
    } catch (error) {
      return rejectWithValue("An error has occurred. Please try again!");
    }
  }
);

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state, action) => {
        if (state.status === "idle") {
          state.status = "loading";
        }
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        if (state.status === "loading") {
          state.status = "idle";
          state.blogs = action.payload;
        }
      })
      .addCase(fetchBlogs.rejected, (state, { payload }) => {
        if (state.status === "loading") {
          state.status = "idle";
          state.error = payload as string;
        }
      });
  },
});

// Action creators are generated for each case reducer function
// export const {} = blogSlice.actions;

export default blogSlice.reducer;
