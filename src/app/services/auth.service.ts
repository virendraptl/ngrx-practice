import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { authResponseData } from '../modals/authResponseData.modal';
import { User } from '../modals/user.modal';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    console.log('key is:', environment.FIREBASE_API_KEY);
    return this.http.post<authResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}
`,
      { email, password, returnSecureToken: true }
    );
  }

  formatUser(data:authResponseData){
    const expirationDate = new Date(new Date().getTime() + +data.expiresIn * 1000 )
    const user = new User(data.email, data.idToken, data.localId, expirationDate);
    return user;
  }

  getErrorMessage(message:string){
    switch(message){
      case 'EMAIL_NOT_FOUND': 
        return 'Email Not Found'
      
      case 'INVALID_PASSWORD':
        return 'Password is invalid'

      case 'USER_DISABLED':
        return 'Account is disabled by the Admin'

      default :
        return 'Unknown error. Please rety'
    }
  }
}
