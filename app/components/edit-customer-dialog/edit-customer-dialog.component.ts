import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CustomerService} from '../../services/customer.service';

@Component({
  selector: 'app-edit-customer-dialog',
  templateUrl: './edit-customer-dialog.component.html',
  styleUrls: ['./edit-customer-dialog.component.css']
})
export class EditCustomerDialogComponent  {
  customer = new FormGroup({
    id: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl()
  });

  constructor(
    public dialogRef: MatDialogRef<EditCustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private customerService: CustomerService) {
    this.customer.reset({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  editData() {
    const value = this.customer.value;
    const model = {id: value.id, firstName: value.firstName, lastName: value.lastName};
    this.customerService.editCustomer(model);
    this.onNoClick();
  }
}
