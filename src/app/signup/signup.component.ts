import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthResponse } from '../inteface/auth-response';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUp!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private ts: ToastrService) { }

  ngOnInit(): void {
    this.signUp = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(6)]]
    })
    this.onSubmit();
  }

  onSubmit() {
    console.log(this.signUp.value);
    if(this.signUp.valid) {
      const email = this.signUp.value.email;
      const password = this.signUp.value.password;

      let authObservable : Observable<AuthResponse>;

      authObservable = this.authService.signUp(email, password);

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
  

}
