import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Profile } from "./models/profile.model";

@Injectable({
    providedIn: 'root'
})
export class ProfilesService {
    private urlBase: string = "http://localhost:8080/";

    constructor(private http: HttpClient){}

    fetchAccounts(){
        return this.http.get(this.urlBase + "profiles");
    }

    fetchAccount(idProfile: string){
        return this.http.get(this.urlBase + idProfile);
    }

    fetchHomePage(idProfile: string){
        return this.http.get<any[]>(this.urlBase + "posts/homepage/"+ idProfile);
    }
    

}