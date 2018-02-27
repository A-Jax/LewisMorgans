import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CanActivate, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private usersService: UsersService, private flashMsg: FlashMessagesService,  private router: Router) { }
  
  isLoggedin: boolean;

  ngOnInit() {
    this.usersService.getProfile()
    .subscribe(data => {
      if(!data.user.email) {
        this.isLoggedin = false;
      } else {
        this.isLoggedin = true;
      }
    })
  }
  
  logout() {
    // this.isLoggedin = false;
    this.usersService.logout();
    this.router.navigate(['']);
    window.location.reload();

  }




}
