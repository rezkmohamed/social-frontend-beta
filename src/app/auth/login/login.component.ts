import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "../auth.service";
import jwt_decode  from "jwt-decode";
import { User } from "src/app/main/models/user.model";
import { add } from "date-fns/esm";
import { sub } from "date-fns";
import { ProfilesService } from "src/app/main/services/profiles.service";


class responseAuth {
    constructor(
        public exp: number,
        public iat: number,
        public idUser: string,
        public nickname: string
    ){}
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
    @ViewChild('authForm') loginForm: NgForm;
    errorLogin: boolean = false;
    loginSubscription: Subscription;

    constructor(private authService: AuthService, private router: Router, private profilesService: ProfilesService){}

    ngOnInit(): void {
    }
    

    login(){
        const startingToken: number = 7;
        const email = this.loginForm.value.email;
        const password = this.loginForm.value.password;

        this.authService.login(email, password).subscribe(response => {
            let auth: string = response.headers.get("Authentication");
            let token: string = auth.substring(startingToken, auth.length);
            let decoded: responseAuth = jwt_decode(token);

            let date: Date = add(new Date(Date.now()), {seconds: (decoded.exp * 0.001)});

            let userLogged: User = new User(email, decoded.nickname, decoded.idUser, token, date, decoded.exp);
            console.log(userLogged);

            this.profilesService.setProfileLogged(userLogged);
            this.authService.user.next(userLogged);

            localStorage.setItem("userData", JSON.stringify(userLogged));
            this.authService.autoLogout(decoded.exp);
            this.router.navigate(['/homepage']);
        }, error => {
            console.log(error);
            this.errorLogin = true;
        })
    }

    
    ngOnDestroy(): void { 
        this.loginSubscription ? this.loginSubscription.unsubscribe() : null;
    }
}