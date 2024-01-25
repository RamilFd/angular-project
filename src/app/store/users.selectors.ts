import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State, USERS_KEY } from "./users.reducers";


export const selectUsers = createFeatureSelector<State>(USERS_KEY);

export const selectUsersList = createSelector(
  selectUsers,
  (state: State) => state.users
);



