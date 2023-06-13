import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../slices/counterSlice";
import contactReducer from "../slices/contactSlice";
import workReducer from "../slices/workSlice";

export const store = configureStore({
  reducer: {
    // -----test-----
    counter: counterReducer,

    //-----real implementation-----
    contact: contactReducer,
    work: workReducer,
  },
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
