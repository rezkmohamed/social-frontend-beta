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
    mapProfilesNotifications: Map<string, NotificationModel[]> = new Map();

    webSocket: WebSocket;

    constructor(private http: HttpClient){}

    openWebSocket(){
        this.webSocket = new WebSocket('ws://localhost:8080/stranger');

        this.webSocket.onopen = (event) => {
            console.log('Open: ' + event);
            let token: string = JSON.parse(localStorage.getItem('userData'))._token.toString();
            let idProfile: string = JSON.parse(localStorage.getItem('userData')).id.toString();

            this.webSocket.send(JSON.stringify("Bearer " + token));
            //this.mapProfilesNotifications.set(idProfile, []);
        };

        this.webSocket.onmessage = (event) => {
            let notificationDTO: NotificationModel = JSON.parse(event.data);
            console.log("ON MESSAGE::: ");
            console.log(notificationDTO);
            this.setNotificationView(notificationDTO);
            this.notifications.unshift(notificationDTO);
            //this.mapProfilesNotifications.get(notificationDTO.idProfileToNotify).push(notificationDTO);
        };

        this.webSocket.onclose = (event) => {
            console.log('Close: ' + event);
        };
    }

    sendMessage(notifiationDTO: NotificationModel){
        this.webSocket.send(JSON.stringify(notifiationDTO));
    }

    closeWebSocket(){
        this.webSocket.close();
    }

    getNotifications(){
        return this.http.get<any[]>(this.urlBase + "notifications");
    }

    setNotificationsAsSeen(){
        return this.http.put(this.urlBase + "notifications/setseen", null);
    }

    setNotifications(notificationsProfile: NotificationModel[]){
        this.notifications = notificationsProfile;
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