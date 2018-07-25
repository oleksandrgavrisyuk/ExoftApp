import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CustomerService} from '../../services/customer.service';

@Component({
  selector: 'app-create-customer-dialog',
  templateUrl: './create-customer-dialog.component.html',
  styleUrls: ['./create-customer-dialog.component.css']
})
export class CreateCustomerDialogComponent  {

  customer = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl()
  });

  constructor(
    public dialogRef: MatDialogRef<CreateCustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private customerService: CustomerService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }

    createCustomer(data) {
      const value = this.customer.value;
      const model = { firstName: value.firstName, lastName: value.lastName };
      this.customerService.createCustomer(model);
      this.onNoClick();
    }
}
