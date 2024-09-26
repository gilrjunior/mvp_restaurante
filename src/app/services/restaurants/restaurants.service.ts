import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Restaurant } from '../../models/restaurant';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  private apiURL = environment.api_url

  constructor(private http:HttpClient, private auth:AuthService) {}

  get(){

    const token = this.auth.getToken()

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Restaurant[]>(`${this.apiURL}/restaurants`,{headers: headers ,observe: 'response'})

  }

  getOne(id:number){

    const token = this.auth.getToken()

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Restaurant>(`${this.apiURL}/restaurants/${id}`,{headers: headers ,observe: 'response'})


  }

}
