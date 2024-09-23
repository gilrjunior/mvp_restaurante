import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { ItemsComponent } from './components/items/items.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path:'login', component: AuthComponent ,title: 'Login',},
    {path:'', component: RestaurantComponent ,title: 'Restaurantes', canActivate: [authGuard],},
    {path:':name/:address/:phone/:id/cardapio', component: ItemsComponent ,title: 'Cardápio', canActivate: [authGuard],}
];
