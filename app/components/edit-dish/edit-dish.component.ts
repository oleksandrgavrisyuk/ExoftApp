import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {DishService} from "../../services/dish.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-edit-dish',
  templateUrl: './edit-dish.component.html',
  styleUrls: ['./edit-dish.component.css']
})
export class EditDishComponent implements OnInit {
  dish = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    description: new FormControl(),
    photoPath: new FormControl()
  });

  constructor(
              public dialogRef: MatDialogRef<EditDishComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dishService: DishService) {
    this.dish.reset({
      id: data.id,
      name: data.firstName,
      description: data.lastName,
      photoPah: data.photoPath
    });
  }

  ngOnInit() {
  }
}
