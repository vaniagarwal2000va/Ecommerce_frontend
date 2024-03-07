import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { product } from '../data-type';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productAddedFlag = new BehaviorSubject(false);
  productList = new BehaviorSubject([]);
  constructor(private http: HttpClient) {}
  addProduct(data: product) {
    return this.http
      .post('https://3ppqsh-3000.csb.app/products', data, {
        observe: 'response',
      })
      .subscribe(() => {
        this.productAddedFlag.next(true);
      });
  }

  getProduct(): Observable<any> {
    return this.http.get('https://3ppqsh-3000.csb.app/products');
  }
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`https://3ppqsh-3000.csb.app/products/${id}`);
  }
}
