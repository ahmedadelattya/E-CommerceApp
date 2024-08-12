import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsRequestsService {
  private baseUrl: string = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  // Fetch the list of products
  getProductsList() : Observable<any>{
    return this.http.get(`https://dummyjson.com/products`, {
      params: {
        sortBy: 'name',
        order: 'desc',
      },
      headers: {
        Authorization: localStorage.getItem('access_token') || '',
      },
    });
  }

  // Fetch details of a specific product by ID
  getProductDetails(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  // Add a new product
  addProduct(data: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, data, {
      headers: {
        Authorization: localStorage.getItem('access_token') || '',
      },
    });
  }
}
