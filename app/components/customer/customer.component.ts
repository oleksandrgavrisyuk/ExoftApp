import { Component, OnInit } from '@angular/core';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {Customer} from '../../classes/Customer';
import {CustomerService} from '../../services/customer.service';
import {CreateCustomerDialogComponent} from '../create-customer-dialog/create-customer-dialog.component';
import {EditCustomerDialogComponent} from '../edit-customer-dialog/edit-customer-dialog.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  currentUser = {
    firstName: '',
    lastName: ''
  };
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'delete'];

  customers: MatTableDataSource<Customer>;

  constructor(private customerService: CustomerService,
              public dialog: MatDialog) {
    this.customers = new MatTableDataSource<Customer>();
  }

  ngOnInit() {
    this.setCurrentUserData();
    this.loadData();

    this.customerService.createdCustomer.subscribe(res => {
      const newCustomer: Customer = {
        id: res.id,
        firstName: res.firstName,
        lastName: res.lastName
      }
      const data = this.customers.data;
      data.push(newCustomer);
      this.customers = new MatTableDataSource<Customer>(data);
    });

    this.customerService.editedCustomer.subscribe(res => {
      this.customers.data.find(o => o.id === res.id).firstName = res.firstName;
      this.customers.data.find(o => o.id === res.id).lastName = res.lastName;
    });

    this.customerService.deletedCustomer.subscribe(res => {
      const index = this.customers.data.findIndex(o => o.id === res);
      this.customers.data.splice(index, 1);
      this.customers = new MatTableDataSource<Customer>(this.customers.data);
    });
  }

  loadData() {
    let response: Customer[];
    this.customerService.getAll().subscribe(res => {
      if (res.isSuccess) {
        response = JSON.parse(res.data);
      }
      this.customers = new MatTableDataSource<Customer>(response);
    });
  }

  setCurrentUserData() {
    this.currentUser.firstName = localStorage.getItem('login');
  }

  onCreate() {
    this.openDialogOnCreate();
  }

  onEdit(rowData) {
    this.openDialogOnEdit(rowData);
  }

  onDelete(id: number) {
    this.customerService.deleteCustomer(id);
  }

  openDialogOnCreate(): void {
    const dialogRef = this.dialog.open(CreateCustomerDialogComponent, {
      width: '500px',
      height: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogOnEdit(rowData): void {
    const dialogRef = this.dialog.open(EditCustomerDialogComponent, {
      width: '500px',
      height: '400px',
      data: {id: rowData.id, firstName: rowData.firstName, lastName: rowData.lastName}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
