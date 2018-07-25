import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {OrderService} from '../../services/order.service';
import {Customer} from '../../classes/Customer';
import {CustomerService} from '../../services/customer.service';
import {DishService} from '../../services/dish.service';
import {Dish} from '../../classes/Dish';

@Component({
  selector: 'app-create-order-dialog',
  templateUrl: './create-order-dialog.component.html',
  styleUrls: ['./create-order-dialog.component.css']
})
export class CreateOrderDialogComponent implements OnInit {
  customers: Customer[];
  dishes: Dish[];

  order = new FormGroup({
    id: new FormControl(),
    description: new FormControl('', Validators.compose([Validators.minLength(5), Validators.maxLength(20), Validators.required])),
    customerId: new FormControl(),
    nameOfCustomer: new FormControl(),
    dateOfOrder: new FormControl(),
    dishId: new FormControl(),
    quantity: new FormControl(1, Validators.compose([Validators.min(1), Validators.max(10), Validators.required]))
  });

  constructor(
    public dialogRef: MatDialogRef<CreateOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderService: OrderService,
    private customerService: CustomerService,
    private dishService: DishService) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createOrder() {
    if (this.order.invalid) { return; }
    const value = this.order.value;
    var strDate = new Date(value.dateOfOrder).toISOString();
    let model = {
      customerId: value.customerId,
      description: value.description,
      dishId: value.dishId,
      orderTime: strDate,
      items: [
        { dishId: value.dishId, quantity: value.quantity }
        ]
    };
    this.orderService.createOrder(model);
    this.onNoClick();
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loadCustomers();
    this.loadDishes();
  }

  loadCustomers() {
    let response: Customer[];
    this.customerService.getAll().subscribe(res => {
      if (res.isSuccess) {
        response = JSON.parse(res.data);
        this.customers = response;
      }
    });
  }

  loadDishes() {
    let response: Dish[];
    this.dishService.getAll().subscribe(res => {
      if (res.isSuccess) {
        response = JSON.parse(res.data);
        this.dishes = response;
      }
    });
  }

  onSelectionChange(customer) {
    const currentValue = this.order.value;
    this.order.reset(
      {
        dishId: currentValue.dishId,
        customerId: customer.id,
        description: this.order.getRawValue().description,
        quantity: currentValue.quantity,
        dateOfOrder: currentValue.dateOfOrder
      });
  }

  onSelectionDishChange(dish) {
    const currentValue = this.order.value;
    this.order.reset({
      dishId: dish.id,
      customerId: currentValue.customerId,
      description: currentValue.description,
      quantity: currentValue.quantity,
      dateOfOrder: currentValue.dateOfOrder
    } );
  }
}
