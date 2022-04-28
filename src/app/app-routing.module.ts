import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './add-post/add-post.component';
import { AdminModule } from './admin/admin.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { PostSingleComponent } from './post-single/post-single.component';
import { PostsArchiveComponent } from './posts-archive/posts-archive.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './services/auth.guard';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '', component: SigninComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'posts', component: PostsArchiveComponent, canActivate: [AuthGuard]
  },
  {
    path: 'post/:id', component: PostSingleComponent 
  },
  {
    path: 'add-post', component: AddPostComponent 
  },
  {
    path:'signup', component: SignupComponent
  },
  {
    path: 'signin', component: SigninComponent
  },
  {
    path: 'profile', component: ProfileComponent
  },
  {
    path: 'change-password', component: ChangePasswordComponent
  },
  {
    path:'forgot-password', component: ForgotPasswordComponent
  },
  {
    path: 'admin', loadChildren : () => import('./admin/admin.module').then (m =>m.AdminModule )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
