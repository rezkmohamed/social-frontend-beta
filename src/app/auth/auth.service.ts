import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { User } from "../main/models/user.model";
import { ProfilesService } from "../main/profiles.service";
import { format, compareAsc, addMinutes } from 'date-fns'
import { add } from "date-fns/esm";


@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnInit{
    defaultPassword: string = "password";
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;


    constructor(private profilesService: ProfilesService, private router: Router){}

    ngOnInit(): void {
    }
    
    signup(email: string, password: string, username: string){
        let nickname = username;
        return this.profilesService.createAccount(username, nickname, email, password)
    }

    //FIXME
    login(email: string, password: string){
        let startingToken: number = 7;
        let flag = new Subject<boolean>();
        //FIXME
        this.profilesService.login(email, password).subscribe(response => {
            console.log(response.headers.get("Authentication"));
            let token: string = response.headers.get("Authentication").substring(startingToken, response.headers.get("Authentication").length);
            let date: Date = add(new Date(), {minutes: 150});
            console.log(date);
            let userLogged: User = new User(email, token, date);
            this.user.next(userLogged);
            localStorage.setItem("sessione", JSON.stringify(userLogged));
            flag.next(true);
            this.router.navigate(['/homepage']);
        });
        return flag.asObservable();
    }

    autoLogin(){
        const userData: {email: string, _token: string, _tokenExpirationDate: string} = JSON.parse(localStorage.getItem('sessione'));
        //caso in cui non c'è utente, esco dal metodo.
        console.log(userData);
        if(!userData){
            console.log("no user found");
            return;
        }

        const loadedUser = new User(userData.email, userData._token, new Date(userData._tokenExpirationDate));
        console.log(loadedUser.token);
        if(loadedUser.token){
            console.log("user found");
            this.user.next(loadedUser);

            const expirationDuration =        
            new Date(loadedUser.tokenExpirationDate).getTime() -
            new Date().getTime();

            this.autoLogout(expirationDuration);
        }
    }

    logout(){
        this.user.next(null);
        localStorage.removeItem("sessione");
        this.router.navigate(['/auth/login']);
    }

    autoLogout(expirationDuration: number){
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    resetPassword(){
        
    }
}