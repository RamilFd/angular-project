import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  saveUsersToLocalStorage(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getUsersFromLocalStorage(key: string) {
    const users = localStorage.getItem(key);
    if (users) {
      return JSON.parse(users)
    } else return null;
  }
}
