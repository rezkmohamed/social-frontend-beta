import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { take, exhaustMap } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService){}

    /**
     * FIXME
     * @param req 
     * @param next 
     * @returns 
     */
    intercept(req: HttpRequest<any>, next: HttpHandler){
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                /**
                 * caso non loggato
                 */
                if(!user){
                    return next.handle(req);
                }
                /**
                 * contesto loggato, aggiungo il token alla richiesta.
                 */
                const modifiedReq = req.clone({
                    params: new HttpParams().set('Authorization', user.token)
                });
                return next.handle(modifiedReq);
            })
        );
    }


}