import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-posts-archive',
  templateUrl: './posts-archive.component.html',
  styleUrls: ['./posts-archive.component.css']
})
export class PostsArchiveComponent implements OnInit {

  posts :any;
  filterCat :any;
  user :any;

  constructor(private apiService: ApiService, private authService: AuthService) { 
    this.authService.profileInfo.subscribe(res => {
      this.user = res;
    })

  }

  ngOnInit(): void {
    this.showPosts();
    this.authService.autoSignIn();
  }

  showPosts() {
    this.apiService.fetchPosts().subscribe(data => {
      console.log(data);
      this.posts = data;
    })
  }

  showCatProd(catId:any) {
    this.apiService.fetchPosts().subscribe(data => {
      console.log(data);
    })
  }

  filter(category:string) {
    this.filterCat = this.posts.filter((a:any) => {
      console.log(a);
      if(a.category === category ) {
        return a;
      }
    })
    console.log(this.filterCat);
  }


}
