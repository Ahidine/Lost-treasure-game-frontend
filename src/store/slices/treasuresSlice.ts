import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { TreasureService } from "../../services/treasureService";

const treasureService = new TreasureService();

export interface Treasure {
  id: string;
  solution: string;
  hint: string | null;
  position: number;
  name: string;
  riddle: string;
}

interface TreasuresState {
  treasures: Treasure[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TreasuresState = {
  treasures: [],
  status: "idle",
  error: null,
};

export const fetchTreasures = createAsyncThunk(
  "treasures/fetchTreasures",
  async (_, { rejectWithValue }) => {
    try {
      const treasures = await treasureService.getTreasures();
      return treasures;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const treasuresSlice = createSlice({
  name: "treasures",
  initialState,
  reducers: {
    addTreasure: (state, action: PayloadAction<Treasure>) => {
      state.treasures.push(action.payload);
    },
    resetTreasures: (state) => {
      state.treasures = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTreasures.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchTreasures.fulfilled,
        (state, action: PayloadAction<Treasure[]>) => {
          state.status = "succeeded";
          state.treasures = action.payload;
        }
      )
      .addCase(fetchTreasures.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { addTreasure, resetTreasures } = treasuresSlice.actions;
export default treasuresSlice.reducer;
