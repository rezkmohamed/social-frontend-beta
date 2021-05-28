import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { User } from "../main/models/user.model";
import { ProfilesService } from "../main/profiles.service";
import { format, compareAsc, addMinutes } from 'date-fns'
import { add } from "date-fns/esm";
import { Profile } from "../main/models/profile.model";
import jwt_decode  from "jwt-decode";
import { HttpClient } from "@angular/common/http";

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
    private urlBase: string = "http://localhost:8080/";
    defaultPassword: string = "password";
    user = new BehaviorSubject<User>(null);
    //private tokenExpirationTimer: any;


    constructor(private profilesService: ProfilesService, private router: Router, private http: HttpClient){}

    ngOnInit(): void {
    }
    
    signup(email: string, password: string, username: string){
        let nickname = username;
        return this.profilesService.createAccount(username, nickname, email, password)
    }

    

    login(email: string, password: string){
        return this.http.post<any>(this.urlBase + "login" ,
            {
                email: email,
                pass: password
            },
            { observe: 'response' }
        );
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

            this.profilesService.setProfileLogged(loadedUser);
            /*this.profilesService.fetchAccount(loadedUser.id).subscribe(response => {
                let responseProfile: Profile = new Profile(response.id, response.name, response.nickname, response.bio, response.proPic, response.email);
                this.profilesService.setProfileLogged(responseProfile);
            })*/
            
            //const expirationDuration =        
            //new Date(loadedUser.tokenExpirationDate).getTime() -
            //new Date().getTime();
            //console.log("expiration duration: "+ +JSON.parse(localStorage.getItem('userData'))._tokenExpirationSeconds);
            this.autoLogout(JSON.parse(localStorage.getItem('userData'))._tokenExpirationSeconds);
        }
    }

    logout(){
        this.user.next(null);
        localStorage.removeItem("userData");
        this.router.navigate(['/auth/login']);
        console.log("logging out.");
    }

    autoLogout(expirationDuration: number){
        setTimeout(() => {
            this.logout();
            //debugger
        }, expirationDuration);
    }

    resetPassword(){
        
    }
}