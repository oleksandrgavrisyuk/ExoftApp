import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProfileService} from '../../services/profile.service';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {
  user = new FormGroup({
    id: new FormControl(),
    firstName: new FormControl('', Validators.compose([Validators.minLength(5), Validators.maxLength(20), Validators.required])),
    lastName: new FormControl('', Validators.compose([Validators.minLength(5), Validators.maxLength(20), Validators.required])),
    email: new FormControl('', Validators.compose([Validators.email, Validators.required])),
    age: new FormControl('', Validators.compose([Validators.pattern('[0-9]{2}'), Validators.required])),
  });

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    private profileService: ProfileService) { }

  ngOnInit() {
    this.loadData();

    this.profileService.returnsProfile.subscribe(res => {
      this.user.reset({
        id: res.id,
        firstName: res.firstName,
        lastName: res.lastName,
        email: res.email,
        age: res.age
      });
    });

    this.profileService.editedProfile.subscribe(res => {
      this.dialogRef.close();
    });
  }

  loadData() {
    const email = localStorage.getItem('login');
    this.profileService.get(email);
  }

  editData() {
    const value = this.user.value;
    const model = {id: value.id, email: value.email, firstName: value.firstName, lastName: value.lastName, age: value.age};
    this.profileService.editProfile(model);
  }
}
