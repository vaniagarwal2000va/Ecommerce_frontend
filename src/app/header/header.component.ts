import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuTypes: string = 'default';
  sellerName: string = '';
  constructor(private _router: Router) {}

  ngOnInit(): void {
    this._router.events.subscribe((value: any) => {
      if (value.url) {
        if (localStorage.getItem('seller') && value.url.includes('seller')) {
          this.menuTypes = 'seller';
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
        } else {
          this.menuTypes = 'default';
        }
      }
    });
  }
  logOut() {
    localStorage.removeItem('seller');
    this._router.navigate(['/']);
  }
}
