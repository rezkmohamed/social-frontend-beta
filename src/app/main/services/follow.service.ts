import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Follow } from "../models/follow.model";

@Injectable({
    providedIn: 'root'
})
export class FollowService {
    private urlBase: string = "http://localhost:8080/";

    constructor(private http: HttpClient){}

    getFollowersProfile(idProfile: string){
        return this.http.get<any[]>(this.urlBase + "followers/" + idProfile + "/followers");
    }

    getFollowingProfile(idProfile: string){
        return this.http.get<any[]>(this.urlBase + "followers/" + idProfile + "/following");
    }

    getFollow(idFollower: string, idFollowed: string){
        return this.http.get<any>(this.urlBase + "followers/get/" + idFollower + "/" + idFollowed);
    }

    addFollow(idFollowed: string, follow: Follow){
        return this.http.post(this.urlBase + "followers/follow/" + idFollowed, follow);
    }

    removeFollow(idFollowed: string){
        return this.http.delete(this.urlBase + "followers/unfollow/" + idFollowed);
    }

}