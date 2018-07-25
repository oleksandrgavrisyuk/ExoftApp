import {Component, OnInit, ViewChild} from '@angular/core';
import {Dish} from '../../classes/Dish';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {DishService} from '../../services/dish.service';
import {CreateDishDialogComponent} from '../create-dish-dialog/create-dish-dialog.component';
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-dish-container',
  templateUrl: './dish-container.component.html',
  styleUrls: ['./dish-container.component.css']
})
export class DishContainerComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'photo', 'delete'];
  dishes: MatTableDataSource<Dish>;
  currentUser = {
    firstName: '',
    lastName: ''
  };

  constructor(private dishService: DishService,
              public dialog: MatDialog) {
    this.dishes = new MatTableDataSource<Dish>();
  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    let response: Dish[];
    this.dishService.getAll().subscribe(res => {
      if (res.isSuccess) {
        response = JSON.parse(res.data);
        this.dishes = new MatTableDataSource<Dish>(response);
        this.dishes.sort = this.sort;
      }
    });
  }

  onClickEdit(rowData) {
    this.openDialogOnEdit(rowData);
  }

  onCreate() {
    this.openDialogOnCreate();
  }

  openDialogOnCreate(): void {
    const dialogRef = this.dialog.open(CreateDishDialogComponent, {
      width: '500px',
      height: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogOnEdit(rowData): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      height: '400px',
      data: {id: rowData.id, description: rowData.description, nameOfCustomer: rowData.nameOfCustomer, customerId: rowData.customerId}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
