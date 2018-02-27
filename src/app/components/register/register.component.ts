import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Observable } from 'rxjs/Observable'
import { setTimeout } from 'timers';
import { CanActivate, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errors: Observable<any>;

  constructor(private usersService: UsersService,
    private flashMsg: FlashMessagesService,
    private router: Router,) { }

  ngOnInit() {
  }

  register(email, password, password2, username) {

    if (password != password2) {
      this.flashMsg.show('Passwords Do not match!', { cssClass: 'alert-danger', timeout: 3500 });
    }
    else if (email && password && username) {
      this.usersService.register(email, password, username)
        .subscribe(res => {
          if (res == false) {
            this.flashMsg.show('Email in use', { cssClass: 'alert-danger', timeout: 3500 });
          }
          else {
            this.flashMsg.show('User Created :)', { cssClass: 'alert-success', timeout: 3500 });
          }
        })
    } else {
      this.flashMsg.show('Please complete all fields', { cssClass: 'alert-danger', timeout: 3500 });
    }
  }


}
