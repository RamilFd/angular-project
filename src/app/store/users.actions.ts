import { createAction, props } from "@ngrx/store";
import { IUser } from "../interfaces/IUser";

export const loadUsers = createAction('[USERS] loading');

export const loadUsersSuccess = createAction('[USERS] loading Success',
props<{ users: IUser[] }>());

export const loadUsersFailed = createAction('[USERS] loading Failed',
props<{ error: any }>());

export const deleteUser = createAction('[USERS] delete',
props<{ id: number }>());

export const deleteUserSuccess = createAction('[USERS] delete Success',
props<{ id: number }>());

export const deleteUserFailed = createAction('[USERS] delete Failed',
props<{ error: any }>());

export const editUser = createAction('[USERS] edit',
props<{ user: IUser }>());

export const editUserSuccess = createAction('[USERS] edit Success',
props<{ user: IUser }>());

export const editUserFailed = createAction('[USERS] edit Failed',
props<{ error: any }>());

export const createUser = createAction('[USERS] create',
props<{ user: IUser }>());

export const createUserSuccess = createAction('[USERS] create Success',
props<{ user: IUser }>());

export const createUserFailed = createAction('[USERS] create Failed',
props<{ error: any }>());
