import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.css']
})
export class PostCategoryComponent implements OnInit {

  addCat !: FormGroup;
  categories: any;

  constructor(private apiService: ApiService, private fb: FormBuilder, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.showCatgeories();
    
    
    this.addCat = this.fb.group({
      category: ['', Validators.required]
    })
    
  }

  addCategory(){
    this.apiService.addCategory(this.addCat.value).subscribe(data => {
      console.log(data);
      this.toaster.success('Category added successfully')
      this.showCatgeories();
    })
  }

  showCatgeories(){
    this.apiService.fetchCategory().subscribe(data => {
      console.log(data);
      this.categories = data;
    })
  }


}
