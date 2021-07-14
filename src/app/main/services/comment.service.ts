import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CommentPost } from "../models/comment.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CommentsService {
    private urlBase: string = environment.urlBase;

    constructor(private http : HttpClient){}

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

}