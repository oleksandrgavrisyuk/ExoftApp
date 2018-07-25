import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrderContainerComponent} from './components/order-container/order-container.component';
import {MainMenuComponent} from './components/main-menu/main-menu.component';
import {CustomerComponent} from './components/customer/customer.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {TopMenuComponent} from './components/top-menu/top-menu.component';
import {DishContainerComponent} from './components/dish-container/dish-container.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'ordering', component: OrderContainerComponent },
  { path: 'menu', component: MainMenuComponent },
  { path: 'customers', component: CustomerComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'top-menu', component: TopMenuComponent},
  { path: 'dishes', component: DishContainerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
