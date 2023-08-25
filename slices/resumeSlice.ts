import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SkillsState } from "./skillsSlice";
import { Skill_interface, Stage_3_skill } from "@/utils/interfaces";

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
  hover_des: string;
  force_to_update: any;
  years_in_skill_show: { isSwitch: boolean; description: "" }[];
}

const initialState: resumeState = {
  switch: "Contact",
  match_skill: [],
  switch_Statistic: false,
  control_highlight_dsiplay: true,
  stage_4: { work: [], project: [], skill: [] },
  display: [],
  hover_des: "",
  force_to_update: "",
  years_in_skill_show: [],
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
      const { index_1st, Description, whichSection, index_2nd, Techniques } =
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
          Techniques: Techniques,
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
    init_display: (state, action) => {
      const { sentence } = action.payload;
      let target = state.display.find(
        (each: { match_sentence: string; count: number }) =>
          each?.match_sentence === sentence
      );
      if (!target) {
        state.display.push({ match_sentence: sentence, count: 0 });
      }
    },

    add_display: (state, action) => {
      const { sentence, from } = action.payload;

      let target = state.display.find(
        (each: { match_sentence: string; count: number }) =>
          each?.match_sentence === sentence
      );

      switch (from) {
        case "unmatches":
          if (target) {
            null;
          }
          if (!target) {
            state.display.push({ match_sentence: sentence, count: 0 });
          }
          return;
        case "matches":
          if (target) {
            target.count = target.count + 1;
          }
          if (!target) {
            state.display.push({ match_sentence: sentence, count: 1 });
          }
          return;
      }
    },
    remove_display: (state, action) => {
      const { sentence, from } = action.payload;

      let target = state.display?.find(
        (each: { match_sentence: string; count: number }) =>
          each?.match_sentence === sentence
      );
      if (target) {
        target.count = target?.count - 1;
      }
    },
    cleanUp_display_redux: (state) => {
      state.display = [];
    },
    on_hover_des: (state, action) => {
      state.hover_des = action.payload;
    },
    leave_hover_des: (state) => {
      state.hover_des = "";
    },
    FORCE_to_UPDATE: (state, action) => {
      state.force_to_update = action.payload;
    },
    Switc_years_in_skill_show: (state, action) => {
      const { isSwitch, description } = action.payload;

      let target = state.years_in_skill_show?.find(
        (each: { isSwitch: boolean; description: string }) =>
          each?.description === description
      );

      if (target === null || target === undefined) {
        state.years_in_skill_show.push({
          isSwitch: isSwitch,
          description: description,
        });
      }

      if (target) {
        target.isSwitch = isSwitch;
      }
    },
  },
});

export const {
  switch_resumeComponents,
  add_skill_match,
  switch_Statistic,
  control_Highlight_Dsiplay,
  editResume_stage_4,
  init_display,
  add_display,
  remove_display,
  cleanUp_display_redux,
  on_hover_des,
  leave_hover_des,
  FORCE_to_UPDATE,
  Switc_years_in_skill_show,
} = analyseSlice.actions;
export default analyseSlice.reducer;
