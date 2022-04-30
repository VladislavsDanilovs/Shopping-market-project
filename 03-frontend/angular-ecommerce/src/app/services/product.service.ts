import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  /* HttpClient injection: */
  constructor(private httpClient: HttpClient) { }

  /* Returns an observable.
  That method is mapping the JSON data from Sprind Data REST to Product array*/
  getProductList(): Observable<Product[]>{
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.products)
    );
  }
}
  /* Unwraps the JSON from Sprind Data REST _embedded entry: */
interface GetResponse {
  _embedded: {
    products: Product[];
  }
}