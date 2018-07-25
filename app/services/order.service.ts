import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {OrderResponseModel} from '../ResponseModels/OrderResponseModel';
import {Message} from '../Infrastructure/Message';
import {MatSnackBar} from '@angular/material';
import {catchError} from 'rxjs/operators';
import {Environment, Local, Production} from "../../environments/environment";
import {EditOrderRequestModel} from "../RequestModels/OrderRequestModels";

const httpOptions = {
  headers: new HttpHeaders({
  })};

let orderServiceUrl = Local.ORDERS_SERVICE_URL;
const durationSnackBarOnResponse = 5000;

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  @Output() createdOrder: EventEmitter<OrderResponseModel> = new EventEmitter();
  @Output() editedOrder: EventEmitter<OrderResponseModel> = new EventEmitter();
  @Output() deletedOrder: EventEmitter<number> = new EventEmitter();

  constructor(private http: HttpClient,
              public snackBar: MatSnackBar) {
    if (Environment.IsProduction) {
      orderServiceUrl = Production.ORDERS_SERVICE_URL;
    }
  }

  getAll(): Observable<Message> {
    return this.http.get<Message>(orderServiceUrl + '/Orders', httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  createOrder(model) {
    return this.http.post<Message>(orderServiceUrl + '/Orders', model, httpOptions)
      .subscribe(res => {
        this.showResultMessage(res);
        if (res.isSuccess) {
            const data = JSON.parse(res.data);
            this.createdOrder.emit(data);
          }
      });
  }

  editOrder(model: EditOrderRequestModel) {
    return this.http.put<Message>(orderServiceUrl + '/Orders', model, httpOptions)
      .subscribe(res => {
        this.showResultMessage(res);
        if (res.isSuccess) {
          const data = JSON.parse(res.data);
          this.editedOrder.emit(data);
        }
      });
  }

  deleteOrder(id: number) {
    return this.http.delete<Message>(orderServiceUrl + '/Orders' + id, httpOptions)
      .subscribe(res => {
        this.showResultMessage(res);
        if (res.isSuccess) {
          this.deletedOrder.emit(id);
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
