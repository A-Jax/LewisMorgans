import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http'
import { CanActivate, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  constructor(private http: Http, private router: Router, private flashMsg: FlashMessagesService) { }

  authtoken;
  user;
  options;

  loggedIn() {
    return tokenNotExpired();
  }

  createAuthenticationHeaders() {
    this.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': this.authtoken
      })
    })
  }
// Function to get token from client local storage
  loadToken() {
    const token = localStorage.getItem('token');
    this.authtoken = token;
  }

  login(user) {

    return this.http.post('/user/login', user)
      .map(res => res.json())

  }

  register(email, password, username): any {
    return this.http.post('/user/register', {
      email: email,
      password: password,
      username: username
    })
  }

  logout() {
    this.authtoken = null;
    this.user = null;
    localStorage.clear();
    this.router.navigate(['/'])

  }

  // Function to store user's data in client local storage
  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user))
    this.authtoken = token;
    this.user = user;
  }

  getProfile() {
    this.createAuthenticationHeaders();
    return this.http.get('/user/profile', this.options)
      .map(res => res.json());
  }

}