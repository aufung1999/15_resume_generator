import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface EducationState {
  index: string;
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
    initialize_EducationData: (state, action: PayloadAction<string>) => {
      const {
        index,
        SchoolName,
        Degree,
        Subject,
        current,
        StartDate,
        EndDate,
      }: any = action.payload;
      //set the data format
      let Data = {
        index: index,
        SchoolName: SchoolName,
        Degree: Degree,
        Subject: Subject,
        current: current,
        StartDate: StartDate,
        EndDate: EndDate,
      };
      //push the tidied up data into state
      state.push(Data);
    },
    addEducation: (state, action) => {
      state.push(action.payload);
    },
    deleteEducation: (state, action) => {
      const { index } = action.payload;
      // console.log("Redux index: " + index);

      state.splice(
        state.findIndex((arrow) => arrow.index === index),
        1
      );
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
  initialize_EducationData,
  addEducation,
  deleteEducation,
  editSchoolName,
  editDegree,
  editSubject,
  currentStudying,
  editStartDate,
  editEndDate,
} = educationSlice.actions;
export default educationSlice.reducer;
