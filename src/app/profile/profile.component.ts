import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  Form!: FormGroup;
  editMode: boolean = false;
  profile :any;

  token = JSON.parse(localStorage.getItem('userData') || '{}')._token;
    

  constructor(private router: Router, private fb: FormBuilder, private activatedRoute: ActivatedRoute, private authService: AuthService, private ts : ToastrService) {
    this.authService.profileInfo.subscribe(res => {
      this.profile= res;
      console.log(this.profile)
    })
   }

  ngOnInit(): void {
    this.Form = this.fb.group({
      name: ['', Validators.required],
      picture : ['', Validators.required]
    })

    console.log(this.token);

    this.activatedRoute.queryParamMap.subscribe(res => {
        let queryParams = res.get('editMode');
        
      if(queryParams !==null) {
        this.editMode = true
      }
      else {
        this.editMode = false;
      }

      console.log(queryParams);
    })
  
  }
  onDiscard(){
    console.log(this.Form);
    this.router.navigate([], {queryParams: {EditMode: false}})
  }

  onSubmit(){
    if(this.Form.valid) {
      console.log(this.Form.value);

      const uData = {token: this.token, ...this.Form.value}

      this.authService.updateProfile(uData).subscribe(res => {
        console.log(res)
          this.ts.success('Profile update successfully');
          this.router.navigate(['posts'])
      }, err => {
        console.log(err)
      })
    }
  }

}
