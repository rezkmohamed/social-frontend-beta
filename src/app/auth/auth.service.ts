import { Injectable, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { Profile } from "../main/models/profile.model";
import { ProfilesService } from "../main/profiles.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnInit{
    defaultPassword: string = "password";


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
        console.log(email);
        console.log(password);
        let flag = new Subject<boolean>();
        //FIXME
        this.profilesService.login(email, password).subscribe(response => {
            console.log(response);
            let profile = new Profile(null, null, null, null, null, email);
            localStorage.setItem("sessione", JSON.stringify(profile));
            flag.next(true);
        });
        return flag.asObservable();
    }

    logout(){
        localStorage.removeItem("sessione");
    }

    resetPassword(){
        
    }
}