import { configureStore, Store } from "@reduxjs/toolkit";
import qnareducer from "./slices/qnaslice";
import userreducer from "./slices/user-slice";

export const store: Store = configureStore({
  reducer: {
    qna: qnareducer,
    user: userreducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
