import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface EducationState {
  index: number;
  SchoolName: string;
  Degree: string;
  Subject: string;
  current: boolean;
  StartDate: string;
  EndDate: string;
}

const initialState: EducationState[] = [];

const educationSlice = createSlice({
  name: "education",
  initialState,
  reducers: {
    addEducation: (state, action) => {
      state.push(action.payload);
    },

    editSchoolName: (state, action) => {
      const { index, SchoolName } = action.payload;
      const Education = state.find((each) => each.index === index);
      if (Education) {
        Education.SchoolName = SchoolName;
      }
    },
    editDegree: (state, action) => {
      const { index, Degree } = action.payload;
      let Education = state.find((each) => each.index === index);
      if (Education) {
        Education.Degree = Degree;
      }
    },
    editSubject: (state, action) => {
      const { index, Subject } = action.payload;
      let Education = state.find((each) => each.index === index);
      if (Education) {
        Education.Subject = Subject;
      }
    },
    currentStudying: (state, action) => {
      const { index, current } = action.payload;
      let Education = state.find((each) => each.index === index);
      if (Education) {
        Education.current = current;
      }
    },
    editStartDate: (state, action) => {
      const { index, StartDate } = action.payload;
      let Education = state.find((each) => each.index === index);
      if (Education) {
        Education.StartDate = StartDate;
      }
    },
    editEndDate: (state, action) => {
      const { index, EndDate } = action.payload;
      let Education = state.find((each) => each.index === index);
      if (Education) {
        Education.EndDate = EndDate;
      }
    },
  },
});

export const {
  addEducation,
  editSchoolName,
  editDegree,
  editSubject,
  currentStudying,
  editStartDate,
  editEndDate,
} = educationSlice.actions;
export default educationSlice.reducer;
