import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Profile } from "./models/profile.model";

@Injectable({
    providedIn: 'root'
})
export class ProfilesService {
    private urlBase: string = "http://localhost:8080/";
    private noBioProfilePage: string = "nessuna biografia aggiunta";
    private noProPicImg: string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREmdCaf7nI2mtqMatOavcK6g93qwLWykuiZQ&usqp=CAU";

    constructor(private http: HttpClient){}

    adjustProfilePageData(profile: Profile) {
        if(profile.bio == null || profile.bio == undefined){
            profile.bio = this.noBioProfilePage;
        }
        if(profile.name == null || profile.name == undefined){
            profile.name = profile.nickname;
        }
        if(profile.proPic == null || profile.proPic == undefined){
            profile.proPic = this.noProPicImg;
        }
    }

    fetchAccounts(){
        return this.http.get<any[]>(this.urlBase + "profiles");
    }

    fetchAccount(idProfile: string){
        return this.http.get<any>(this.urlBase + "profiles/" + idProfile);
    }

    fetchHomePage(idProfile: string){
        return this.http.get<any[]>(this.urlBase + "posts/homepage/"+ idProfile);
    }
    

}