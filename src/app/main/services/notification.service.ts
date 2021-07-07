import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { NotificationModel } from "../models/notification.model";

enum NotificationType{
    FOLLOW = "FOLLOW",
    COMMENT = "COMMENT",
    COMMENT_LIKE = "COMMENT_LIKE",
    LIKE = "LIKE"
}

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {
    private urlBase: string = "http://localhost:8080/";
    private notifications; 
    private notificationsResponse: NotificationModel[] = [];

    constructor(private http: HttpClient){}

    getNotifications(notificationsLoaded, notifs){
        if(this.notifications){
            this.notificationsResponse = [];
            for(let notification of this.notifications){
                switch(notification.notificationType){
                    case NotificationType.FOLLOW:
                        notification.notificationType = "ha iniziato a seguirti.";
                }
                let tmp: NotificationModel = new NotificationModel(notification.profileNotificator.id, notification.profileNotificator.nickname, notification.profileNotificator.proPic, notification.notificationType, notification.dateMillis, notification.seen);
                this.notificationsResponse.push(tmp);
            }
            for(let notification of this.notificationsResponse){
                notifs.push(notification);
            }
            notificationsLoaded.ok = true;
            return this.notificationsResponse;
        }
        else {
            this.checkNewNotifications().subscribe(response => {
                if(response){
                    return this.getNotifications(notificationsLoaded, notifs);
                }
            })
        }
    }

    checkNewNotifications() {
        let newNotifications = new Subject<boolean>();

        this.http.get<any[]>(this.urlBase + "notifications").subscribe(response => {
            if(response.length){
                this.notifications = response;
                console.log(response);
                newNotifications.next(true);
            }
            else {
                newNotifications.next(false);
            }
        });

        return newNotifications.asObservable();
    }
}