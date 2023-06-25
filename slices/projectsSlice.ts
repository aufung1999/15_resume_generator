import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ProjectState {
  index: string;
  ProjectName: string;
  Techniques?: string;
  ProjectDescription: { rowIndex: string; Row?: string }[];
}

const initialState: ProjectState[] = [];

const projectsSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    initialize_ProjectData: (state, action: PayloadAction<string>) => {
      const { index, ProjectName, Techniques, ProjectDescription }: any =
        action.payload;
      //set the data format
      let Data = {
        index: index,
        ProjectName: ProjectName,
        Techniques: Techniques,
        ProjectDescription: ProjectDescription,
      };
      //push the tidied up data into state
      state.push(Data);
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
  },
});

export const {
  initialize_ProjectData,
  addProject,
  deleteProject,
  editProjectName,
  editTechniques,
  addrow,
  deleterow,
  editProjectDescription,
} = projectsSlice.actions;
export default projectsSlice.reducer;
