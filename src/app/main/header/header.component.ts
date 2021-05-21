import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";

@Component({
    selector: 'app-header-component',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @ViewChild('f') searchForm: NgForm;
    //idSession: string = JSON.parse(localStorage.getItem("sessione")).id.toString();
    idSession: string = "3a751805-3141-41e4-ac94-9cee1bd262a0";

    constructor(private authService: AuthService ,private router: Router) { }

    ngOnInit(): void {
    }

    onSubmit(){
        console.log(this.searchForm.value.search);
        this.router.navigate(['/profiles/search', this. searchForm.value.search]);
        this.searchForm.reset();
    }

    onLogout(){
        this.authService.logout();
        this.router.navigate(['/auth/login']);
    }
}