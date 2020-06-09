import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Product } from './product';

import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]> {

    console.log('Start receive products.');
    
    return this.http.get<Product[]>(`${environment.apiUrl}/api/products`)
      .pipe(
        tap(_ => console.log('Received products')),
        catchError(err => {
          console.log('Error.');
          console.log(err);
          return of([]);
        })
      );
  }
}
