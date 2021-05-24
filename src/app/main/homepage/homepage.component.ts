import { Component, OnInit } from "@angular/core";
import { CommentPost } from "../models/comment.model";
import { Post } from "../models/post.model";
import { Profile } from "../models/profile.model";
import { ProfilesService } from "../profiles.service";


@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
    posts: Post[] = [];
    profiles: Profile[] = [];
    commenti: Map<number, CommentPost[]> = new Map<number, CommentPost[]>();

    constructor(private profilesService: ProfilesService){}

    ngOnInit(): void {
        this.fetchPostsInit();
    }
    
    //TEST METHOD
    fetchPostsInit(){
        this.profilesService.fetchHomePage("3a751805-3141-41e4-ac94-9cee1bd262a0").subscribe(response => {
            console.log(response);
            for(let i = 0; i < response.length; i++){
                console.log(response[i]);
                if(response[i]){
                        this.posts[i] = new Post(response[i].idPost, 
                            response[i].urlImg, response[i].description,
                            response[i].date, response[i].idProfile, response[i].commentsCounter, response[i].likesCounter);

                        
                        let comments: CommentPost[] = [];
                        for(let comment of response[i].comments){
                            let commentResponse = new CommentPost(comment.idComment, comment.comment, comment.date, comment.idPost, comment.idProfile, comment.nicknameProfile, comment.commentLikesCounter);
                            comments.push(commentResponse);
                        }
                        this.commenti.set(i, comments);

                        let profile: Profile = new Profile(response[i].profile.id,
                            response[i].profile.name, response[i].profile.nickname,
                            response[i].profile.bio, response[i].profile.proPic,
                            response[i].profile.email);
                        this.profilesService.adjustProfilePageData(profile);
                        this.profiles[i] = profile;
                        console.log(this.profiles[i]);
                }
            }
        });
    }
}