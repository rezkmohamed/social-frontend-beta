import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
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
    idLoggedUser: string = JSON.parse(localStorage.getItem('userData')).id.toString();

    constructor(private profilesService: ProfilesService){}

    ngOnInit(): void {
        this.fetchPostsInit();
    }
    
    fetchPostsInit(){
        this.profilesService.fetchHomePage(this.idLoggedUser).subscribe(response => {
            console.log(response);
            for(let i = 0; i < response.length; i++){
                if(response[i]){
                        this.posts[i] = new Post(response[i].idPost, 
                            response[i].urlImg, response[i].description,
                            response[i].date, response[i].idProfile, response[i].commentsCounter, response[i].likesCounter, response[i].liked);
                            

                        let comments: CommentPost[] = [];
                        for(let comment of response[i].comments){
                            console.log(comment);
                            let commentResponse = new CommentPost(comment.idComment, comment.comment, comment.date, comment.idPost, comment.idProfile, comment.nicknameProfile, comment.commentLikesCounter, comment.liked);
                            comments.push(commentResponse);

                        }

                        comments.sort( (a,b) => {
                            return moment(a.date).diff(moment(b.date));
                        })
                        //console.log(comments);

                        this.commenti.set(i, comments);

                        let profile: Profile = new Profile(response[i].profile.id,
                            response[i].profile.name, response[i].profile.nickname,
                            response[i].profile.bio, response[i].profile.proPic,
                            response[i].profile.email);
                        this.profilesService.adjustProfilePageData(profile);
                        this.profiles[i] = profile;
                }
            }            
        });



    }
}