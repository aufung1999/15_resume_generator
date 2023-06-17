import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SkillsState {
  index: string;
  term: string;
  Skill_list: { skillIndex: number; skill: string }[];
}

const initialState: SkillsState[] = [];

const awardSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    addTerm: (state, action) => {
      state.push(action.payload);
    },
    deleteTerm: (state, action) => {
      const { index } = action.payload;
      // console.log("Redux index: " + index);

      state.splice(
        state.findIndex((arrow) => arrow.index === index),
        1
      );
    },

    editTermName: (state, action) => {
      const { index, term } = action.payload;
      const Term = state.find((each) => each.index === index);
      if (Term) {
        Term.term = term;
      }
    },

    addSkill: (state, action) => {
      const { index, skill, skillIndex } = action.payload;
      const Term = state.find((each) => each.index === index);

      if (Term) {
        if (Term.Skill_list === undefined) {
          Term.Skill_list = [];
        }
        Term.Skill_list.push({
          skillIndex: skillIndex,
          skill: skill,
        });
      }
    },
    deleteSkill: (state, action) => {
      const { index, skillIndex } = action.payload;
      let Term = state.find((each) => each.index === index);
      if (Term) {
        // WorkExp.JobDescription.push({ rowIndex: rowIndex });
        Term.Skill_list.splice(
          Term.Skill_list.findIndex((arrow) => arrow.skillIndex === skillIndex),
          1
        );
      }
    },

    editSkillName: (state, action) => {
      const { index, skillIndex, skill } = action.payload;
      const Term = state.find((each) => each.index === index);
      if (Term) {
        console.log(current(Term.Skill_list));
        const Skill = Term.Skill_list.find((each) => each.skillIndex === skillIndex);
        if (Skill) {
          Skill.skill = skill;
        }
      }
    },
  },
});

export const {
  addTerm,
  deleteTerm,
  editTermName,
  addSkill,
  deleteSkill,
  editSkillName,
} = awardSlice.actions;
export default awardSlice.reducer;
