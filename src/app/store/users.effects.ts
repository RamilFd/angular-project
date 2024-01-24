import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersApiService } from "../services/users-api.service";
import { catchError, map, of, switchMap } from "rxjs";
import * as usersActions from "./users.actions";
import { IUser } from "../interfaces/IUser";


@Injectable()

export class UsersEffects {

  loadUsers$ = createEffect(()=> this.actions$.pipe(
    ofType(usersActions.loadUsers),
    switchMap(() => this.usersApiService.getUsers()
      .pipe(
        map((users: IUser[]) => (usersActions.loadUsersSuccess({users}))),
        catchError((error) => {
          console.error('Error', error);
          return of(usersActions.loadUsersFailed({ error }));
        })
      ))
  ))

  createUsers$ = createEffect(()=> this.actions$.pipe(
    ofType(usersActions.createUser),
    switchMap(({user}) => this.usersApiService.createUser(user)
      .pipe(
        map(() => (usersActions.createUserSuccess({user}))),
        catchError((error) => {
          console.error('Error', error);
          return of(usersActions.createUserFailed({ error }));
        })
      ))
  ))

  editUsers$ = createEffect(()=> this.actions$.pipe(
    ofType(usersActions.editUser),
    switchMap(({user}) => this.usersApiService.editUser(user)
      .pipe(
        map(() => (usersActions.editUserSuccess({user}))),
        catchError((error) => {
          console.error('Error', error);
          return of(usersActions.editUserFailed({ error }));
        })
      ))
  ))

  deleteUsers$ = createEffect(()=> this.actions$.pipe(
    ofType(usersActions.deleteUser),
    switchMap(({id}) => this.usersApiService.deleteUser(id)
      .pipe(
        map(() => (usersActions.deleteUserSuccess({id}))),
        catchError((error) => {
          console.error('Error', error);
          return of(usersActions.deleteUserFailed({ error }));
        })
      ))
  ))

  constructor (
    private actions$: Actions,
    private usersApiService: UsersApiService,
    ) { }
}



