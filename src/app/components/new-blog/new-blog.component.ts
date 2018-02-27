import { Component, OnInit } from '@angular/core';
import { BlogserviceService } from '../../services/blogservice.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
declare var $: any;


@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.css']
})
export class NewBlogComponent implements OnInit {

  constructor(private blog: BlogserviceService, private router: Router, private flashMsg: FlashMessagesService) { }

  ngOnInit() {

    $('#summernote')
      .summernote({
        placeholder: 'What\'s on your mind?',
        tabsize: 2,
        height: 350
      });

  }
  title;
  info;
  textGroup: String;

  postNew(title) {

    var markupStr = $('#summernote').summernote('code');

    this.blog.addBlog(title, markupStr)
      .subscribe(() => {

        this.router.navigate(['blog']);
      })
    this.router.navigate(['blog']);

  }

  contentArea(event) {
    var text = '';
    text = event.target.value;
    console.log(text)
  }

}
