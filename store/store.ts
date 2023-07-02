import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../slices/counterSlice";
import contactReducer from "../slices/contactSlice";
import workReducer from "../slices/workSlice";
import educationReducer from "../slices/educationSlice";
import awardReducer from "../slices/awardSlice";
import skillsReducer from "../slices/skillsSlice";
import objectiveReducer from "@/slices/objectiveSlice";
import projectsReducer from "@/slices/projectsSlice";
import analyseReducer from "@/slices/analyseSlice";
import resumeReducer from "@/slices/resumeSlice";

export const store = configureStore({
  reducer: {
    // -----test-----
    counter: counterReducer,

    //-----real implementation-----
    contact: contactReducer,
    work: workReducer,
    education: educationReducer,
    award: awardReducer,
    skills: skillsReducer,
    objectives: objectiveReducer,
    projects: projectsReducer,

    //----Analyse----
    analyse: analyseReducer,
    //----Resume Generator Tab----
    resume: resumeReducer,
  },
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
