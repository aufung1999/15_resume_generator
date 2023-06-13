import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface WorkExpState {
  index: number;
  CompanyName: string;
  Position: string;
  StartDate: string;
  EndDate: string;
  JobDescription: string;
}

const initialState: WorkExpState[] = [];

const workSlice = createSlice({
  name: "work",
  initialState,
  reducers: {
    addWorkExp: (state, action) => {
      state.push(action.payload);
    },
    editCompanyName: (state, action) => {
      const { index, CompanyName } = action.payload;
      let WorkExp = state.find((each) => each.index === index);
      if (WorkExp) {
        WorkExp.CompanyName = CompanyName
      }
    },
    editPosition: (state, action) => {
      const { index, Position } = action.payload;
      let WorkExp = state.find((each) => each.index === index);
      const merge = { ...WorkExp, Position: Position };
      return [...state, merge];
    },
    editStartDate: (state, action) => {
      const { index, StartDate } = action.payload;
      let WorkExp = state.find((each) => each.index === index);
      const merge = { ...WorkExp, StartDate: StartDate };
      return [...state, merge];
    },
    editEndDate: (state, action) => {
      const { index, EndDate } = action.payload;
      let WorkExp = state.find((each) => each.index === index);
      const merge = { ...WorkExp, EndDate: EndDate };
      return [...state, merge];
    },
    editJobDescription: (state, action) => {
      const { index, JobDescription } = action.payload;
      let WorkExp = state.find((each) => each.index === index);
      const merge = { ...WorkExp, JobDescription: JobDescription };
      return [...state, merge];
    },
  },
});

export const {
  addWorkExp,
  editCompanyName,
  editPosition,
  editStartDate,
  editEndDate,
  editJobDescription,
} = workSlice.actions;
export default workSlice.reducer;
