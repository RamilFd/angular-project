import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  saveUsersToLocalStorage(key: string, data: any){
    localStorage.setItem(key, JSON.stringify(data));
  }

  getUsersFromLocalStorage(key: string){
    const users = localStorage.getItem(key);
    if (users) {
      return JSON.parse(users)
    }
    return null;
  }

  // --------- При работе с локальным стейтом (без NgRX)---------------

  // getItem(): string | null{
  //   return localStorage.getItem('users');
  // }
  // setItem(data: string): string {
  //   localStorage.setItem('users', data);
  //   return data;
  // }
  // removeItem() {
  //   localStorage.removeItem('users');
  // }
  // clear(){
  //   localStorage.clear();
  // }
}
