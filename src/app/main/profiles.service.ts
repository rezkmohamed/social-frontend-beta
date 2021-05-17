import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./models/post.model";
import { Profile } from "./models/profile.model";
import { User } from "./models/user.model";

@Injectable({
    providedIn: 'root'
})
export class ProfilesService {
    private urlBase: string = "http://localhost:8080/";
    private noBioProfilePage: string = "nessuna biografia aggiunta";
    private noProPicImg: string = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

    constructor(private http: HttpClient){}

    adjustProfilePageData(profile: Profile) {
        if(profile.bio == null || profile.bio == undefined){
            profile.bio = this.noBioProfilePage;
        }
        if(profile.name == null || profile.name == undefined){
            profile.name = profile.nickname;
        }
        if(profile.proPic == null || profile.proPic == undefined || profile.proPic == ""){
            profile.proPic = this.noProPicImg;
        }
    }

    login(email: string, password: string){
        return this.http.put<User>(this.urlBase + "login",{
            body: {email, password}
        });
    }

    createAccount(username: string, nickname: string, email: string, password: string){
        return this.http.post(
            this.urlBase + "register",
            {
                name: username,
                nickname: nickname,
                email: email,
                password: password
            }
        );
    }

    updateProfile(profile: Profile){
        return this.http.put(this.urlBase + "profiles", profile);
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

    getLikesForPost(idPost: String){
        return this.http.get<any[]>(this.urlBase + "profiles/likes/" + idPost);
    }

    getFollowersProfile(idProfile: string){
        return this.http.get<any[]>(this.urlBase + "profiles/" + idProfile + "/followers");
    }

    getFollowingProfile(idProfile: string){
        return this.http.get<any[]>(this.urlBase + "profiles/" + idProfile + "/following");
    }

    searchProfiles(profileName: string){
        return this.http.get<any[]>(this.urlBase + "profiles/search/" + profileName);
    }

    createPost(post: Post){
        return this.http.post<Post>(this.urlBase + "posts", post);
    }

    getPost(idPost: string){
        return this.http.get<any>(this.urlBase + "posts/" + idPost);
    }

    getLike(idProfile: string, idPost: string){
        return this.http.get<any>(this.urlBase + "likes/" + idProfile + "/" +idPost);
    }
}