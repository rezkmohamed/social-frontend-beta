import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { NotificationModel } from "../models/notification.model";
import { NotificationsService } from "../services/notification.service";
import { ProfilesService } from "../services/profiles.service";

@Component({
    selector: 'app-notifications-component',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit{
    constructor(private notificationService: NotificationsService,
                private profilesService: ProfilesService,
                private sanitizer: DomSanitizer,
                private router: Router){}

    notifications: NotificationModel[] = []; 
    notificationsLoaded: {ok: boolean} = {ok: false};

    ngOnInit(): void {
        this.notificationService.getNotifications(this.notificationsLoaded, this.notifications);

        setTimeout(() => {
            console.log(this.notifications);
        }, 1000);
    }

    onNavigateToNotification(idProfile: string){
        console.log('notification cliccked!');
        this.router.navigate(['/profiles', idProfile]);
    }

    transform(img: string){
        if(!img){
            return this.profilesService.defaultProPic;
        }
        return this.sanitizer.bypassSecurityTrustResourceUrl(img);
    }
}