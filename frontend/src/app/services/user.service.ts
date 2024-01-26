import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interface/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL, USER_LOGIN_WITH_GOOGLE, USER_REGISTER_URL } from '../shared/constants/urls';
import {jwtDecode} from 'jwt-decode';
import { IUserRegister } from '../shared/interface/IUserRegister';
import { Router } from '@angular/router';

const USER_KEY = 'User'
const Cart = 'Cart'
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable:Observable<User>;
  constructor(private http: HttpClient, private router: Router) {
    this.userObservable = this.userSubject.asObservable();
   }

   register(userRegister:IUserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user)
          this.userSubject.next(user)
        },
        error: (errorResponse) => {
          return throwError(() => errorResponse);
        }
      })
    )
   }


   login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
        },
        error: (errorResponse) => {
          return throwError(() => errorResponse);
        }
      })
    );
  }

   logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
   }

   private setUserToLocalStorage(user:User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user.token));
   }

   private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) {
     const userJsonDecode = jwtDecode<User>(userJson)
    return userJsonDecode;
    };
    return new User();
   }

   public get userValue(): User {
    return this.userSubject.value;
}



handleLogin(resp: any) {
  this.http.post(USER_LOGIN_WITH_GOOGLE, resp).subscribe((response:any) => {
  localStorage.setItem(USER_KEY, JSON.stringify((response.token)))
   this.userSubject.next(response);
   setTimeout(() => {
    this.router.navigateByUrl('/');
  }, 2000);
})


}

}
