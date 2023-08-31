import { Stage_3_work } from "@/utils/interfaces";
import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface WorkExpState {
  index: string;
  CompanyName: string;
  Position: string;
  current?: boolean;
  StartDate: string;
  EndDate?: string;
  JobDescription: { rowIndex: string; Row?: string; HTML?: string }[];
  display_in_Resume?: boolean;
}
export interface JobDescription {
  rowIndex: string;
  Row?: string;
  HTML?: string;
}

const initialState: WorkExpState[] = [];

const workSlice = createSlice({
  name: "work",
  initialState,
  reducers: {
    cleanUp_Work_redux: () => initialState,
    initialize_WorkData: (state, action: PayloadAction<WorkExpState>) => {
      const {
        index,
        CompanyName,
        Position,
        current,
        StartDate,
        EndDate,
        JobDescription,
      }: WorkExpState = action.payload;

      //if the "stage_3" data exists
      let stage_3_exist = false;
      //get the index from "stage_3"
      let match_index: any[] = [];

      if (typeof window !== "undefined") {
        //localStorage.getItem("stage_3") Exisit
        if (localStorage.getItem("stage_3")) {
          stage_3_exist = true;
          const stage_3_ls: any = localStorage.getItem("stage_3");
          JSON.parse(stage_3_ls)?.map((each: Stage_3_work) => {
            each.match_index_1st === index &&
              // no:1
              match_index.push({ match_index_1st: index }),
              JobDescription?.map((item: JobDescription) => {
                each.match_index_1st === index &&
                  each.match_index_2nd === item.rowIndex &&
                  match_index.push({
                    match_index_1st: index,
                    match_index_2nd: item.rowIndex,
                  }),
                  item.HTML === undefined || item.HTML === null
                    ? (item.HTML = item.Row)
                    : null;
              });
          });

          //set the data format
          let Data = {
            index: index,
            CompanyName: CompanyName,
            Position: Position,
            current: current,
            StartDate: StartDate,
            EndDate: EndDate,
            JobDescription: JobDescription,
            display_in_Resume: false,
          };
          //-------------------------------------------------------------------------------
          //Condition add to array,
          //"unshift" is to add at the beginning:
          //"push" is to add at the end

          // console.log(match_index);
          JobDescription?.map((each: JobDescription) =>
            match_index?.some(
              (item: {
                match_index?: string;
                match_index_1st?: string;
                match_index_2nd?: string;
              }) =>
                // no:1
                // the reason to use "||" becuz it is "safe"
                item?.match_index_1st === index ||
                item?.match_index_2nd === each.rowIndex
            )
              ? (Data.display_in_Resume = true)
              : null
          );
          //-------------------------------------------------------------------------------
          Data?.display_in_Resume === true
            ? state.unshift(Data)
            : state.push(Data);
        }

        //localStorage.getItem("stage_3") DOES NOT Exisit----------------------------------------
        if (!localStorage.getItem("stage_3")) {
          //set the data format
          let Data = {
            index: index,
            CompanyName: CompanyName,
            Position: Position,
            current: current,
            StartDate: StartDate,
            EndDate: EndDate,
            JobDescription: JobDescription,
            display_in_Resume: false,
          };

          //-------------------------------------------------------------------------------
          state.push(Data);
        }

        //Sort By Start Date, but need convert from string -> Date
        state.map((each: WorkExpState) => new Date(each.StartDate));
        state.sort((a, b) => (a.StartDate > b.StartDate ? -1 : 1));
        state.map((each: WorkExpState) => JSON.stringify(each.StartDate));
      }
    },
    addWorkExp: (state, action) => {
      const { index } = action.payload;
      state.push(action.payload);
    },
    deleteWorkExp: (state, action) => {
      const { index } = action.payload;
      // console.log("Redux index: " + index);

      state.splice(
        state.findIndex((arrow) => arrow.index === index),
        1
      );
    },
    editCompanyName: (state, action) => {
      const { index, CompanyName } = action.payload;
      const WorkExp = state.find((each) => each.index === index);
      if (WorkExp) {
        WorkExp.CompanyName = CompanyName;
      }
    },
    editPosition: (state, action) => {
      const { index, Position } = action.payload;
      let WorkExp = state.find((each) => each.index === index);
      if (WorkExp) {
        WorkExp.Position = Position;
      }
    },
    currentWorking: (state, action) => {
      const { index, current } = action.payload;
      let WorkExp = state.find((each) => each.index === index);
      if (WorkExp) {
        WorkExp.current = current;
      }
    },
    editStartDate: (state, action) => {
      const { index, StartDate } = action.payload;
      let WorkExp = state.find((each) => each.index === index);
      if (WorkExp) {
        WorkExp.StartDate = StartDate;
      }
    },
    editEndDate: (state, action) => {
      const { index, EndDate } = action.payload;
      let WorkExp = state.find((each) => each.index === index);
      if (WorkExp) {
        WorkExp.EndDate = EndDate;
      }
    },
    addrow: (state, action) => {
      const { index, rowIndex } = action.payload;
      let WorkExp = state.find((each) => each.index === index);
      if (WorkExp) {
        if (WorkExp.JobDescription === undefined) {
          WorkExp.JobDescription = [];
        }
        WorkExp.JobDescription.push({ rowIndex: rowIndex });
      }
    },
    deleterow: (state, action) => {
      const { index, rowIndex } = action.payload;
      let WorkExp = state.find((each) => each.index === index);
      if (WorkExp) {
        if (WorkExp.JobDescription === undefined) {
          // intialize the state of JobDescription
          WorkExp.JobDescription = [];
        }
        // WorkExp.JobDescription.push({ rowIndex: rowIndex });
        WorkExp.JobDescription.splice(
          WorkExp.JobDescription.findIndex(
            (arrow) => arrow.rowIndex === rowIndex
          ),
          1
        );
      }
    },
    editJobDescription: (state, action) => {
      const { index, rowIndex, Row, HTML } = action.payload;
      let WorkExp = state.find((each) => each.index === index);
      if (WorkExp) {
        if (WorkExp.JobDescription === undefined) {
          WorkExp.JobDescription = [];
        }

        const target_row = WorkExp.JobDescription.find(
          (each) => each.rowIndex === rowIndex
        );
        if (target_row) {
          target_row.Row = Row;
          target_row.HTML = HTML;
        }
      }
    },
    switch_display_in_Resume: (state, action) => {
      const { index, display_in_Resume } = action.payload;
      const WorkExp = state.find((each) => each.index === index);
      if (WorkExp) {
        WorkExp.display_in_Resume = display_in_Resume;
      }
    },
  },
});

export const {
  cleanUp_Work_redux,
  initialize_WorkData,
  addWorkExp,
  deleteWorkExp,
  editCompanyName,
  editPosition,
  currentWorking,
  editStartDate,
  editEndDate,
  addrow,
  deleterow,
  editJobDescription,
  switch_display_in_Resume,
} = workSlice.actions;
export default workSlice.reducer;
