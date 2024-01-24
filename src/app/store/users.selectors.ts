import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State, UsersKey } from "./users.reducers";


export const selectUsers = createFeatureSelector<State>(UsersKey);

export const selectUsersList = createSelector(
  selectUsers,
  (state: State) => state.users
);



