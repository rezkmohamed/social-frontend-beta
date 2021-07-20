import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { User } from "../main/models/user.model";
import { HttpClient } from "@angular/common/http";
import { ProfilesService } from "../main/services/profiles.service";
import { environment } from "src/environments/environment";
import { StorageData } from "../main/models/storage-data.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnInit{
    private urlBase: string = environment.urlBase;
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

    /**
     * FIXME:
     * GET USER DATA FROM BACKEND AND UPDATE user VARIABLE.
     */
    autoLogin(){
        const userData: StorageData = JSON.parse(localStorage.getItem('userData'));
        if(userData){
          if(userData._token){
              this.user.next(new User(null, null, null, userData._token, userData._tokenExpirationDate));
              this.profilesService.fetchLoggedProfile(userData._token).subscribe(response => {
                console.log(response);
                if(response){
                    const loadedUser = new User(response.email, response.nickname, response.id, userData._token, userData._tokenExpirationDate);
                    loadedUser.proPic = response.proPic;
                    this.user.next(loadedUser);
                    console.log(this.user.value);
                    this.autoLogout(JSON.parse(localStorage.getItem('userData'))._tokenExpirationSeconds);
                }
            }, err => {
                console.log(err);
            })
          }
        }
        //caso in cui non c'è utente, esco dal metodo.
        //console.log(userData);
        /*if(!userData){
            console.log("no user found");
            return;
        }

        const loadedUser = new User(userData.email, userData.nickname, userData.id, userData._token, userData._tokenExpirationDate);
        console.log(loadedUser.token);
        if(loadedUser.token){
            console.log("user found");
            this.user.next(loadedUser);

            //this.profilesService.setProfileLogged(loadedUser);
            this.autoLogout(JSON.parse(localStorage.getItem('userData'))._tokenExpirationSeconds);
        }*/
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

    resetPassword(email: string){
        return this.http.put<any>(this.urlBase + "resetpassword", email,
        { observe: 'response' }
        );

    }
}
