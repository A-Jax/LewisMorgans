import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BlogserviceService {

  constructor(private http: HttpClient) { }

  getBlogs() {
    return this.http.get('/blog/find-all')
  }

  addBlog(title, content){
    return this.http.post('/blog/postNew', {
      title: title,
      content: content
    })
  }

  editBlog(){

  }

  deleteBlog(id){
   
    return this.http.post('blog/deleteBlog', {
      id: id
    }) 

    
  }

}
