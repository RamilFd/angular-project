import { createReducer, on } from "@ngrx/store";
import { IUser } from "../interfaces/IUser";
import * as usersActions from "./users.actions";

export interface State {
  users: IUser[],
  loading: boolean,
  error: any
}

export const InitialState: State = {
  users: [],
  loading: false,
  error: null
}

export const USERS_KEY = 'users';

export const userReducer = createReducer(
  InitialState,
  on(usersActions.loadUsers,
    (state) => ({...state, loading: true })),

  on(usersActions.loadUsersSuccess,
    (state, {users}) => ({...state, users: users, loading: false})),
      //return {...state, users: [...state.users, ...users] }

  on(usersActions.loadUsersFailed,
    (state, { error }) => ({...state, error: error, loading: false })),

  on(usersActions.deleteUser,
    (state, {id}) => ({ ...state, loading: true })),

  on(usersActions.deleteUserSuccess,
    (state, {id}) => ({ ...state, users: [...state.users.filter(user => user.id !== id)], loading: false})),
      // const usersApdated = state.users.filter(user => user.id !== id)
      // return {...state, users: usersApdated}

  on(usersActions.deleteUserFailed,
    (state, {error}) => ({ ...state, loading: false, error: error})),

  on(usersActions.createUser,
    (state, {user}) => ({ ...state, loading: true })),

  on(usersActions.createUserSuccess,
    (state, {user}) => ({ ...state, users: [...state.users, user], loading: false })),

  on(usersActions.createUserFailed,
    (state, {error}) => ({ ...state, loading: false, error: error })),

  on(usersActions.editUser,
    (state, {user}) => ({ ...state, loading: true })),

  on(usersActions.editUserSuccess,
    (state, {user}) => ({
      ...state,
      users: [...state.users.map((item => item.id !== user.id? item : user))],
      loading: false })),
      // const usersApdated = state.users.map(item => item.id !== user.id? item : user)
      // return { ...state, users: usersApdated }

  on(usersActions.editUserFailed,
    (state, {error}) => ({ ...state, error: error}))
)

