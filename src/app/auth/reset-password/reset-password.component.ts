import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "../auth.service";

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
    @ViewChild('f') resetForm: NgForm;
    errorReset: boolean = false;
    formSubmitted: boolean = false;
    resetPswSubscription: Subscription;

    constructor(private authService: AuthService, private router: Router){}

    ngOnInit(){}

    onSubmit(){
        this.authService.resetPassword(this.resetForm.value.email).subscribe(response => {
            this.formSubmitted = true;
            this.errorReset = false;
        }, err => {
            console.log(err);
            this.formSubmitted = true;
            this.errorReset = true;
        })
    }

    ngOnDestroy(){}

    onNavigate(){
        this.router.navigate(['/auth/login']);
    }
}