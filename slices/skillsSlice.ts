import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SkillsState {
  index: string;
  term: string;
  Skill_list: { skillIndex: any; skill: string }[];
}

const initialState: SkillsState[] = [];

const awardSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    cleanUp_Skill_redux: (state) => {
      state = initialState;
    },
    initialize_SkillData: (state, action: PayloadAction<string>) => {
      const { index, term, Skill_list }: any = action.payload;
      console.log("Skill_list: " + JSON.stringify(Skill_list, null, 1));
      //if the "stage_3" data exists
      let stage_3_exist = false;
      //get the index from "stage_3"
      let match_index: any[] = [];
      //clone the data of ORIGINAL "Skill_list" data
      let arrayForSort: any[] = [];
      //REARRANGE of "Skill_list"
      let rearrange_Skill_list;

      if (Skill_list.length !== 0) {
        if (typeof window !== "undefined") {
          if (localStorage.getItem("stage_3")) {
            stage_3_exist = true;
            const newObject: any = window.localStorage.getItem("stage_3");
            JSON.parse(newObject)?.map(
              (each: any) =>
                each.match_index_2nd && match_index.push(each.match_index_2nd)
            );

            rearrange_Skill_list = arrayForSort
              .concat(Skill_list)
              .sort((a, b) => (match_index.includes(a.skillIndex) ? -1 : 1));
          }
        }
      }
      //set the data format
      let Data = {
        index: index,
        term: term,
        Skill_list: stage_3_exist ? rearrange_Skill_list : Skill_list,
      };
      //push the tidied up data into state
      state.push(Data);
    },
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
        const Skill = Term.Skill_list.find(
          (each) => each.skillIndex === skillIndex
        );
        if (Skill) {
          Skill.skill = skill;
        }
      }
    },
  },
});

export const {
  cleanUp_Skill_redux,
  initialize_SkillData,
  addTerm,
  deleteTerm,
  editTermName,
  addSkill,
  deleteSkill,
  editSkillName,
} = awardSlice.actions;
export default awardSlice.reducer;
