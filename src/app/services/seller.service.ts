import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerSignedIn = new BehaviorSubject(false);
  isLoginFailed = new BehaviorSubject(false);
  isSignUpFailed = new BehaviorSubject(false);
  constructor(
    private http: HttpClient,
    private _route: Router,
  ) {}

  userSignUp(data: signUp) {
    const checkLoginData = { email: data.email, password: data.password };
    this.userLogin(checkLoginData, true);
    if (!this.isSignUpFailed.asObservable()) {
      return this.http
        .post('https://3ppqsh-3000.csb.app/seller', data, {
          observe: 'response',
        })
        .subscribe((result) => {
          this.isSellerSignedIn.next(true);
          localStorage.setItem('seller', JSON.stringify(result.body));
          this._route.navigate(['seller-home']);
          console.log(result);
        });
    } else {
      return '';
    }
  }

  userLogin(data: login, isSignUpCall = false) {
    return this.http
      .get(
        `https://3ppqsh-3000.csb.app/seller?email=${data.email}&password=${data.password}`,
        { observe: 'response' },
      )
      .subscribe((result: any) => {
        if (result && result.body && result.body.length) {
          if (isSignUpCall) {
            this.isSignUpFailed.next(true);
          } else {
            this.isLoginFailed.next(false);
            this.isSellerSignedIn.next(true);
            localStorage.setItem('seller', JSON.stringify(result.body));
            this._route.navigate(['seller-home']);
          }
        } else {
          if (isSignUpCall) {
            this.isSignUpFailed.next(false);
          } else {
            this.isLoginFailed.next(true);
          }
        }
      });
  }
  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerSignedIn.next(true);
      this._route.navigate(['seller-home']);
    }
  }
}
