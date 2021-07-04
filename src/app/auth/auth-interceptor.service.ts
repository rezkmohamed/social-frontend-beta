import { HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { take, exhaustMap } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler){
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                /**
                 * contesto non loggato
                 */
                if(!user){
                    return next.handle(req);
                }
                /**
                 * contesto loggato, aggiungo il token alla richiesta.
                 */
                console.log("user logged in")
                const modifiedReq = req.clone({
                    headers: new HttpHeaders().set('Authorization' , "Bearer " + user.token)
                });
                return next.handle(modifiedReq);
            })
        );
    }


}