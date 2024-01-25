import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersApiService } from "../services/users-api.service";
import { catchError, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import * as usersActions from "./users.actions";
import { IUser } from "../interfaces/IUser";
import { Store, select } from "@ngrx/store";
import { selectUsersList } from "./users.selectors";
import { LocalStorageService } from "../services/local-storage.service";
import { LOCAL_STORAGE_USERS_KEY } from "../app.config";


@Injectable()

export class UsersEffects {

  private store = inject(Store);
  private actions$ = inject(Actions);
  private localStorageService = inject(LocalStorageService);
  private usersApiService = inject(UsersApiService);
  private localStorageKey = inject(LOCAL_STORAGE_USERS_KEY);


  loadUsers$ = createEffect(()=> this.actions$.pipe(
    ofType(usersActions.loadUsers),
    withLatestFrom(this.store.pipe(select(selectUsersList))),
    switchMap(() => {
      const usersFromBack = this.localStorageService.getUsersFromLocalStorage(this.localStorageKey);
      if (usersFromBack && usersFromBack.length > 0) {
        return of(usersActions.loadUsersSuccess({users: usersFromBack}))
      }
      else return this.usersApiService.getUsers()
      .pipe(
        map((users: IUser[]) => (usersActions.loadUsersSuccess({users}))),
        catchError((error) => {
          console.error('Error', error);
          return of(usersActions.loadUsersFailed({ error }));
        })
      )
    })
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
  ));

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
  ));

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
  ));

  saveUsersToLocalStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.createUserSuccess, usersActions.editUserSuccess, usersActions.deleteUserSuccess),
      withLatestFrom(this.store.pipe(select(selectUsersList))),
      tap(([action, users]) => {
        this.localStorageService.saveUsersToLocalStorage(this.localStorageKey, users)
      })
    ), { dispatch: false }
  );

  // ---------- Загрузка юзеров с сервера без localStorage----------------
  //
  // loadUsers$ = createEffect(()=> this.actions$.pipe(
  //   ofType(usersActions.loadUsers),
  //   switchMap(() => this.usersApiService.getUsers()
  //     .pipe(
  //       map((users: IUser[]) => (usersActions.loadUsersSuccess({users}))),
  //       catchError((error) => {
  //         console.error('Error', error);
  //         return of(usersActions.loadUsersFailed({ error }));
  //       })
  //     ))
  // ));
}



