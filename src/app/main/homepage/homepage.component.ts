import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { CommentPost } from "../models/comment.model";
import { Post } from "../models/post.model";
import { Profile } from "../models/profile.model";
import { PostsService } from "../services/posts.service";
import { ProfilesService } from "../services/profiles.service";


@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
    posts: Post[] = [];
    profiles: Profile[] = [];
    commenti: Map<number, CommentPost[]> = new Map<number, CommentPost[]>();
    idLoggedUser: string = JSON.parse(localStorage.getItem('userData')).id.toString();

    notEmptyPost: boolean = true;
    notScrolly: boolean = true;

    constructor(private profilesService: ProfilesService  ,private postService: PostsService){}

    ngOnInit(): void {
        this.loadNextPosts(0);
    }
    
    onScroll(){
        if(this.notScrolly && this.notEmptyPost){
            this.notScrolly = false;
            const lastPost: number = this.posts.length;
            this.loadNextPosts(lastPost);
        }
    }

    loadNextPosts(lastPost: number){
        this.postService.fetchHomePage(lastPost).subscribe(response => {

            if(!response.length){
                this.notEmptyPost = false;
            }

            for(let i = 0; i < response.length; i++){
                if(response[i]){
                    let newPost: Post = new Post(response[i].idPost, 
                        response[i].urlImg, response[i].description,
                        response[i].dateMillis, response[i].idProfile, response[i].commentsCounter, response[i].likesCounter, response[i].liked);

                        this.posts.push(newPost)

                        let comments: CommentPost[] = [];
                        for(let comment of response[i].comments){
                            let commentResponse = new CommentPost(comment.idComment, comment.comment, comment.dateMillis, comment.idPost, comment.idProfile, comment.nicknameProfile, comment.commentLikesCounter, comment.liked);
                            comments.push(commentResponse);
                        }
                        comments.sort( (a,b) => {
                            return moment(a.date).diff(moment(b.date));
                        })
                    
                    this.commenti.set(lastPost+i, comments);
                    let profile: Profile = new Profile(response[i].profile.id,
                        response[i].profile.name, response[i].profile.nickname,
                        response[i].profile.bio, response[i].profile.proPic,
                        response[i].profile.email);
                    this.profilesService.adjustProfilePageData(profile);
                    
                    this.profiles.push(profile);
                }
            }
            this.notScrolly = true;
        })
    }

}