import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorServiceService {

  constructor() { }

  handleError(err: HttpErrorResponse){
    if(!err.error || !err.error.error) {
      return throwError(this.errorsMsg['UNKNOWN'])
        
      // this.error=  this.errMsgs['UNKNOWN'];
      // this.toaster.error(this.error); 
    }else {
      return throwError(this.errorsMsg[err.error.error.message]);
      // this.toaster.error(this.error); 
    }

  }

  errorsMsg : any = {
    UNKNOWN: 'An Unknown Error is Occured',
    EMAIL_EXISTS: 'This email is already Exists. Please try to different one.',
    OPERATION_NOT_ALLOWED: 'Password sign in disabled for this project',
    TOO_MANY_ATTEMPTS_TRY_LATER: 'We have blocked all requests form this device',
    EMAIL_NOT_FOUND: 'Email not found',
    INVALID_PASSWORD : 'Invalid Password',
    USER_DISABLED : 'This user account has been disabled'
  }
}
