import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit {

  user = new FormGroup( {
    login: new FormControl('', Validators.compose([Validators.email, Validators.required])),
    password: new FormControl('', Validators.compose([Validators.minLength(6), Validators.required]))
  });

  constructor(private authService: AuthService,
              public router: Router) { }

  signIn() {
    if (this.user.invalid) { return; }
    const value = this.user.value;
    const model = { login: value.login, password: value.password };
    this.authService.signIn(model);
  }

  ngOnInit(): void {
    this.authService.signInCompleted.subscribe(res => {
      this.router.navigate(['ordering']);
    });
  }
}
