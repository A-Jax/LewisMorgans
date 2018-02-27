import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsersService } from '../services/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private usersService: UsersService, private flashMsg: FlashMessagesService, private router: Router){}

  canActivate(): boolean {
    if(this.usersService.loggedIn()) {
      return true
    } else {
      this.router.navigate(['']);
      this.flashMsg.show('Access Denied, Admin Access Required', { cssClass: 'alert-danger', timeout: 3500 });
      return false;
    }
  }
}