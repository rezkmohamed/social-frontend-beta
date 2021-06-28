import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Profile } from "../models/profile.model";
import { User } from "../models/user.model";

class UserRequest{
    constructor(
        public idUser: string,
        public nickname: string,
        public email: string,
        public pass: string){}
}

@Injectable({
    providedIn: 'root'
})
export class ProfilesService {
    urlBase: string = "http://localhost:8080/";
    noBioProfilePage: string = "nessuna biografia aggiunta";
    defaultProPic = "/assets/images/no-propic.png";

    private userLogged: User;

    constructor(private http: HttpClient){}

    setProfileLogged(user: User){
        this.userLogged = user;
    }

    getProfileLogged(){
        return this.userLogged;
    }

    adjustProfilePageData(profile: Profile) {
        if(!profile.bio){
            profile.bio = this.noBioProfilePage;
        }
        if(!profile.name){
            profile.name = profile.nickname;
        }

        if(!profile.proPic){
            profile.proPic = this.defaultProPic;
        }
    }

    login(email: string, password: string){
        return this.http.post<any>(this.urlBase + "login" ,
            {
                email: email,
                pass: password
            },
            { observe: 'response' }
        );
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

    checkPassword(userRequest: UserRequest){
        return this.http.post<any>(this.urlBase + "checkpassword", 
        userRequest,
        { observe: 'response' });
    }

    updateProfileWithProPic(profile: Profile, proPic: File) {
        const formData = new FormData();
        formData.append('proPic', proPic);
        formData.append('name', profile.name);
        formData.append('bio', profile.bio);
        formData.append('nickname', profile.nickname);
        formData.append('email', profile.email);

        return this.http.post<any>(this.urlBase + "profiles/updategeneraldata", 
            formData,
            {headers: new HttpHeaders({
                'Content-Type': 'multipart/form-data',
            })},
           // { observe: 'response' }
        );
    }

    uploadProfilePic(uploadData: FormData){
        return this.http.post(this.urlBase + "profiles/propic", uploadData, {
            reportProgress: true,
            observe: 'events'
        });
    }

    updateProfile(profile: Profile) {
        return this.http.post<any>(this.urlBase + "profiles/updategeneraldata", 
            profile,
            { observe: 'response' }
        );
    }

    updatePassword(idProfile: string ,newPassword: string){
        return this.http.put<any>(this.urlBase + "profiles/newpassword" ,
                {
                    idProfile: idProfile,
                    newPassword: newPassword
                },
                { observe: 'response' }
        );
    }

    updateEmail(profile: Profile, password: string){
        return this.http.put(this.urlBase + "profiles", {
            id: profile.id,
            name: profile.name,
            nickname: profile.nickname,
            bio: profile.bio,
            proPic: profile.proPic,
            email: profile.email,
        });
    }

    fetchAccounts(){
        return this.http.get<any[]>(this.urlBase + "profiles");
    }

    fetchAccount(idProfile: string){
        return this.http.get<any>(this.urlBase + "profiles/" + idProfile);
    }

    searchProfiles(profileName: string, lastProfile: number){
        return this.http.get<any[]>(this.urlBase + "profiles/search/" + profileName + "/" + lastProfile);
    }
}