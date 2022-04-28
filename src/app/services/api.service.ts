import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // categories = ['Tech', 'Health', 'Movie', 'Entertainment'];

  baseUrl ='https://blog-management-angular-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) { }

  addPost(val:any){
   return this.http.post(this.baseUrl + 'posts.json', val).pipe(map((res:any) => {
      return res;
    }))
  }

  fetchPosts(){
   return this.http.get(this.baseUrl + 'posts.json').pipe(map((res:any) =>{
      const postArr = [];
      for(const key in res) {
        if(res.hasOwnProperty(key)) {
            postArr.push({postId: key, ...res[key]})
        }
      }
      return postArr;
    }))
  }

  fetchSinglePost(postId:any){
   return this.http.get(this.baseUrl + 'posts/' + postId + '.json').pipe(map((res:any) => {
      return res;
      console.log(res);    
    }))
  }

  addCategory(val:any){
   return this.http.post(this.baseUrl + 'categories.json', val).pipe(map((res:any) => {
      return res;
    }))
  }

  fetchCategory(){
    return this.http.get(this.baseUrl + 'categories.json').pipe(map((res:any) => {
      const catArr = [];
      for(const key in res) {
        if(res.hasOwnProperty(key)) {
          catArr.push({categoryId: key, ...res[key]})
        }
      }
      return catArr;
      console.log(catArr);
    }))
  }  

  showCategoryProduct(catId:any) {
    this.http.get(this.baseUrl + 'posts.json').pipe(map((res:any) => {
      const productArr = [];
      for(const key in res) {
        if(res.hasOwnProperty(key)) {
          productArr.push({postId: key, ...res[key]})
        }
      } return productArr;
      console.log(productArr);
    }))
  }


}
