import {Component, OnInit, ViewChild} from '@angular/core';
import {Order} from '../../classes/Order';
import {OrderService} from '../../services/order.service';
import {MatTableDataSource, MatDialog, MatSort, MatPaginator} from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import {CreateOrderDialogComponent} from '../create-order-dialog/create-order-dialog.component';

@Component({
  selector: 'app-order-container',
  templateUrl: './order-container.component.html',
  styleUrls: ['./order-container.component.css']
})
export class OrderContainerComponent implements OnInit {
  displayedColumns: string[] = ['id', 'description', 'customerId', 'nameOfCustomer', 'orderTime', 'delete'];

  orders: MatTableDataSource<Order>;
  currentUser = {
    firstName: '',
    lastName: ''
  };

  constructor(private orderService: OrderService,
              public dialog: MatDialog) {
    this.orders = new MatTableDataSource<Order>();
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.setCurrentUserData();
    this.loadData();

    this.orderService.createdOrder.subscribe(res => {
      const newOrder = {
        id: res.id,
        description: res.description,
        customerId: res.customerId,
        nameOfCustomer: res.nameOfCustomer,
        orderTime: res.orderTime
      };
      const data = this.orders.data;
      data.push(newOrder);
      this.orders = new MatTableDataSource<Order>(data);
      this.orders.sort = this.sort;
      this.orders.paginator = this.paginator;
    });

    this.orderService.editedOrder.subscribe(res => {
      this.orders.data.find(o => o.id === res.id).description = res.description;
    });

    this.orderService.deletedOrder.subscribe(res => {
      const index = this.orders.data.findIndex(o => o.id === res);
      this.orders.data.splice(index, 1);
      this.orders = new MatTableDataSource<Order>(this.orders.data);
      this.orders.sort = this.sort;
      this.orders.paginator = this.paginator;
    });

  }

  setCurrentUserData() {
    this.currentUser.firstName = localStorage.getItem('login');
  }

  loadData() {
      let response: Order[];
      this.orderService.getAll().subscribe(res => {
        if (res.isSuccess) {
          response = JSON.parse(res.data);
          this.orders = new MatTableDataSource<Order>(response);
          this.orders.sort = this.sort;
          this.orders.paginator = this.paginator;
        }
      });
  }

  onCreate() {
    this.openDialogOnCreate();
  }

  onClickEdit(rowData) {
    this.openDialog(rowData);
  }

  onDelete(rowData) {
    const id = rowData;
    this.orderService.deleteOrder(id);
  }

  openDialogOnCreate(): void {
    const dialogRef = this.dialog.open(CreateOrderDialogComponent, {
      width: '500px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialog(rowData): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      height: '500px',
      data: {
        id: rowData.id,
        description: rowData.description,
        nameOfCustomer: rowData.nameOfCustomer,
        customerId: rowData.customerId,
        orderTime: rowData.orderTime
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
