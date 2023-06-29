import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type anything =
  | number
  | string
  | boolean
  | bigint
  | symbol
  | null
  | object
  | undefined;

export interface AnalyseState {
  stage_1: string;
  stage_2: string;
  stage_3: string;
}

const initialState: AnalyseState = { stage_1: "", stage_2: "", stage_3: "" };

const analyseSlice = createSlice({
  name: "analyse",
  initialState,
  reducers: {
    editAnalyse_stage_1: (state, action) => {
      state.stage_1 = action.payload;
    },
    removeAnalyse_stage_1: (state, action: PayloadAction<anything>) => {
      state.stage_1 = "";
    },
    editAnalyse_stage_2: (state, action) => {
      state.stage_2 = action.payload;
    },
    editAnalyse_stage_3: (state, action) => {
      state.stage_3 = action.payload;
    },
  },
});

export const {
  editAnalyse_stage_1,
  removeAnalyse_stage_1,
  editAnalyse_stage_2,
  editAnalyse_stage_3,
} = analyseSlice.actions;
export default analyseSlice.reducer;
