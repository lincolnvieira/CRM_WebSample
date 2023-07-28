import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: "root"
  })
export class ProductService {
  
    baseUrl = "https://localhost:44388/api/products";
  
    constructor(private httpClient: HttpClient) { }
  
    get(): Observable<Product[]>  {
      return this.httpClient.get<Product[]>(this.baseUrl)
      .pipe(
        catchError(this.handleError)
      );
    }
  
    getId(id: number): Observable<Product>  {
      return this.httpClient.get<Product>(this.baseUrl + id)
      .pipe(
        catchError(this.handleError)
      );
    }
  
    post(Product: Product){
      return this.httpClient.post(this.baseUrl, Product)
        .pipe(
          catchError(this.handleError)
        );
    };
  
    delete(id: string){
      return this.httpClient.delete(this.baseUrl + id)
        .pipe(
          catchError(this.handleError)
        );
    };
   
    private handleError(error: HttpErrorResponse) {
      if (error.status === 0) {
        console.error('Um erro aconteceu:', error.error);
      } 
      else {
        console.error(`O servidor retornou o status code ${error.status}, erro: `, error.error);
      }
      return throwError(() => new Error('Algum erro aconteceu. Tente novamente mais tarde'));
    }
  }