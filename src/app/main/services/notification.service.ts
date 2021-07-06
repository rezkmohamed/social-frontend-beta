import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {
    private urlBase: string = "http://localhost:8080/";

    constructor(private http: HttpClient){}

    getNewNotifications(){
        return this.http.get<any[]>(this.urlBase + "notifications");
    }
}