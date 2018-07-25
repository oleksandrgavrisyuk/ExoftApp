import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {OrderService} from '../../services/order.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  order = new FormGroup({
    id: new FormControl(),
    description: new FormControl(),
    customerId: new FormControl(),
    nameOfCustomer: new FormControl(),
    orderTime: new FormControl()
  });

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderService: OrderService) {
    this.order.reset({
      id: {value: data.id, disabled: false},
      description: data.description, disabled: true,
      nameOfCustomer: {value: data.nameOfCustomer, disabled: true},
      customerId: {value: data.customerId, disabled: true},
      orderTime: {value: data.orderTime, disabled: true}
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  editData() {
    const value = this.order.value;
    const model = {id: value.id, description: value.description};
    this.orderService.editOrder(model);
    this.onNoClick();
  }
}
