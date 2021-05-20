import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "../auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
    @ViewChild('authForm') loginForm: NgForm;
    errorLogin: boolean = false;
    loginSubscription: Subscription;

    constructor(private authService: AuthService, private router: Router){}

    ngOnInit(): void {
    }
    
    onSubmit(){
        const email = this.loginForm.value.email;
        const password = this.loginForm.value.password;
        this.loginSubscription = this.authService.login(email, password).subscribe(response => {
            console.log(response);
            if(response){
                let user: {email: string, password: string, id: number} = JSON.parse(localStorage.getItem("sessione"));
                let idUser: number = user.id;
                //this.router.navigate([`/profiles/${idUser}`]);
            } else {
                this.errorLogin = true;
            }
        })
    }

    ngOnDestroy(): void { 
        this.loginSubscription ? this.loginSubscription.unsubscribe() : null;
    }
}