import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ControlState {
  Layout: string;
  API_KEY: string;
  preview: { matches: string[]; unmatches: string[]; img: string };
  job_details: any;
  search: { index: string; input: string | null }[];
}

const initialState: ControlState = {
  Layout: "user",
  API_KEY: "",
  preview: { matches: [], unmatches: [], img: "" },
  job_details: { job_position: "", company_name: "", website: "" },
  search: [],
};

const controlSlice = createSlice({
  name: "control",
  initialState,
  reducers: {
    cleanUp_Control_redux: () => initialState,

    editAPI_KEY: (state, action: PayloadAction<string>) => {
      state.API_KEY = action.payload;
    },
    editLayout: (state, action: PayloadAction<string>) => {
      state.Layout = action.payload;
    },
    editPreview: (state, action: PayloadAction<any>) => {
      const { matches, unmatches, img, job_details }: any = action.payload;
      console.log(matches);
      if (matches) {
        state.preview.matches = matches;
      }
      if (unmatches) {
        state.preview.unmatches = unmatches;
      }
      if (img) {
        state.preview.img = img;
      }
      if (job_details) {
        state.job_details.job_position = job_details.job_position;
        state.job_details.company_name = job_details.company_name;
        state.job_details.website = job_details.website;
      }
    },
    addSearchBar_redux: (state, action) => {
      state.search.push(action.payload);
    },
    editSearch: (
      state,
      action: PayloadAction<{ input: string; index: string }>
    ) => {
      const { index, input } = action.payload;
      const Search = state.search.find((each) => each.index === index);
      if (Search) {
        Search.input = input;
      }
      // console.log("input: " + input);
    },
  },
});

export const {
  editLayout,
  editAPI_KEY,
  editPreview,
  editSearch,
  addSearchBar_redux,
} = controlSlice.actions;
export default controlSlice.reducer;
