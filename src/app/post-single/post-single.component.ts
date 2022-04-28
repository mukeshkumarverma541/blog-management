import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-post-single',
  templateUrl: './post-single.component.html',
  styleUrls: ['./post-single.component.css']
})
export class PostSingleComponent implements OnInit {

  postId !: string;
  postDetails :any;
  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPostId();
    this.showPost();  
  }

  getPostId(){
    this.postId= this.activatedRoute.snapshot.params['id']; 
    console.log(this.postId);
  }

  showPost(){
    this.apiService.fetchSinglePost(this.postId).subscribe(data => {
      this.postDetails = data;
      console.log(data);
    })
  }

}
