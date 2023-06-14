import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SkillsState {
  index: number;
  term: string;
  skill: { skillIndex: number; skill: string }[];
}

const initialState: SkillsState[] = [];

const awardSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    addterm: (state, action) => {
      state.push(action.payload);
    },
    editTermName: (state, action) => {
      const { index, term } = action.payload;
      const Term = state.find((each) => each.index === index);
      if (Term) {
        Term.term = term;
      }
    },

    addskill: (state, action) => {
      const { index, skill } = action.payload;
      const Term = state.find((each) => each.index === index);

      if (Term) {
        if (Term.skill === undefined) {
          Term.skill = [];
        }
        Term.skill.push({
          skillIndex: Term.skill.length,
          skill: skill,
        });
      }
    },
    editSkillName: (state, action) => {
      const { index, skillIndex, skill } = action.payload;
      const Term = state.find((each) => each.index === index);
      if (Term) {
        console.log(current(Term.skill));
        const Skill = Term.skill.find(
          (each) => each.skillIndex === skillIndex
        );
        if (Skill) {
          Skill.skill = skill;
        }
      }
    },
  },
});

export const { addterm, editTermName, addskill, editSkillName } =
  awardSlice.actions;
export default awardSlice.reducer;
