import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  Form !: FormGroup;

  token = JSON.parse(localStorage.getItem('userData') || '{}')._token;
  

  constructor(private fb: FormBuilder, private authService: AuthService, private ts: ToastrService) { }

  ngOnInit(): void {
    this.Form = this.fb.group({
      password : ['', Validators.required]
    })
    // console.log(this.token);l
  }

  onSubmit(){
    if(this.Form.valid) {
      const data = {idToken: this.token, ...this.Form.value};
      console.log(data);
       this.authService.changePassword(data).subscribe(res => {
         console.log(res);
         this.ts.success('Change password successfully !')
       }, err => {
         console.log(err);
         this.ts.error(err)
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
