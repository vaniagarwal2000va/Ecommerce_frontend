import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

import { product } from '../data-type';
@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent implements OnInit {
  addProductSuccess: boolean = false;
  constructor(private _product: ProductService) {}
  ngOnInit(): void {
    this._product.productAddedFlag.subscribe((value) => {
      this.addProductSuccess = value;
      setTimeout(() => {
        this.addProductSuccess = false;
      }, 3000);
    });
  }
  submitProduct(data: product) {
    this._product.addProduct(data);
  }
}
