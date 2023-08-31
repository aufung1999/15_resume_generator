import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SkillsState {
  index: string;
  term: string;
  Skill_list: { skillIndex: any; skill: string; years?: number }[];
}

export interface skill {
  skillIndex: any;
  skill: string;
  years?: number | any;
}

const initialState: SkillsState[] = [];

const awardSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    cleanUp_Skill_redux: () => initialState,
    initialize_SkillData: (state, action: PayloadAction<SkillsState>) => {
      const { index, term, Skill_list, years }: any = action.payload;
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
            const stage_3_ls: any = localStorage.getItem("stage_3");
            JSON.parse(stage_3_ls)?.map(
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
        Skill_list: stage_3_exist
          ? //add years property to each skill
            rearrange_Skill_list?.map((each: any) => ({
              ...each,
              years: each.years ? each.years : 0,
            }))
          : Skill_list?.map((each: any) => ({
              ...each,
              years: each.years ? each.years : 0,
            })),
      };
      //push the tidied up data into state
      state.push(Data);
    },
    update_revalidation: (state, action: PayloadAction<SkillsState>) => {
      const { index, term, Skill_list }: any = action.payload;
      const Term: any = state.find((each) => each.index === index);
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
            const stage_3_ls: any = localStorage.getItem("stage_3");
            JSON.parse(stage_3_ls)?.map(
              (each: any) =>
                each.match_index_2nd && match_index.push(each.match_index_2nd)
            );

            rearrange_Skill_list = arrayForSort
              .concat(Skill_list)
              .sort((a, b) => (match_index.includes(a.skillIndex) ? -1 : 1));
          }
          if (Term) {
            Term.Skill_list = rearrange_Skill_list;
          }
        }
      }
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

    addYears: (state, action) => {
      const { index, skillIndex, years } = action.payload;
      const Term = state.find((each) => each.index === index);
      if (Term) {
        const Skill = Term.Skill_list.find(
          (each) => each.skillIndex === skillIndex
        );
        if (Skill) {
          Skill.years = years;
        }

        //Sort the order after the Skill.years Change
        Term.Skill_list?.sort((a: skill, b: skill) =>
          a?.years > b?.years ? -1 : 1
        );
      }
    },
    subtractYears: (state, action) => {
      const { index, skillIndex, years } = action.payload;
      const Term = state.find((each) => each.index === index);
      if (Term) {
        console.log(current(Term.Skill_list));
        const Skill = Term.Skill_list.find(
          (each) => each.skillIndex === skillIndex
        );
        if (Skill) {
          Skill.years = years;
        }
        //Sort the order after the Skill.years Change
        Term.Skill_list?.sort((a: skill, b: skill) =>
          a?.years > b?.years ? -1 : 1
        );
      }
    },
  },
});

export const {
  cleanUp_Skill_redux,
  initialize_SkillData,
  update_revalidation,
  addTerm,
  deleteTerm,
  editTermName,
  addSkill,
  deleteSkill,
  editSkillName,
  addYears,
  subtractYears,
} = awardSlice.actions;
export default awardSlice.reducer;
