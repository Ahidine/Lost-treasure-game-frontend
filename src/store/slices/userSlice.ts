import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Treasure, User } from "../../types/user";
import { UserService } from "../../services/userService";
const userService = new UserService();

const initialState: User = {
  id: null,
  name: null,
  email: null,
  treasures: [],
  isAuthenticated: false,
  loading: false,
  error: null,
  token: null,
};

export const register = createAsyncThunk(
  "user/register",
  async (
    {
      name,
      email,
      password,
    }: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await userService.registerUser(name, email, password);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await userService.loginUser(email, password);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const addRewards = createAsyncThunk(
  "user/rewards",
  async (
    { id, treasure }: { id: string; treasure: Treasure },
    { rejectWithValue }
  ) => {
    try {
      const data = await userService.addTreasure(id, treasure);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.id = null;
      state.name = null;
      state.email = null;
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("userToken");
      localStorage.removeItem("userSession");
    },
    loadSession: (state) => {
      const session = localStorage.getItem("userSession");
      if (session) {
        return JSON.parse(session);
      }
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.id = action.payload.user.id;
        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
        state.token = action.payload.token;
        state.treasures = action.payload.user.treasures;
        localStorage.setItem("userSession", JSON.stringify(state));
        localStorage.setItem("userToken", action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.id = action.payload.user.id;
        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
        state.token = action.payload.token;
        state.treasures = action.payload.user.treasures;
        localStorage.setItem("userSession", JSON.stringify(state));
        localStorage.setItem("userToken", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
      })

      .addCase(addRewards.pending, (state) => {
        state.loading = true;
      })
      .addCase(addRewards.fulfilled, (state, action) => {
        state.loading = false;
        state.treasures = action.payload;
        localStorage.setItem("userSession", JSON.stringify(state));
      })
      .addCase(addRewards.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
      });
  },
});

export const { logout, loadSession } = userSlice.actions;

export default userSlice.reducer;
