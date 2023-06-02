import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OneResponse } from '../interfaces/one-response';
import { PaginatedResponse } from '../interfaces/paginated-response';
import { LoadingService } from './loading.service';

@Injectable()
export class UserService {

  private readonly API_URL = "https://reqres.in/api";
  
  constructor(private http: HttpClient, private loadingService: LoadingService) { }

  getUsers(page = 1) {
    return this.http.get<PaginatedResponse<User>>(`${this.API_URL}/users?page=${page}`).pipe(
      map(data => {
        let users = data.data.map(u => {
          delete u.email
          return u;
        });
        return { users, total_pages: data.total_pages };
      })
    );
  }

  getUser(id: number) {
    return this.http.get<OneResponse<User>>(`${this.API_URL}/users/${id}`).pipe(
      map(data => {
        let user = data.data;
        delete user.email;
        return user;
      })
    );
  }
  
}
