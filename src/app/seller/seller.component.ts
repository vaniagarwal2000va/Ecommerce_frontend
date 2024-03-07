import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { signUp, login } from '../data-type';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css'],
})
export class SellerComponent implements OnInit {
  showLoginForm = false;
  isLoginFailed = false;
  isSignUpFailed = false;
  constructor(
    private _seller: SellerService,
    private _route: Router,
  ) {}
  ngOnInit(): void {
    this._seller.reloadSeller();
    this._seller.isLoginFailed.subscribe((value) => {
      this.isLoginFailed = value;
    });
    this._seller.isSignUpFailed.subscribe((value) => {
      this.isSignUpFailed = value;
    });
  }

  signUp(data: signUp): void {
    this._seller.userSignUp(data);
  }
  login(data: login): void {
    this._seller.userLogin(data);
  }
  showLogin() {
    this.showLoginForm = true;
  }
  showSignUp() {
    this.showLoginForm = false;
  }
}
