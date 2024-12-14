import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private jsonUrl = 'assets/data.json';

  constructor(private http: HttpClient) {}

  getData(): Observable<Product[]> {
    return this.http.get<Product[]>(this.jsonUrl);
  }

  getDataById(id: number): Observable<Product | undefined> {
    return this.http
      .get<Product[]>(this.jsonUrl)
      .pipe(
        map((products: Product[]) =>
          products.find((product) => product.id === id)
        )
      );
  }
}
