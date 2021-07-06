import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
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
                private sanitizer: DomSanitizer){}
    notifications: NotificationModel[] = []; 

    ngOnInit(): void {
        this.notifications =  this.notificationService.getNotifications();        
    }

    onNavigateToNotification(){
        console.log('notification cliccked!');
    }

    transform(img: string){
        if(!img){
            return this.profilesService.defaultProPic;
        }
        return this.sanitizer.bypassSecurityTrustResourceUrl(img);
    }
}