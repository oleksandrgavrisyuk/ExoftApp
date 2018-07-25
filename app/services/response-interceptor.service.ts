import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/do';

const durationSnackBarOnResponse = 500;

@Injectable({
  providedIn: 'root'
})
export class ResponseInterceptorService implements HttpInterceptor {

  constructor(public snackBar: MatSnackBar) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        if (event.status !== 200) {
          this.showResultMessage(event);
        }
      }
    });
  }

  private showResultMessage(event: any) {
    this.snackBar.open('Error ' + event.statusText + 'with code ' + event.status, 'Close', {
      duration: durationSnackBarOnResponse,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }
}
