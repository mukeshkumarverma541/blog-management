import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categories:any;
  filterCat: any;
  posts:any;
  route: ActivatedRoute | null | undefined;
  params: any;
  isLoggedIn: boolean = false;

  constructor(private apiService: ApiService, private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {

    this.authService.user.subscribe(res => {
      console.log(res);
      if(res) {
        this.isLoggedIn = true;
      }
      else {
        this.isLoggedIn = false;
      }
    })

      this.showCategories();

      this.activatedRoute.params.subscribe(data => {
          this.params = data;
            console.log(data);
          console.log(this.params);
      })
  }

  signOut(){
    this.authService.signOut();
  }

  showCategories(){
    this.apiService.fetchCategory().subscribe(data => {
      console.log(data);
      this.categories = data;
      console.log(this.categories);
    })
  }

  
  showPosts() {
    this.apiService.fetchPosts().subscribe(data => {
      console.log(data);
      this.posts = data;
    })
  }
  
  filter(category:string) {
    this.filterCat = this.posts.filter((a:any) => {
      console.log(a);
      if(a.category === category || a.category =='') {
        return a;
      }
    })
    console.log(this.filterCat)
  }




}
