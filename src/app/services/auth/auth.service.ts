import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Auth } from '../../models/auth';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = environment.api_url

  constructor(private http:HttpClient) { }

  login(user:User){

    return this.http.post<Auth>(`${this.apiURL}/user/auth/login`, user,{observe: 'response'})

  }

  register(user:User){

    return this.http.post<Auth>(`${this.apiURL}/user/register`,user, {observe: 'response'})

  }

  setToken(token: any) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('Data', token);
    }
  }

  getToken() {
    return localStorage.getItem('Data')
  }

  deleteToken() {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('Data'); 
    }
  }

  authenticated(): boolean {
    return !!this.getToken(); 
  }

  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

}
