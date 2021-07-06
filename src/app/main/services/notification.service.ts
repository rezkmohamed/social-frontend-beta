import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {
    private urlBase: string = "http://localhost:8080/";
    private notifications; 

    constructor(private http: HttpClient){}

    getNewNotifications(){
        let newNotifications = new Subject<boolean>();

        this.http.get<any[]>(this.urlBase + "notifications").subscribe(response => {
            if(response.length){
                this.notifications = response;
                newNotifications.next(true);
            }
        });

        return newNotifications.asObservable();
    }
}