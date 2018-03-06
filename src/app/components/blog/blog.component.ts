import { Component, OnInit } from '@angular/core';
import { BlogserviceService } from '../../services/blogservice.service';
import { UsersService } from '../../services/user.service'
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe'

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  allBlogs;

  constructor(private blogs: BlogserviceService, private usersService: UsersService) { }

  isLoggedin: boolean;

  ngOnInit() {
    this.findAll();
    this.usersService.getProfile()
    .subscribe(data => {
      if(!data.user.email) {
        this.isLoggedin = false;
      } else {
        this.isLoggedin = true;
      }
    })
    
  }

  findAll() {
    this.blogs.getBlogs()
    .subscribe(res => this.allBlogs = res);
  }

  viewMore() {
    console.log('working route')
  }

  deletePost(id) {
    
    this.blogs.deleteBlog(id)
    .subscribe(() => {
      this.findAll();
    })
  }

}
