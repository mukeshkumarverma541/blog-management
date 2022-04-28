import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../inteface/auth-response';
import { User } from '../models/user.model';
import { ErrorServiceService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<any>(null);
  profileInfo = new BehaviorSubject({
    displayName : '',
    email : '',
    photoUrl: '',

  })

 private tokenExpirationTimer :any;
  
  constructor(private http: HttpClient, private errService : ErrorServiceService, private router: Router) { 

  }

  signUp(email:any, password:any){
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.API_KEY}`, {
       email: email,
       password: password,
       returnSecureToken	: true
     }
    ).pipe(
      catchError(err => {
        return this.errService.handleError(err)
      }),
      tap(res => {
        this.authenticatedUser(res.email, res.localId, res.idToken, +res.expiresIn)
      })
    )
  }

    signIn(email:any, password:any){
      return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.API_KEY}`, {
         email: email,
         password: password,
         returnSecureToken	: true
       }
      ).pipe(
        catchError(err => {
          return this.errService.handleError(err)
        }),
        tap(res => {
          this.authenticatedUser(res.email, res.localId, res.idToken, +res.expiresIn)
        })
      )
    }


     private authenticatedUser(email:any, userId: any, token: any, expiresIn: any) {
      const expirationDate = new Date(new Date().getTime() + expiresIn*1000);
      const user = new User(email, userId, token, expiresIn)
      console.log(user);
      this.user.next(user); 
      this.autoSignOut(expiresIn*1000);
      localStorage.setItem('userData', JSON.stringify(user));  
      this.getUserData(token);
    }


    autoSignIn(){
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      console.log(userData);

      if(!userData) {
        return;
      }

      const loggedInUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

      if(loggedInUser._token) {
        this.user.next(loggedInUser);    

        this.getUserData(loggedInUser._token);
        console.log(userData);

        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.autoSignOut(expirationDuration);

      }
      
    }   
    

    signOut(){
      this.user.next(null);
      this.router.navigate(['']);
       localStorage.removeItem('userData'); 

       if(this.tokenExpirationTimer){
         clearTimeout(this.tokenExpirationTimer);
       }
       this.tokenExpirationTimer = null;

    }

    autoSignOut(expirationDuration: number){
      this.tokenExpirationTimer =  setTimeout(() => {
        this.signOut(); 
      }, 3000000);
    } 


    updateProfile(data:any){
      return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.API_KEY}`, {
          idToken: data.token,
          displayName: data.name,
          photoUrl : data.picture,
          returnSecureToken : true
        }).pipe(
          catchError(err =>{
            return this.errService.handleError(err);
          })
        )
    }

    getUserData(token:any){
      return  this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.API_KEY}`, {
          idToken: token
        }).subscribe(res => { 
          console.log(res);
            this.profileInfo.next({
              displayName : res.providerUserInfo[0].displayName,
              email : res.providerUserInfo[0].email,
              photoUrl: res.providerUserInfo[0].photoUrl,
            })
          })
    }
    
    changePassword(data:any){
     return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.API_KEY}`, {
        idToken: data.idToken,
        password: data.password,
        returnSecureToken: true
      }).pipe(
        catchError(err => {
          return this.errService.handleError(err);
        })
      )
    }

    forgotPassword(data:any) {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${environment.API_KEY}`, {
        requestType : 'PASSWORD_RESET',
        email : data.email
      }).pipe(
        catchError(err => {
          return this.errService.handleError(err);
          
        })
      )
    }

    googleSignIn(idToken:any){
      return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=${environment.API_KEY}`, {
        postBody:`id_token=${idToken}&providerId=google.com`,
        requestUri:'http://localhost:4200',
        returnIdpCredential:true,
        returnSecureToken:true
      })
    }
    
}


