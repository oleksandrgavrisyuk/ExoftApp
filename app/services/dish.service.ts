import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Message} from '../Infrastructure/Message';
import {Observable, throwError} from 'rxjs';
import {CreateDishRequestModel, UpdateDishRequestModel} from '../RequestModels/DishRequestModels';
import {DishResponseModel} from '../ResponseModels/DishResponseModels';
import {catchError} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import {Environment, Local, Production} from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
  })};

let orderServiceUrl = Local.ORDERS_SERVICE_URL;
const durationSnackBarOnResponse = 5000;

@Injectable({
  providedIn: 'root'
})
export class DishService {
  @Output() createdDish: EventEmitter<DishResponseModel> = new EventEmitter();
  @Output() editedDish: EventEmitter<DishResponseModel> = new EventEmitter();
  @Output() deletedDish: EventEmitter<number> = new EventEmitter();

  constructor(private http: HttpClient,
              public snackBar: MatSnackBar) {
    if (Environment.IsProduction) {
      orderServiceUrl = Production.ORDERS_SERVICE_URL;
    }
  }

  getAll(): Observable<Message> {
    return this.http.get<Message>(orderServiceUrl + '/Dishes', httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  createDish(model: CreateDishRequestModel) {
    return this.http.post<Message>(orderServiceUrl + '/Dishes', model, httpOptions)
      .subscribe(res => {
        this.showResultMessage(res);
        if (res.isSuccess) {
          const data = JSON.parse(res.data);
          this.createdDish.emit(data);
        }
      });
  }

  editDish(model: UpdateDishRequestModel) {
    return this.http.put<Message>(orderServiceUrl + '/Dishes', model, httpOptions)
      .subscribe(res => {
        this.showResultMessage(res);
        if (res.isSuccess) {
          const data = JSON.parse(res.data);
          this.editedDish.emit(data);
        }
      });
  }

  deleteDish(id: number) {
    return this.http.delete<Message>(orderServiceUrl + '/Dishes' + id, httpOptions)
      .subscribe(res => {
        this.showResultMessage(res);
        if (res.isSuccess) {
          this.deletedDish.emit(id);
        }
      });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
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
