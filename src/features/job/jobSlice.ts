import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { JobType } from "@/typescript/type";

interface ApiResponse {
  count: number;
  data: JobType[] | JobType;
  error: string | unknown | null;
  message: string;
}

interface InitialStateProps {
  jobs: JobType[];
  job?: JobType;
  appliedJobs: JobType[];
  loading: boolean;
  success: boolean;
  message: string | null;
  error: string | null | unknown;
}

// fetch all jobs action
export const fetchJobs = createAsyncThunk<ApiResponse, Record<string, string>>(
  "job/fetchJobs",
  async (query: Record<string, string>) => {
    let queryString = "";

    for (const key in query) {
      if (query[key]) {
        queryString += `&${key}=${query[key]}`;
      }
    }

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_BACKEND_URL}/jobs?${queryString}`
    );
    return response.data;
  }
);

// post a new job action
export const postJob = createAsyncThunk(
  "job/postJob",
  async (data: JobType) => {
    console.log(data);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_BACKEND_URL}/jobs/create`,
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// single job post action
export const singleJobPost = createAsyncThunk(
  "job/singleJob",
  async (id: string) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_BACKEND_URL}/jobs/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// edit job post action
export const editPost = createAsyncThunk(
  "job/editPost",
  async (data: JobType) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_BACKEND_URL}/jobs/update/${data._id}`,
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log("edit post error", error);
    }
  }
);

export const deleteJobPost = createAsyncThunk(
  "job/deleteJob",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_BACKEND_URL}/jobs/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      const errorResponse = error as {
        response: { data: { message: string } };
      };
      return rejectWithValue(errorResponse.response.data.message);
    }
  }
);

export const applyJob = createAsyncThunk(
  "job/apply",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_BACKEND_URL}/jobs/apply/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      const errorResponse = error as {
        response: { data: { message: string } };
      };
      return rejectWithValue(errorResponse.response.data.message);
    }
  }
);

export const getAppliedJobs = createAsyncThunk(
  "job/getAppliedJobs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_BACKEND_URL}/jobs/appliedJobs`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      const errorResponse = error as {
        response: { data: { message: string } };
      };
      return rejectWithValue(errorResponse.response.data.message);
    }
  }
);

const initialState: InitialStateProps = {
  jobs: [] as JobType[],
  job: {} as JobType,
  appliedJobs: [],
  loading: false,
  success: false,
  message: null,
  error: null,
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    addToApplyJobs: (_state, action) => {
      console.log(action.payload);
    },

    // reset state
    resetState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchJobs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchJobs.fulfilled, (state, action) => {
      state.loading = false;
      state.jobs = action.payload.data as JobType[];
      state.error = null;
    });
    builder.addCase(fetchJobs.rejected, (state, action) => {
      state.loading = false;
      state.jobs = [];
      state.error = action.error.message ?? null;
    });
    builder.addCase(postJob.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.jobs.push(action.payload.data as JobType);
      state.error = null;
    });
    builder.addCase(postJob.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error.message ?? null;
    });
    builder.addCase(singleJobPost.fulfilled, (state, action) => {
      state.loading = false;
      state.job = action.payload.data as JobType;
      state.error = null;
    });
    builder.addCase(singleJobPost.rejected, (state, action) => {
      state.loading = false;
      state.job = {} as JobType;
      state.error = action.error.message ?? null;
    });
    builder.addCase(editPost.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.message = action.payload.message;
      state.error = null;
    });
    builder.addCase(deleteJobPost.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.message = action.payload.message;
      state.error = null;
    });
    builder.addCase(applyJob.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.message = action.payload?.message || "";
      state.error = null;
    });
    builder.addCase(applyJob.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
    builder.addCase(getAppliedJobs.fulfilled, (state, action) => {
      state.loading = false;
      state.appliedJobs = action.payload.data.appliedJobs as JobType[];
      state.error = null;
    });
    builder.addCase(getAppliedJobs.rejected, (state, action) => {
      state.loading = false;
      state.appliedJobs = [];
      state.error = action.error.message ?? null;
    });
  },
});

export const { resetState, addToApplyJobs } = jobSlice.actions;

export default jobSlice.reducer;
