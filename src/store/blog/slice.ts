import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { BlogType, SubmitBlog } from "../../services/data";
import {
  getBlogsAPI,
  createBlogAPI,
  getBlogByIdAPI,
  editBlogAPI,
} from "../../services/blog";
import { MESSAGE_ERROR } from "../../constants";

export interface BlogState {
  blogs: BlogType[];
  status: string; // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string;
  blogDetail: BlogType;
  isSaving: boolean;
}

const initialState: BlogState = {
  blogs: [],
  status: "idle",
  error: "",
  blogDetail: {
    id: "",
    title: "",
    content: "",
    image: "",
    createdAt: "",
  },
  isSaving: false,
};

export const fetchBlogs = createAsyncThunk(
  "blog/getBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getBlogsAPI();
      return response;
    } catch (error) {
      return rejectWithValue(MESSAGE_ERROR);
    }
  }
);

export const createNewBlog = createAsyncThunk(
  "blog/createNewBlog",
  async (dataSubmit: SubmitBlog, { rejectWithValue }) => {
    try {
      const response = await createBlogAPI(dataSubmit);
      return response;
    } catch (error) {
      return rejectWithValue(MESSAGE_ERROR);
    }
  }
);

export const editBlog = createAsyncThunk(
  "blog/editBlog",
  async (dataSubmit: SubmitBlog, { rejectWithValue }) => {
    try {
      const response = await editBlogAPI(dataSubmit);
      return response;
    } catch (error) {
      return rejectWithValue(MESSAGE_ERROR);
    }
  }
);

export const getBlogById = createAsyncThunk(
  "blog/getBlogById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getBlogByIdAPI(id);
      return response;
    } catch (error) {
      return rejectWithValue(MESSAGE_ERROR);
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
          state.error = "";
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
      })
      .addCase(createNewBlog.pending, (state, action) => {
        state.isSaving = true;
        state.error = "";
      })
      .addCase(createNewBlog.fulfilled, (state, action) => {
        state.isSaving = false;
      })
      .addCase(createNewBlog.rejected, (state, { payload }) => {
        state.isSaving = false;
        state.error = payload as string;
      })
      .addCase(editBlog.pending, (state, action) => {
        state.isSaving = true;
        state.error = "";
      })
      .addCase(editBlog.fulfilled, (state, action) => {
        state.isSaving = false;
      })
      .addCase(editBlog.rejected, (state, { payload }) => {
        state.isSaving = false;
        state.error = payload as string;
      })
      .addCase(getBlogById.pending, (state) => {
        if (state.status === "idle") {
          state.status = "loading";
          state.error = "";
        }
      })
      .addCase(getBlogById.fulfilled, (state, { payload }) => {
        if (state.status === "loading") {
          state.status = "idle";
          state.blogDetail = payload;
        }
      })
      .addCase(getBlogById.rejected, (state, { payload }) => {
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
