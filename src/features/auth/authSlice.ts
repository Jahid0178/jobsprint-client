import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserType } from "@/typescript/type";

interface InitialStateProps {
  user: UserType | null;
  loading: boolean;
  error: string | unknown;
  success: boolean;
  isAuthenticated: boolean;
  token: string | null;
  message: string | null;
}

const initialState: InitialStateProps = {
  user: null,
  loading: false,
  error: null,
  success: false,
  isAuthenticated: false,
  token: null,
  message: null,
};

// user register action
export const userRegister = createAsyncThunk(
  "user/register",
  async (
    data: {
      fullName: string;
      email: string;
      password: string;
      confirmPassword: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_BACKEND_URL}/users/register`,
        data
      );
      return response.data;
    } catch (error: unknown) {
      const errorResponse = error as { response: { data: unknown } };
      return rejectWithValue(errorResponse.response.data);
    }
  }
);

// user login action
export const userLogin = createAsyncThunk(
  "user/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_BACKEND_URL}/users/login`,
        data
      );
      return response.data;
    } catch (error) {
      const errorResponse = error as { response: { data: unknown } };
      return rejectWithValue(errorResponse.response.data);
    }
  }
);

// user logout action
export const userLogout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_BACKEND_URL}/users/logout`
      );
      return response.data;
    } catch (error) {
      const errorResponse = error as { response: { data: string } };
      return rejectWithValue(errorResponse.response.data);
    }
  }
);

export const authRegisterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userRegister.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(userRegister.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(userRegister.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.token = action.payload.token;
      state.message = action.payload.message;
      state.isAuthenticated = true;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(userLogout.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.token = null;
      state.message = action.payload.message;
      state.isAuthenticated = false;
    });
    builder.addCase(userLogout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default authRegisterSlice.reducer;
