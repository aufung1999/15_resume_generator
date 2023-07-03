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
}

const initialState: resumeState = { switch: "Contact", match_skill: [] };

const analyseSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    switch_resumeComponents: (state, action) => {
      const { select } = action.payload;
      state.switch = select;
    },
    add_skill_match: (state, action) => {
      const { match } = action.payload;
      state.match_skill.push(match);
    },
  },
});

export const { switch_resumeComponents,add_skill_match } = analyseSlice.actions;
export default analyseSlice.reducer;
