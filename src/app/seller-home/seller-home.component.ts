import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | product[];
  showDeleteProduct: boolean = false;
  icon = faTrash;
  constructor(private _product: ProductService) {}
  ngOnInit(): void {
    this._product.getProduct().subscribe((result) => {
      this.productList = result;
      console.log(this.productList);
    });
  }
  deleteProduct(id: number) {
    this._product.deleteProduct(id).subscribe((result) => {
      this._product.getProduct().subscribe((result) => {
        this.showDeleteProduct = true;
        this.productList = result;
        console.log(this.productList);
        setTimeout(() => {
          this.showDeleteProduct = false;
        }, 3000);
      });
    });
  }
}
