import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface WorkExpState {
  index: number;
  CompanyName: string;
  Position: string;
  current:boolean,
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
      const WorkExp = state.find((each) => each.index === index);
      if (WorkExp) {
        WorkExp.CompanyName = CompanyName;
      }
    },
    editPosition: (state, action) => {
      const { index, Position } = action.payload;
      let WorkExp = state.find((each) => each.index === index);
      if (WorkExp) {
        WorkExp.Position = Position;
      }
    },
    currentWorking: (state, action) => {
      const { index, current } = action.payload;
      let WorkExp = state.find((each) => each.index === index);
      if (WorkExp) {
        WorkExp.current = current;
      }
    },
    editStartDate: (state, action) => {
      const { index, StartDate } = action.payload;
      let WorkExp = state.find((each) => each.index === index);
      if (WorkExp) {
        WorkExp.StartDate = StartDate;
      }
    },
    editEndDate: (state, action) => {
      const { index, EndDate } = action.payload;
      let WorkExp = state.find((each) => each.index === index);
      if (WorkExp) {
        WorkExp.EndDate = EndDate;
      }
    },
    editJobDescription: (state, action) => {
      const { index, JobDescription } = action.payload;
      let WorkExp = state.find((each) => each.index === index);
      if (WorkExp) {
        WorkExp.JobDescription = JobDescription;
      }
    },
  },
});

export const {
  addWorkExp,
  editCompanyName,
  editPosition,
  currentWorking,
  editStartDate,
  editEndDate,
  editJobDescription,
} = workSlice.actions;
export default workSlice.reducer;
