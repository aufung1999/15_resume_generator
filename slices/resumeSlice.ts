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

export interface resumeState {
  switch: string;
  match_skill: [];
  switch_Statistic: boolean;
  control_highlight_dsiplay: boolean;
}

const initialState: resumeState = {
  switch: "Contact",
  match_skill: [],
  switch_Statistic: false,
  control_highlight_dsiplay: true,
};

const analyseSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    switch_resumeComponents: (state, action) => {
      const { select } = action.payload;
      state.switch = select;
    },
    add_skill_match: (state, action) => {
      const { match }: { match: anything } = action.payload;
      state.match_skill.push(match);
    },
    switch_Statistic: (state, action) => {
      const { select } = action.payload;
      state.switch_Statistic = !select;
    },
    control_Highlight_Dsiplay: (state, action) => {
      const { select } = action.payload;
      state.control_highlight_dsiplay = !select;
    },
  },
});

export const {
  switch_resumeComponents,
  add_skill_match,
  switch_Statistic,
  control_Highlight_Dsiplay,
} = analyseSlice.actions;
export default analyseSlice.reducer;
