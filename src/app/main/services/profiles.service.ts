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

    /*

    fetchHomePage(idProfile: string){
        return this.http.get<any[]>(this.urlBase + "posts/homepage/"+ idProfile);
    }

    

    getLikesForPost(idPost: String){
        return this.http.get<any[]>(this.urlBase + "likes/" + idPost);
    }

    */

    /*
    getFollowersProfile(idProfile: string){
        return this.http.get<any[]>(this.urlBase + "followers/" + idProfile + "/followers");
    }

    getFollowingProfile(idProfile: string){
        return this.http.get<any[]>(this.urlBase + "followers/" + idProfile + "/following");
    }
    */
    searchProfiles(profileName: string){
        return this.http.get<any[]>(this.urlBase + "profiles/search/" + profileName);
    }

    /*
    createPost(postFormData: FormData){
        return this.http.post<Post>(this.urlBase + "posts/newpost/test", postFormData,
        {
            reportProgress: true,
            observe: 'events'
        });
    }

    getPost(idPost: string){
        return this.http.get<any>(this.urlBase + "posts/" + idPost);
    }

    removePost(idPost: string){
        return this.http.delete(this.urlBase + "posts/" + idPost, 
            { observe: 'response' });
    }

    updatePost(post: Post){
        return this.http.put(this.urlBase + "posts/" + post.idPost,
            post,
            { observe: 'response' });
    }

    
    getLike(idProfile: string, idPost: string){
        return this.http.get<any>(this.urlBase + "likes/" + idProfile + "/" +idPost);
    }

    addLike(idProfile: string, idPost: string, like: Like){
        return this.http.post(
            this.urlBase + "likes/add/" + idPost + "/" + idProfile, 
            like,
            { observe: 'response' }
        );
    }

    removeLike(idProfile: string, idPost: string){
        return this.http.delete(this.urlBase + "likes/delete/" + idPost + "/" + idProfile,
        { observe: 'response' });
    }
    */

    /*

    getFollow(idFollower: string, idFollowed: string){
        return this.http.get<any>(this.urlBase + "followers/get/" + idFollower + "/" + idFollowed);
    }

    addFollow(idFollower: string, idFollowed: string, follow: Follow){
        return this.http.post(this.urlBase + "followers/" + idFollower + "/follow/" + idFollowed, follow);
    }

    removeFollow(idFollower: string, idFollowed: string){
        return this.http.delete(this.urlBase + "followers/" + idFollower + "/unfollow/" + idFollowed);
    }

    

    addComment(comment: CommentPost){
        return this.http.post<any>(this.urlBase + "comments" , comment);
    }

    getCommentsForPost(idPost: string){
        return this.http.get<any[]>(this.urlBase + "comments/" + idPost);
    }

    addCommentLike(idComment: string){
        return this.http.post(this.urlBase + "commentlike/add/" + idComment, null);
    }

    removeCommentLike(idComment: string){
        return this.http.delete(this.urlBase + "commentlike/delete/" + idComment);
    }

    */
}