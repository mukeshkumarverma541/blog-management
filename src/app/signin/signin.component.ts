import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthResponse } from '../inteface/auth-response';
import { AuthService } from '../services/auth.service';
import { GoogleLoginProvider, SocialAuthService } from "angularx-social-login";


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signIn!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private ts: ToastrService, private socialAuthService : SocialAuthService  ) { }

  ngOnInit(): void {
    this.signIn = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }
  onSubmit() {
    if(this.signIn.valid) {
      const email = this.signIn.value.email;
      const password = this.signIn.value.password;

      let authObservable : Observable<AuthResponse>;

      authObservable = this.authService.signIn(email, password);

      authObservable.subscribe(res => {
        console.log(res);
        this.router.navigate(['posts']);
        this.ts.success('Signin Successfully')
      }, err => {
          console.log(err);
          this.ts.error(err);
      })

    }
  }

  onGoogleSignIn(){
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
      console.log(user);
      this.authService.googleSignIn(user.idToken).subscribe(res => {
        console.log(res)
      }, 
      err => {
        console.log(err);
      })
    });
  }

}
