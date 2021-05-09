import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Car } from "../app/car";

@Injectable({
  providedIn: 'root'
})
export class CarService {
  baseUrl = 'http://localhost/api';
  cars: Car[];

  constructor(private http: HttpClient) { }

  // observableが機能するためにはサービスにget()メソッドがあるだけでは不十分で
  // データをコンポーネントに積極的に送信する必要があります。
  getAll(): Observable<Car[]> {
    return this.http.get(`${this.baseUrl}/list`).pipe(
      // サーバー側から送られてきた車の配列を
      // サービスのローカルな車の変数にマッピング
      map((res) => {
        this.cars = res['data'];
        return this.cars;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
