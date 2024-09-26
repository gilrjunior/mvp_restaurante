import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Restaurant } from '../../models/restaurant';
import { RestaurantsService } from '../../services/restaurants/restaurants.service';

@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css'
})
export class RestaurantComponent implements OnInit {

  public searchQuery: string = '';
  private restaurants:Restaurant[] = []

  constructor(private restauranteService:RestaurantsService, private router:Router){}

  ngOnInit(){

    this.getRestaurants()

  }

  async getRestaurants(){
    
    await this.restauranteService.get().subscribe({next: (response) => {

      this.restaurants = response.body ?? []; 

    }, error: (response) => {

      alert(response.error.message);

    }});

  }

  filteredRestaurants() {
    return this.restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
      restaurant.address.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      restaurant.phone.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  go_items(id:Number, name:String, address:String, phone:String){

    this.router.navigate([`${name}/${address}/${phone}/${id}/cardapio`]);

  }


}
