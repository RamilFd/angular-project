import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  constructor() { }

  getItem(): string | null{
    return localStorage.getItem('users');
  }
  setItem(data: string): string {
    localStorage.setItem('users', data);
    return data;
  }
  removeItem() {
    localStorage.removeItem('users');
  }
  clear(){
    localStorage.clear();
  }
}
