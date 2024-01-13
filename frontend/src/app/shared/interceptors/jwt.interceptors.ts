import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { httpOptions } from '../constants/urls';
import { UserService } from 'src/app/services/user.service';
const authToken = 'User';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private userService: UserService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user = this.userService.userValue;
        const isLoggedIn = user && localStorage.getItem(authToken);

        if (isLoggedIn) {
            request = request.clone({
                setHeaders: { Authorization: `${localStorage.getItem(authToken)}`,
                              'Content-Type': 'application/json'
                            }
            });
            httpOptions.headers = request.headers
        }

        return next.handle(request);
    }
}
