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
  stage_4: { work: any[]; project: any[]; skill: any[] };
  display: { match_sentence: string; count: number }[];
  force_to_update: any;
}

const initialState: resumeState = {
  switch: "Contact",
  match_skill: [],
  switch_Statistic: false,
  control_highlight_dsiplay: true,
  stage_4: { work: [], project: [], skill: [] },
  display: [],
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
      const { index_1st, Description, whichSection, index_2nd } =
        action.payload;

      if (whichSection === "work") {
        //find the EXISTed target
        const check = state.stage_4.work.find(
          (each) => each.index_1st === index_1st && each.index_2nd === index_2nd
        );
        if (check) {
          check.JobDescription = Description;
          return;
        }
        state.stage_4.work.push({
          index_1st: index_1st,
          index_2nd: index_2nd,
          JobDescription: Description,
        });
      }

      if (whichSection === "project") {
        //find the EXISTed target
        const check = state.stage_4.project.find(
          (each) => each.index_1st === index_1st && each.index_2nd === index_2nd
        );
        if (check) {
          check.ProjectDescription = Description;
          return;
        }
        state.stage_4.project.push({
          index_1st: index_1st,
          index_2nd: index_2nd,
          ProjectDescription: Description,
        });
      }

      if (whichSection === "skill") {
        //find the EXISTed target
        const check = state.stage_4.skill.find(
          (each) => each.index_1st === index_1st && each.index_2nd === index_2nd
        );
        if (check) {
          check.SkillDescription = Description;
          return;
        }
        state.stage_4.skill.push({
          index_1st: index_1st,
          SkillDescription: Description,
        });
      }
    },
    add_display: (state, action) => {
      let array = state.display.map(
        (each): { match_sentence: string; count: number } =>
          each?.match_sentence
      );

      if (array.includes(action.payload) === false) {
        state.display.push({ match_sentence: action.payload, count: 0 });
      }
      if (array.includes(action.payload) === true) {
        let target = state.display?.find(
          (each): { match_sentence: string; count: number } =>
            each.match_sentence === action.payload
        );
        // target?.count = target?.count + 1;
        if (target) {
          target.count = target.count + 1;
          console.log(target.count);
        }
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
  add_display,
  FORCE_to_UPDATE,
} = analyseSlice.actions;
export default analyseSlice.reducer;
