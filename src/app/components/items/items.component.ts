import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../models/item';
import { ItemsService } from '../../services/items/items.service';
import { RestaurantsService } from '../../services/restaurants/restaurants.service';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent implements OnInit {

  public searchQuery: string = '';
  private items:Item[] = []
  public restaurant_name = ''
  public restaurant_address = ''
  public restaurant_phone = ''

  constructor(private itemService:ItemsService, 
    private route:ActivatedRoute, 
    private restauranteService:RestaurantsService,
    private router:Router){}

  ngOnInit(){
    this.getItems()
    this.restaurant_name = String(this.route.snapshot.paramMap.get("name"))
    this.restaurant_address = String(this.route.snapshot.paramMap.get("address"))
    this.restaurant_phone = String(this.route.snapshot.paramMap.get("phone"))
  }

  async getItems(){

    await this.itemService.get(Number(this.route.snapshot.paramMap.get("id"))).subscribe({next: (response) => {

      this.items = response.body ?? []; 

    }, error: (response) => {

      alert(response.error.message);

    }});

  }

  filteredItems() {
    return this.items.filter(item =>
      item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      item.price.toString().includes(this.searchQuery.toLowerCase())
    );
  }

  goBack() {
    this.router.navigate(['']);
  }

  getNumber(price:number) {

    return price

  }

}
