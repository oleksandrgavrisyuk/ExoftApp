import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CustomerResponseModel} from '../ResponseModels/CustomerResponseModels';
import {CreateCustomerRequestModel, EditCustomerRequestModel} from '../RequestModels/CustomerRequestModels';
import {Message} from '../Infrastructure/Message';
import {MatSnackBar} from '@angular/material';
import {Environment, Local, Production} from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
  })};

let customerServiceUrl = Local.CUSTOMER_SERVICE_URL;
const durationSnackBarOnResponse = 500;

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  @Output() createdCustomer: EventEmitter<CustomerResponseModel> = new EventEmitter<CustomerResponseModel>();
  @Output() editedCustomer: EventEmitter<CustomerResponseModel> = new EventEmitter<CustomerResponseModel>();
  @Output() deletedCustomer: EventEmitter<number> = new EventEmitter<number>();

  constructor(private http: HttpClient,
              public snackBar: MatSnackBar) {
    if (Environment.IsProduction) {
      customerServiceUrl = Production.CUSTOMER_SERVICE_URL;
    }
  }

  getAll(): Observable<Message> {
    return this.http.get<Message>(customerServiceUrl + '/Customers', httpOptions);
  }

  createCustomer(model: CreateCustomerRequestModel) {
    return this.http.post<Message>(customerServiceUrl + '/Customers', model, httpOptions)
      .subscribe(res => {
        this.showResultMessage(res);
        if (res.isSuccess) {
          const data = JSON.parse(res.data);
          this.createdCustomer.emit(data);
        }
      });
  }

  editCustomer(model: EditCustomerRequestModel) {
    return this.http.put<Message>(customerServiceUrl + '/Customers', model, httpOptions)
      .subscribe(res => {
        this.showResultMessage(res);
        if (res.isSuccess) {
          const data = JSON.parse(res.data);
          this.editedCustomer.emit(data);
        }
      });
  }

  deleteCustomer(id: number) {
    return this.http.delete<Message>(customerServiceUrl + '/Customers' + id, httpOptions)
      .subscribe(res => {
        this.showResultMessage(res);
        if (res.isSuccess) {
          this.deletedCustomer.emit(id);
        }
      });
  }

  private showResultMessage(response: Message) {
    if (response.isSuccess) {
      this.snackBar.open('Success', 'Close', {
        duration: durationSnackBarOnResponse,
        verticalPosition: 'top',
        horizontalPosition: 'right',
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
