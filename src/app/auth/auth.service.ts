import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { User } from "../main/models/user.model";
import { ProfilesService } from "../main/profiles.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnInit{
    defaultPassword: string = "password";
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;


    constructor(private profilesService: ProfilesService){}

    ngOnInit(): void {
    }
    
    signup(email: string, password: string, username: string){
        let nickname = username;
        this.profilesService.createAccount(username, nickname, email, password).subscribe(response => {
            console.log(response);
        });
    }

    //FIXME
    login(email: string, password: string){
        let startingToken: number = 7;
        let flag = new Subject<boolean>();
        //FIXME
        this.profilesService.login(email, password).subscribe(response => {
            console.log(response.headers.get("Authentication"));
            let token: string = response.headers.get("Authentication").substring(startingToken, response.headers.get("Authentication").length);
            let user: User = new User(email, token, null);
            localStorage.setItem("sessione", JSON.stringify(user));
            flag.next(true);
        });
        return flag.asObservable();
    }

    autoLogin(){

    }

    logout(){
        localStorage.removeItem("sessione");
    }

    autoLogout(){
        
    }

    resetPassword(){
        
    }
}