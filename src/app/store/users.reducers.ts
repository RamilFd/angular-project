import { createReducer, on } from "@ngrx/store";
import { IUser } from "../interfaces/IUser";
import * as usersActions from "./users.actions";

export interface State {
  users: IUser[],
}

export const InitialState: State = {
  users: []
}

export const UsersKey = 'users';

export const userReducer = createReducer(
  InitialState,
  on(usersActions.loadUsersSuccess,
    (state, {users}) => {
      return {...state, users: [...state.users, ...users] }
    }),
  on(usersActions.deleteUserSuccess,
    (state, {id}) => {
      return {...state, users: [...state.users.filter(user => user.id !== id)]}
    }),
  on(usersActions.createUserSuccess,
    (state, {user}) => {
      return { ...state, users: [...state.users, user]}
    }),
  on(usersActions.editUserSuccess,
    (state, {user}) => {
      return { ...state, users: [...state.users.map((item => item.id !== user.id? item : user))]}
    })
)

