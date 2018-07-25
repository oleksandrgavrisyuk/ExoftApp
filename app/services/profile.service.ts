import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import {Message} from '../Infrastructure/Message';
import {UserResponseModel} from '../ResponseModels/UserResponseModels';
import {EditProfileRequestModel} from '../RequestModels/AuthRequestModels';
import {Environment, Local, Production} from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
  })};

let profileServiceUrl = Local.AUTH_SERVICE_URL;
const durationSnackBarOnResponse = 5000;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  @Output() returnsProfile: EventEmitter<UserResponseModel> = new EventEmitter();
  @Output() editedProfile: EventEmitter<boolean> = new EventEmitter();

  constructor(private http: HttpClient,
              public snackBar: MatSnackBar) {
    if (Environment.IsProduction) {
      profileServiceUrl = Production.AUTH_SERVICE_URL;
    }
  }

  get(email: string) {
    return this.http.get<Message>(profileServiceUrl + '/Profile' + '/?email=' + email, httpOptions)
      .subscribe(res => {
        this.showResultMessage(res);
        if (res.isSuccess) {
          const data = JSON.parse(res.data);
          this.returnsProfile.emit(data);
        }
      });
  }

  editProfile(model: EditProfileRequestModel) {
    return this.http.put<Message>(profileServiceUrl + '/Profile', model, httpOptions)
      .subscribe(res => {
        this.showResultMessage(res);
        if (res.isSuccess) {
          this.editedProfile.emit(true);
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
