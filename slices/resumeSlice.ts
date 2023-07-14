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
  match_skill: any[];
  switch_Statistic: boolean;
  control_highlight_dsiplay: boolean;
  stage_4: { work: any[]; project: any[] };
  force_to_update: any;
}

const initialState: resumeState = {
  switch: "Contact",
  match_skill: [],
  switch_Statistic: false,
  control_highlight_dsiplay: true,
  stage_4: { work: [], project: [] },
  force_to_update: "",
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
    editResume_stage_4: (state, action) => {
      const { index_1st, JobDescription, whichSection, index_2nd } =
        action.payload;

      if (whichSection === "work") {
        //find the EXISTed target
        const check = state.stage_4.work.find(
          (each) => each.index_1st === index_1st && each.index_2nd === index_2nd
        );
        if (check) {
          check.JobDescription = JobDescription;
          return;
        }
        state.stage_4.work.push({
          index_1st: index_1st,
          index_2nd: index_2nd,
          JobDescription: JobDescription,
        });
      }
    },
    FORCE_to_UPDATE: (state, action) => {
      state.force_to_update = action.payload;
    },
  },
});

export const {
  switch_resumeComponents,
  add_skill_match,
  switch_Statistic,
  control_Highlight_Dsiplay,
  editResume_stage_4,
  FORCE_to_UPDATE,
} = analyseSlice.actions;
export default analyseSlice.reducer;
