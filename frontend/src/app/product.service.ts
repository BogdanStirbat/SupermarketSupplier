import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Product } from './product';
import { AuthenticationService } from './authentication.service';

import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
    ) { }

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

  public createProduct(product: Product): void {

    const headers = new HttpHeaders()
                       .append('Authorization', 'Bearer ' + this.authenticationService.accessToken)
                       .append('Content-Type', 'application/json')
                       .append('Accept', 'application/json');

    this.http.post(`${environment.apiUrl}/api/products`, product, {headers: headers})
        .subscribe({
          next: resp => {
            console.log('Successfully saved a product.');
          },
          error: error => {
            console.log('An error occurred saving a product.');
            console.log(error);
          }
        });
  }
}
