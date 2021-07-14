import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Like } from "../models/like.model";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})
export class LikesService {
    private urlBase: string = environment.urlBase;

    constructor(private http: HttpClient){}

    getLikesForPost(idPost: String){
        return this.http.get<any[]>(this.urlBase + "likes/" + idPost);
    }

    getLike(idProfile: string, idPost: string){
        return this.http.get<any>(this.urlBase + "likes/" + idProfile + "/" +idPost);
    }

    addLike(idPost: string, like: Like){
        return this.http.post(
            this.urlBase + "likes/add/" + idPost, 
            like,
            { observe: 'response' }
        );
    }

    removeLike(idPost: string){
        return this.http.delete(this.urlBase + "likes/delete/" + idPost,
        { observe: 'response' });
    }

    addCommentLike(idComment: string){
        return this.http.post(this.urlBase + "commentlike/add/" + idComment, null);
    }

    removeCommentLike(idComment: string){
        return this.http.delete(this.urlBase + "commentlike/delete/" + idComment);
    }
}