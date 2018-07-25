import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import {SignInRequestModel, SignOutRequestModel} from '../RequestModels/AuthRequestModels';
import {Message} from '../Infrastructure/Message';
import {Environment, Local, Production} from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
  })};

let authServiceUrl = Local.AUTH_SERVICE_URL;
const durationSnackBarOnResponse = 500;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() signOutCompleted: EventEmitter<boolean> = new EventEmitter();
  @Output() signInCompleted: EventEmitter<boolean> = new EventEmitter();

  constructor(private http: HttpClient,
              public snackBar: MatSnackBar) {
    if (Environment.IsProduction) {
      authServiceUrl = Production.AUTH_SERVICE_URL;
    }
  }

    signIn(model: SignInRequestModel) {
      return this.http.post<Message>(authServiceUrl + '/Auth' + '/SignIn', model, httpOptions)
        .subscribe(res => {
          this.showResultMessage(res);
          if (res.isSuccess) {
            const data = JSON.parse(res.data);
            localStorage.setItem('token', data);
            localStorage.setItem('login', model.login);
            this.signInCompleted.emit(true);
          }
        });
    }

    signOut(model: SignOutRequestModel) {
      return this.http.post<Message>(authServiceUrl + '/Auth' + '/SignOut', model, httpOptions)
        .subscribe(res => {
          this.showResultMessage(res);
          if (res.isSuccess) {
            this.signOutCompleted.emit(true);
          }
        });
    }

  private showResultMessage(response: Message) {
    if (response.isSuccess) {
      this.snackBar.open('Success', 'Close', {
        duration: durationSnackBarOnResponse,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
    } else {
      this.snackBar.open('Error message from server ' + response.errorMessage, 'Close', {
        duration: durationSnackBarOnResponse,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
    }
  }
}
