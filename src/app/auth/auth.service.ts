import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { User } from "../main/models/user.model";
import { ProfilesService } from "../main/profiles.service";
import { format, compareAsc, addMinutes } from 'date-fns'
import { add } from "date-fns/esm";
import { Profile } from "../main/models/profile.model";
import jwt_decode  from "jwt-decode";

class responseAuth {
    constructor(
        public exp: number,
        public iat: number,
        public idUser: string,
        public nickname: string
    ){}
}

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
            let decoded: responseAuth = jwt_decode(token);
            console.log(decoded);

            let date: Date = add(new Date(), {seconds: decoded.exp});
            console.log(date);
            let userLogged: User = new User(email, decoded.nickname, decoded.idUser, token, date);

            //let userLogged: User = new User(decoded.);
            this.user.next(userLogged);
            localStorage.setItem("userData", JSON.stringify(userLogged));
            this.router.navigate(['/homepage']);
            flag.next(true);
        });
        return flag.asObservable();
    }

    autoLogin(){
        const userData: {email: string, id: string, nickname: string ,_token: string, _tokenExpirationDate: Date} = JSON.parse(localStorage.getItem('userData'));
        //caso in cui non c'è utente, esco dal metodo.
        console.log(userData);
        if(!userData){
            console.log("no user found");
            return;
        }

        const loadedUser = new User(userData.email, userData.nickname, userData.id, userData._token, userData._tokenExpirationDate);
        console.log(loadedUser.token);
        if(loadedUser.token){
            console.log("user found");
            this.user.next(loadedUser);

            this.profilesService.fetchAccount(loadedUser.id).subscribe(response => {
                let responseProfile: Profile = new Profile(response.id, response.name, response.nickname, response.bio, response.proPic, response.email);
                this.profilesService.setProfileLogged(responseProfile);
            })
            

            const expirationDuration =        
            new Date(loadedUser.tokenExpirationDate).getTime() -
            new Date().getTime();
            console.log("expiration duration: " + expirationDuration);
            this.autoLogout(expirationDuration);
        }
    }

    logout(){
        //this.user.next(null);
        //localStorage.removeItem("userData");
        //this.router.navigate(['/auth/login']);
    }

    autoLogout(expirationDuration: number){
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
            console.log("i'm calling the logout method.");
        }, expirationDuration);
    }

    resetPassword(){
        
    }
}