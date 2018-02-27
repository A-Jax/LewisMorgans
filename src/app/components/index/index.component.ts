import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private flashMsg: FlashMessagesService, private http: HttpClient) { }

  ngOnInit() {

    $(document).ready(function () {

      $("a").click(function () { // click event on links

        var target = $(this.hash); // store link id location (this hash)

        $("html, body").animate({ // html and body to cover all browsers
          scrollTop: $(target).offset().top // scroll from top, to target location (offset)
        }, 700); // milisecond timer

        return false; // return false. no info to be used.

      });
    });
  }

  email;
  name;
  subject;
  message;

  sendEmail(email, name, subject, message) {

    this.http.post('/contact', {
      email: email,
      name: name,
      subject: subject,
      message: message,
     
    })
      .subscribe((res) => {
        if (res == false) {
          this.flashMsg.show('Oops! message not sent :(',
            { cssClass: 'alert-danger', timeout: 3500 });
        } else if (res == true) {

          this.email = '';
          this.name = '';
          this.subject = '';
          this.message = '';

          this.flashMsg.show('Message sent :)',
            { cssClass: 'alert-success', timeout: 3500 });
        }
      })
  }



}
