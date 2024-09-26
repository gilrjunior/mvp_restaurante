import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Item } from '../../models/item';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private apiURL = environment.api_url

  constructor(private http:HttpClient, private auth:AuthService) {}

  get(restaurant_id:number){

    const token = this.auth.getToken()

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Item[]>(`${this.apiURL}/restaurant/${restaurant_id}/items`,{headers: headers ,observe: 'response'})

  }


}
