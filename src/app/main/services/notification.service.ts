import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
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
    private notifications: NotificationModel[]; 
    private notificationsResponse: NotificationModel[] = [];
    mapProfilesNotifications: Map<string, NotificationModel[]> = new Map();
    newNotification: {ok : boolean};

    DELETING_CODE = "delete_code";

    webSocket: WebSocket;

    constructor(private http: HttpClient){}

    openWebSocket(){
        this.webSocket = new WebSocket('ws://localhost:8080/stranger');

        this.webSocket.onopen = (event) => {
            console.log('Open: ' + event);
            let token: string = JSON.parse(localStorage.getItem('userData'))._token.toString();

            this.webSocket.send(JSON.stringify("Bearer " + token));
        };

        this.webSocket.onmessage = (event) => {
            let notificationDTO: NotificationModel = JSON.parse(event.data);
            console.log("ON MESSAGE::: ");
            console.log(notificationDTO);
            if(notificationDTO.nicknameProfileNotificator != this.DELETING_CODE){
                console.log("notification to add");
                this.setNotificationView(notificationDTO);
                if(this.notifications){
                    this.setNotificationView(notificationDTO);
                    this.notifications.unshift(notificationDTO);  
                    this.newNotification.ok = true;
                }
            }
            else {
                this.removeNotification(notificationDTO);
            }
        };

        this.webSocket.onclose = (event) => {
            console.log('Close: ' + event);
        };
    }

    sendMessage(notificationDTO: NotificationModel){
        this.webSocket.send(JSON.stringify(notificationDTO));
    }

    closeWebSocket(){
        this.webSocket.close();
    }

    getNotifications(){
        return this.http.get<any[]>(this.urlBase + "notifications");
    }

    setNotificationsAsSeen(){
        this.newNotification.ok = false;
        return this.http.put(this.urlBase + "notifications/setseen", null);
    }

    setNotifications(notificationsProfile: NotificationModel[]){
        this.notifications = notificationsProfile;
    }

    removeNotification(notification: NotificationModel): boolean {
        console.log("REMOVING:")
        console.log(this.notifications);
        if(this.notifications){
            for(let i = 0; i < this.notifications.length; i++){
                if(this.notifications[i].idProfileNotificator === notification.idProfileNotificator){
                    console.log("same idProfileNotificator: " + this.notifications[i].idProfileNotificator);
                    if(notification.nicknameProfileNotificator == this.DELETING_CODE){
                        console.log("deleting code.");
                        if(this.notifications[i].notificationType === notification.notificationType){
                            console.log("same notification type: " + this.notifications[i].notificationType);
                            if(this.notifications[i].idPost == notification.idPost){

                                console.log("REMOVED");
                                this.notifications.splice(i, 1);
                                return true;
                            }
                        }
                    }
                }
            }
        }

        return false;
    }

    setNotificationView(notification: NotificationModel){
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