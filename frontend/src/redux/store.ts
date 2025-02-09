import { configureStore, Store } from "@reduxjs/toolkit";
import qnareducer from "./slices/qnaslice";

export const store:Store = configureStore({
  reducer: {
    qna: qnareducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
