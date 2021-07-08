import { Component, OnDestroy, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { NotificationModel } from "../models/notification.model";
import { NotificationsService, NotificationType } from "../services/notification.service";
import { ProfilesService } from "../services/profiles.service";

@Component({
    selector: 'app-notifications-component',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {
    constructor(private notificationService: NotificationsService,
                private profilesService: ProfilesService,
                private sanitizer: DomSanitizer,
                private router: Router){}

    notifications: NotificationModel[];
    notificationsLoaded: {ok: boolean} = {ok : false};

    ngOnInit(): void {
        this.notifications = [];
        this.notificationsLoaded.ok = false;
        console.log("ngOnInit");
        this.notificationService.getNotifications(this.notificationsLoaded, this.notifications);
    }

    onNavigateToNotification(notification: NotificationModel){
        console.log('notification cliccked!');
        switch(notification.notificationType){
            case NotificationType.FOLLOW:
                console.log("case follow");
                this.router.navigate(['/profiles', notification.idProfileNotificator]);
                break;
            case NotificationType.LIKE:
                console.log(notification.idPost);
                this.router.navigate(['/post', notification.idPost]);
                break;
            case NotificationType.COMMENT:
                this.router.navigate(['post', notification.idPost]);
                break;
        }
    }

    transform(img: string){
        if(!img){
            return this.profilesService.defaultProPic;
        }
        return this.sanitizer.bypassSecurityTrustResourceUrl(img);
    }

    ngOnDestroy(): void {
        console.log("ngOnDestroy");
        this.notifications.forEach(notification => {
            if(!notification.isSeen){
                this.notificationService.setNotificationsAsSeen().subscribe(response => {
                    console.log(response);
                    for(let notification of this.notifications){
                        notification.isSeen = true;
                    }
                })
                return;
            }
        })
    }
}