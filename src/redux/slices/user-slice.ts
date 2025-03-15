import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  loading: boolean;
  isUserLoggedIn: boolean;
  userDetails: any;
  isUserAuthenticated: boolean;
  error: string | null;
}

const initialState: UserState = {
  loading: false,
  isUserLoggedIn: false,
  userDetails: [],
  isUserAuthenticated: false,
  error: null,
};

export const handleLogin = createAsyncThunk(
  "users/handleLogin",
  async ({ userName, password }: { userName: string; password: string }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/v1/auth/sign-in`,
      {
        email: userName,
        password,
      },
      { withCredentials: true }
    );
    return response.data;
  }
);

export const handleLogOut = createAsyncThunk("users/handleLogOut", async () => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/v1/auth/sign-out`,
    { withCredentials: true }
  );
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetAll(_state) {
      _state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleLogin.fulfilled, (state, action: PayloadAction<any>) => {
        state.userDetails = action.payload;
        state.isUserLoggedIn = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user details";
      })
      .addCase(handleLogOut.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleLogOut.fulfilled, (state) => {
        state.isUserLoggedIn = false;
        state.loading = false;
        state.error = null;
      })
      .addCase(handleLogOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to log out";
      });
  },
});

export const { resetAll } = userSlice.actions;
export default userSlice.reducer;
