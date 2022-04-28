import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  categories:any;

  addPost !: FormGroup;


  constructor(private apiService: ApiService, private fb: FormBuilder, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    
    this.addPost = this.fb.group({
      title : ['', Validators.required],
      category : ['', Validators.required],
      authorName : ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
      postDate: [new Date()]
    })

    this.getCategories();

  }

  onAddPost(){
    this.apiService.addPost(this.addPost.value).subscribe(data => {
      console.log(data);
      this.toastr.success('post added successfully');
      this.router.navigate(['posts']);
    })
  }

  getCategories(){
    this.apiService.fetchCategory().subscribe(data => {
      console.log(data);
      this.categories = data;
    })
  }
  
}
