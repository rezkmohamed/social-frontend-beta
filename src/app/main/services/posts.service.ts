import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "../models/post.model";



@Injectable({
    providedIn: 'root'
})
export class PostsService {
    private urlBase: string = "http://localhost:8080/";

    constructor(private http: HttpClient){}

    fetchHomePage(startingIndex: number){
        return this.http.get<any[]>(this.urlBase + "posts/homepage/" + startingIndex);
    } 

    createPost(postFormData: FormData){
        return this.http.post<Post>(this.urlBase + "posts/newpost", postFormData,
        {
            reportProgress: true,
            observe: 'events'
        });
    }

    getPost(idPost: string){
        return this.http.get<any>(this.urlBase + "posts/" + idPost);
    }

    getNextPostsForProfile(idProfile: string ,startingPost: number){
        return this.http.get<any>(this.urlBase + "posts/next/" + "/" + idProfile + "/" + startingPost );
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

}