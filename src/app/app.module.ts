import { BrowserModule } from '@angular/platform-browser';
import { NgModule,  Pipe, PipeTransform } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms'


import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { BlogComponent } from './components/blog/blog.component';
import { NewBlogComponent } from './components/new-blog/new-blog.component';
import { ViewBlogComponent } from './components/view-blog/view-blog.component';
import { BlogserviceService } from './services/blogservice.service';
import { UsersService } from './services/user.service'
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { SafeHtmlPipe } from './pipes/safe-html.pipe'

const appRoutes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'blog',  component: BlogComponent },
  { path: 'blog/new', canActivate: [ AuthGuard ], component: NewBlogComponent },
  { path: 'blog/view/:id', component: ViewBlogComponent },
  { path: 'register', canActivate: [ AuthGuard ], component: RegisterComponent},

]


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NavbarComponent,
    LoginComponent,
    BlogComponent,
    NewBlogComponent,
    ViewBlogComponent,
    RegisterComponent,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  providers: [
    BlogserviceService,
    UsersService,
    AuthGuard
  ],
  exports: [
    SafeHtmlPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
