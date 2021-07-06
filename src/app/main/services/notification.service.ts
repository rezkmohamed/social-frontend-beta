import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { NotificationModel } from "../models/notification.model";

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {
    private urlBase: string = "http://localhost:8080/";
    private notifications; 

    constructor(private http: HttpClient){}

    getNotifications(){
        if(this.notifications){
            let response: NotificationModel[] = [];
            for(let notification of this.notifications){
                let tmp: NotificationModel = new NotificationModel(notification.profileNotificator.id, notification.profileNotificator.nickname, notification.profileNotificator.proPic, notification.notificationType, notification.dateMillis);
                response.push(tmp);
            }
            return response;
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