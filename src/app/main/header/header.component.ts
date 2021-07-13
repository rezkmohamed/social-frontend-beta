import { Component ,OnDestroy,OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { NotificationsService } from "../services/notification.service";
import { ProfilesService } from "../services/profiles.service";

@Component({
    selector: 'app-header-component',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
    @ViewChild('f') searchForm: NgForm;
    idLoggedUser: string;
    newNotifications: Subscription;
    newNotificationsBoolean: {ok : boolean} = {ok : false};

    constructor(private profilesService: ProfilesService,
                private authService: AuthService,
                private notificationsService: NotificationsService,
                private router: Router) {}

    ngOnInit(): void {
        this.idLoggedUser = JSON.parse(localStorage.getItem('userData')).id.toString();
        this.setProPicLocalStorage();
        this.newNotificationsBoolean.ok = false;
        this.notificationsService.newNotification = this.newNotificationsBoolean;
        this.notificationsService.openWebSocket();
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
        this.newNotificationsBoolean.ok = false;
        this.router.navigate(['/notifications']);
    }

    setProPicLocalStorage(){
        this.profilesService.fetchAccount(this.idLoggedUser).subscribe(response => {
            localStorage.setItem('proPic', response.proPic);
        })
    }

    getNewNotifications(){
        this.notificationsService.getNotifications().subscribe(response => {
            console.log(response);
            for(let n of response){
                if(!n.seen){
                    this.newNotificationsBoolean.ok = true;
                }
            }
        })
    }

    ngOnDestroy(): void {
        this.notificationsService.closeWebSocket();
        this.newNotifications ? this.newNotifications.unsubscribe() : null;
    }
}