import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatListModule } from '@angular/material/list';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { OrderComponent } from './components/order/order.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {OrderService} from './services/order.service';
import { OrderContainerComponent } from './components/order-container/order-container.component';
import {
  MatFormFieldModule,
  MatTableModule,
  MatCheckboxModule,
  MatSelectModule,
  MatSnackBarModule,
  MatSortModule,
  MatNativeDateModule,
  MatCardModule,
  MatPaginatorModule,
} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import {MatMenuModule} from '@angular/material/menu';
import { CustomerComponent } from './components/customer/customer.component';
import { CreateOrderDialogComponent } from './components/create-order-dialog/create-order-dialog.component';
import {CustomerService} from './services/customer.service';
import { CreateCustomerDialogComponent } from './components/create-customer-dialog/create-customer-dialog.component';
import { EditCustomerDialogComponent } from './components/edit-customer-dialog/edit-customer-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {AuthInterceptorService} from './services/auth-interceptor.service';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { EditUserDialogComponent } from './components/edit-user-dialog/edit-user-dialog.component';
import {ResponseInterceptorService} from './services/response-interceptor.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DishComponent } from './components/dish/dish.component';
import { DishContainerComponent } from './components/dish-container/dish-container.component';
import { CreateDishDialogComponent } from './components/create-dish-dialog/create-dish-dialog.component';
import {DishService} from './services/dish.service';
import {MatExpansionModule} from '@angular/material/expansion';
import { EditDishComponent } from './components/edit-dish/edit-dish.component';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptorService, multi: true }
];

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    OrderContainerComponent,
    DialogComponent,
    MainMenuComponent,
    CustomerComponent,
    CreateOrderDialogComponent,
    CreateCustomerDialogComponent,
    EditCustomerDialogComponent,
    LoginComponent,
    RegisterComponent,
    TopMenuComponent,
    EditUserDialogComponent,
    DishComponent,
    DishContainerComponent,
    CreateDishDialogComponent,
    EditDishComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    MatListModule,
    BrowserModule,
    HttpClientModule,
    MatFormFieldModule,
    MatTableModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatSelectModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatCardModule,
    MatPaginatorModule
  ],
  entryComponents: [
    DialogComponent,
    CreateOrderDialogComponent,
    CreateCustomerDialogComponent,
    EditCustomerDialogComponent,
    EditUserDialogComponent,
    CreateDishDialogComponent
  ],
  providers: [
    OrderService,
    CustomerService,
    DishService,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
