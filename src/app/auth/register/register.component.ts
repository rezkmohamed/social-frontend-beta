import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    @ViewChild('f') registraForm: NgForm;
    emailExists: boolean = false;
    signupRequest: boolean = false;
    BAD_REQUEST: number = 400;

    constructor(private authService: AuthService, private router: Router){}

    ngOnInit(): void {
    }

    onSubmit(){
        if(this.registraForm.value.password !== this.registraForm.value.confermapassword){
            console.log("password non valida");
            return;
        }

        const email = this.registraForm.value.email;
        const password = this.registraForm.value.password;
        const nickname = this.registraForm.value.username;
        this.authService.signup(email, password, nickname).subscribe(response => {
            this.signupRequest = true;
            this.emailExists = false;
            //this.router.navigate(['/auth/login']);
        }, error => {
            if(error.status === this.BAD_REQUEST){
                this.signupRequest = true;
                this.emailExists = true;
            }
        });
    }

    onNavigate(){
        this.router.navigate(['/auth/login']);
    }
    
}