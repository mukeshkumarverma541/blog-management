import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  Form !: FormGroup;

  token = JSON.parse(localStorage.getItem('userData') || '{}')._token;
  

  constructor(private fb: FormBuilder, private authService: AuthService, private ts: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.Form = this.fb.group({
      email : ['', Validators.required]
    })
    
  }

  onSubmit(){
    if(this.Form.valid) {
      const data = {idToken: this.token, ...this.Form.value};
      console.log(data);
       this.authService.forgotPassword(data).subscribe(res => {
         console.log(res);  
          this.ts.success('Email sent successfully !');
          this.router.navigate(['posts'])
       }, err => {
          this.ts.error(err);
       })
    }
    else {
     let key = Object.keys(this.Form.controls);
     key.filter(data => {
       let controls= this.Form.controls[data];
       if(controls.errors !=null) {
         controls.markAsTouched();
       }
     }) 
    }
  }

}
