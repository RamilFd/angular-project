import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class UsersApiService {

  constructor(
    private http: HttpClient
    ) { }

  getUsers(): Observable<IUser[]>{
    return this.http.get<IUser[]>(environment.api_url);
  }

  createUser(user: IUser): Observable<IUser[]>{
    return this.http.post<IUser[]>(environment.api_url, user);
  }

  editUser(user: IUser): Observable<IUser[]>{
    return this.http.put<IUser[]>(`${environment.api_url}/${user.id}`, user);
  }

  deleteUser(id: number): Observable<IUser[]>{
    return this.http.delete<IUser[]>(`${environment.api_url}/${id}`);
  }
}
