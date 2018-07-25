import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {DishService} from '../../services/dish.service';
import {CreateCustomerDialogComponent} from '../create-customer-dialog/create-customer-dialog.component';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-create-dish-dialog',
  templateUrl: './create-dish-dialog.component.html',
  styleUrls: ['./create-dish-dialog.component.css']
})
export class CreateDishDialogComponent implements OnInit {
  newDish = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    photoPath: new FormControl()
  });

  constructor(
    public dialogRef: MatDialogRef<CreateCustomerDialogComponent>,
    private dishService: DishService) { }

  ngOnInit() {
    this.dishService.createdDish.subscribe(res => {
      this.onNoClick();
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createDish() {
    const value = this.newDish.value;
    const model = { name: value.name, description: value.description, photoPath: value.photoPath };
    this.dishService.createDish(model);
    this.onNoClick();
  }
}
