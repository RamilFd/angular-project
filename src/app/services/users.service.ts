import { Injectable } from '@angular/core';
import { UsersApiService } from './users-api.service';
import { IUser } from '../interfaces/IUser';
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})

  export class UsersService {

//   constructor ( private usersApiService: UsersApiService,
//     private localStorageService: LocalStorageService
//     ) {}

//   users: IUser[] = [];

//   getUsersList() {
//     if (this.localStorageService.getItem() === null) {
//       this.usersApiService.getUsers()
//       .subscribe({
//         next:responce => {
//           this.users = responce;
//           this.localStorageService.setItem(JSON.stringify(this.users))
//         },
//         error: err => console.error('Ошибка загрузки данных с сервера', err)
//       })
//     }
//     else {
//       const usersLocalStorage = this.localStorageService.getItem();
//       if (usersLocalStorage !== null)
//       this.users = JSON.parse(usersLocalStorage);
//     }
//   }

//   updateLocalStorage(){
//     this.localStorageService.removeItem();
//     this.localStorageService.setItem(JSON.stringify(this.users))
//   }

//   deleteUsers(deletedUser: IUser) {
//     const usersAfterDelete = this.users.filter(user => user.id !== deletedUser.id);
//     this.users = usersAfterDelete;
//     this.updateLocalStorage();
//   }

//   createUser(createdUser: IUser) {
//     this.users = [...this.users, createdUser];
//     this.updateLocalStorage();
//   }

//   editUser(editedUser: IUser) {
//     const usersAfterEdit = this.users.map(user => {
//       if (user.id === editedUser.id) {
//         return editedUser;
//       } else {
//         return user;
//       }
//     })
//     this.users = usersAfterEdit;
//     this.updateLocalStorage();
//   }

}

