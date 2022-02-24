import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostComponent } from './components/post/post.component';
import { CommentsComponent } from './components/comments/comments.component';
import { VoteComponent } from './components/vote/vote.component';
import { ToastComponent } from './components/toast/toast.component';
import { CommunityComponent } from './components/community/community.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommunityFormComponent } from './components/community-form/community-form.component';
import { PostFormComponent } from './components/post-form/post-form.component';

import { SearchpipePipe } from './pipes/searchpipe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    PostComponent,
    CommentsComponent,
    VoteComponent,
    PostListComponent,
    ToastComponent,
    CommunityComponent,
    CommunityFormComponent,
    PostFormComponent,
    SearchpipePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
