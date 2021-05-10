import { Injectable, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { Profile } from "../main/models/profile.model";
import { ProfilesService } from "../main/profiles.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnInit{
    defaultPassword: string = "password";
    private urlBase: string = "http://localhost:8080/";


    constructor(private profilesService: ProfilesService){}

    ngOnInit(): void {

    }
    
    signup(email: string, password: string, username: string){
        let newProfile: Profile = new Profile(null, username, username, null, null, email);
        this.profilesService.createAccount(newProfile).subscribe(response => {
            console.log(response);
        });
    }

    //FIXME
    login(email: string, password: string){
        console.log(email);
        console.log(password);
        let flag = new Subject<boolean>();
        let found: boolean = false;
        //FIXME
        this.profilesService.login(email, password).subscribe(response => {
            console.log(response);
            let profile = new Profile(null, null, null, null, null, email);
            localStorage.setItem("sessione", JSON.stringify(profile));
            flag.next(true);
            found = true;
        });
        return flag.asObservable();

    }

    logout(){
        localStorage.removeItem("sessione");
    }

    resetPassword(){
        
    }
}