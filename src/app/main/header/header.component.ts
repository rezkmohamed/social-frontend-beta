import { Component ,OnDestroy,OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { NotificationsService } from "../services/notification.service";

@Component({
    selector: 'app-header-component',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
    @ViewChild('f') searchForm: NgForm;
    idLoggedUser: string = JSON.parse(localStorage.getItem('userData')).id.toString();
    newNotifications: Subscription;
    newNotificationsBoolean: boolean

    constructor(private authService: AuthService,
                private notificationsService: NotificationsService,
                private router: Router) {}

    ngOnInit(): void {
        this.newNotificationsBoolean = false;
        this.getNewNotifications();
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

    onNavigateToNotifications(){
        this.newNotificationsBoolean = false;
        this.router.navigate(['/notifications']);
    }

    getNewNotifications(){
        /*setInterval(() => {
            console.log("notifications:");
            this.newNotifications = this.notificationsService.checkNewNotifications().subscribe(response => {
                if(response){
                    this.newNotificationsBoolean = true;
                } else {
                    this.newNotificationsBoolean = false;
                }
            });
        }, 100000);*/
    }

    ngOnDestroy(): void {
        this.newNotifications ? this.newNotifications.unsubscribe() : null;
    }
}