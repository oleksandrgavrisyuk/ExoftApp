import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.email, Validators.required])),
    firstName: new FormControl('', Validators.compose([Validators.minLength(5), Validators.maxLength(20), Validators.required])),
    lastName: new FormControl('', Validators.compose([Validators.minLength(5), Validators.maxLength(20), Validators.required])),
    age: new FormControl('', Validators.compose([Validators.pattern('[0-9]{2}'), Validators.required])),
    password: new FormControl('', Validators.compose([Validators.minLength(6), Validators.required]))
  });

  constructor(private authService: AuthService,
              private router: Router) { }

  registerUser() {
    if (this.newUser.invalid) { return; }
    const value = this.newUser.value;
    const model = {
      email: value.email,
      firstName: value.firstName,
      lastName: value.lastName,
      age: value.age,
      password: value.password
    };

    this.authService.signOut(model);
  }

  ngOnInit(): void {
    this.authService.signOutCompleted.subscribe(res => {
      this.router.navigate(['login']);
    });
  }
}
