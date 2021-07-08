import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { NotificationModel } from "../models/notification.model";

export enum NotificationType{
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
            console.log("ci sono le notifiche");
            this.notificationsResponse = [];
            for(let notification of this.notifications){
                let tmp: NotificationModel = new NotificationModel(notification.profileNotificator.id, notification.profileNotificator.nickname, notification.profileNotificator.proPic, notification.notificationType, notification.dateMillis, notification.seen);
                this.setNotificationView(tmp);
                if(tmp.notificationType === NotificationType.LIKE || tmp.notificationType === NotificationType.COMMENT || tmp.notificationType === NotificationType.COMMENT_LIKE){
                    tmp.idPost = notification.post.idPost;
                }
                this.notificationsResponse.push(tmp);
            }
            for(let notification of this.notificationsResponse){
                notifs.push(notification);
            }
            notificationsLoaded.ok = true;
            return this.notificationsResponse;
        }
        else {
            this.checkNotifications().subscribe(response => {
                console.log("sono nell'else");
                if(response){
                    console.log(response);
                    console.log("discesa ricorsiva");
                    this.getNotifications(notificationsLoaded, notifs);
                }
            })
        }
    }

    checkNewNotifications(){
        let newNotifications = new Subject<boolean>();

        this.http.get<any[]>(this.urlBase + "notifications").subscribe(response => {
            console.log(response);
            if(response.length){
                this.notifications = response;
                for(let notif of this.notifications){
                    if(!notif.seen){
                        newNotifications.next(true);
                        return newNotifications.asObservable();
                    }
                }
                newNotifications.next(false);
            }
        });

        return newNotifications.asObservable();
    }

    checkNotifications() {
        let newNotifications = new Subject<boolean>();

        this.http.get<any[]>(this.urlBase + "notifications").subscribe(response => {
            if(response.length){
                console.log(response);
                this.notifications = response;
                newNotifications.next(true);
            }
            else {
                newNotifications.next(false);
            }
        });

        return newNotifications.asObservable();
    }

    setNotificationsAsSeen(){
        return this.http.put(this.urlBase + "notifications/setseen", null);
    }

    private setNotificationView(notification: NotificationModel){
        switch(notification.notificationType){
            case NotificationType.FOLLOW:
                notification.notificationView = "ha iniziato a seguirti.";
                break;
            case NotificationType.LIKE:
                notification.notificationView = "ha messo like a un tuo post.";
                break;
            case NotificationType.COMMENT:
                notification.notificationView = "ha commentato un tuo post.";
                break;
            case NotificationType.COMMENT_LIKE:
                notification.notificationView = "ha messo like a un tuo commento.";
        }
    }
}