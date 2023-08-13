import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ProjectState {
  index: string;
  ProjectName: string;
  Techniques?: string;
  ProjectDescription: { rowIndex: string; Row?: string }[];
  display_in_Resume?: boolean;
}

const initialState: ProjectState[] = [];

const projectsSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    cleanUp_Project_redux: () => initialState,
    initialize_ProjectData: (state, action: PayloadAction<ProjectState>) => {
      const { index, ProjectName, Techniques, ProjectDescription } =
        action.payload;
      //if the "stage_3" data exists
      let stage_3_exist = false;
      //get the index from "stage_3"
      let match_index: any[] = [];

      if (typeof window !== "undefined") {
        if (localStorage.getItem("stage_3")) {
          stage_3_exist = true;
          const stage_3_ls: any = window.localStorage.getItem("stage_3");
          JSON.parse(stage_3_ls)?.map((each: any) => {
            //Check the technique
            each.match_index_1st === index &&
              // no:1
              match_index.push({ match_index_1st: index }),
              //Check the description
              ProjectDescription?.map(
                (item: { Row?: string | undefined; rowIndex: string }) =>
                  each.match_index_1st === index &&
                  each.match_index_2nd === item.rowIndex &&
                  match_index.push({
                    match_index_1st: index,
                    match_index_2nd: item.rowIndex,
                  })
              );
          });

          //set the data format
          let Data = {
            index: index,
            ProjectName: ProjectName,
            Techniques: Techniques,
            ProjectDescription: ProjectDescription,
            display_in_Resume: false,
          };
          //-------------------------------------------------------------------------------
          //Condition add to array,
          //"unshift" is to add at the beginning:
          //"push" is to add at the end

          // console.log(match_index);
          ProjectDescription?.map(
            (each: { Row?: string | undefined; rowIndex: string }) =>
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
      }
    },
    addProject: (state, action) => {
      const { index } = action.payload;
      state.push(action.payload);
    },
    deleteProject: (state, action) => {
      const { index } = action.payload;
      // console.log("Redux index: " + index);

      state.splice(
        state.findIndex((arrow) => arrow.index === index),
        1
      );
    },
    editProjectName: (state, action) => {
      const { index, ProjectName } = action.payload;
      const Project = state.find((each) => each.index === index);
      if (Project) {
        Project.ProjectName = ProjectName;
      }
    },
    editTechniques: (state, action) => {
      const { index, Techniques } = action.payload;
      let Project = state.find((each) => each.index === index);
      if (Project) {
        Project.Techniques = Techniques;
      }
    },
    addrow: (state, action) => {
      const { index, rowIndex } = action.payload;
      let Project = state.find((each) => each.index === index);
      if (Project) {
        if (Project.ProjectDescription === undefined) {
          Project.ProjectDescription = [];
        }
        Project.ProjectDescription.push({ rowIndex: rowIndex });
      }
    },
    deleterow: (state, action) => {
      const { index, rowIndex } = action.payload;
      let Project = state.find((each) => each.index === index);
      if (Project) {
        if (Project.ProjectDescription === undefined) {
          // intialize the state of ProjectDescription
          Project.ProjectDescription = [];
        }
        // Project.ProjectDescription.push({ rowIndex: rowIndex });
        Project.ProjectDescription.splice(
          Project.ProjectDescription.findIndex(
            (arrow) => arrow.rowIndex === rowIndex
          ),
          1
        );
      }
    },
    editProjectDescription: (state, action) => {
      const { index, rowIndex, Row } = action.payload;
      let Project = state.find((each) => each.index === index);
      if (Project) {
        if (Project.ProjectDescription === undefined) {
          Project.ProjectDescription = [];
        }

        const target_row = Project.ProjectDescription.find(
          (each) => each.rowIndex === rowIndex
        );
        if (target_row) {
          target_row.Row = Row;
        }
      }
    },
    switch_display_in_Resume: (state, action) => {
      const { index, display_in_Resume } = action.payload;
      const Project = state.find((each) => each.index === index);
      if (Project) {
        Project.display_in_Resume = display_in_Resume;
      }
    },
    drag_drop: (state, action) => {
      const { result } = action.payload;
      // console.log("result: " + JSON.stringify(result.draggableId, null, 1));
      // console.log("result: " + JSON.stringify(result.source.index, null, 1));
      // console.log("state: " + JSON.stringify(state, null, 1));
      const [reorderedItem] = state.splice(result.source.index, 1);
      state.splice(result.destination.index, 0, reorderedItem);
    },
  },
});

export const {
  cleanUp_Project_redux,
  initialize_ProjectData,
  addProject,
  deleteProject,
  editProjectName,
  editTechniques,
  addrow,
  deleterow,
  editProjectDescription,
  switch_display_in_Resume,
  drag_drop,
} = projectsSlice.actions;
export default projectsSlice.reducer;
