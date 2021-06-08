import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import * as moment from "moment";
import { CommentPost } from "../models/comment.model";
import { Like } from "../models/like.model";
import { Post } from "../models/post.model";
import { Profile } from "../models/profile.model";
import { ProfilesService } from "../profiles.service";



@Component({
    selector: 'app-post-card',
    templateUrl: './post-card.component.html',
    styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
    @Input('profilo') profilo: Profile;
    @Input('post') post: Post;
    @Input('comments') comments: CommentPost[];
    idLoggedUser: string = JSON.parse(localStorage.getItem('userData')).id;

    profileLogged: Profile;
    isLiked: boolean = false;
    loadingComment: boolean = true;
    likesAlPost: Like[] = [];
    
    commento: string;
    isDropdown: boolean = false;

    isCommentsLikesLoaded: boolean = true;

    constructor(private profilesService: ProfilesService, private router: Router){}

    ngOnInit(): void {
        this.checkLike();
    }

    private checkLike(){
        if(this.post.isLiked){
            this.isLiked = true;
        } else {
            this.isLiked = false;
        }
    }

    onToggleLike(){
        if(this.isLiked){
            this.profilesService.removeLike(this.idLoggedUser, this.post.idPost).subscribe(response => {
                console.log(response);
                this.isLiked = false;
                this.post.likesCounter--;
            })
        } else {
            let like: Like = new Like(null, (new Date(Date.now())).toDateString(), this.post.idPost, this.idLoggedUser);

            this.profilesService.addLike(this.idLoggedUser, this.post.idPost, like).subscribe(response => {
                console.log(response);
                this.isLiked = true;
                this.post.likesCounter++;
            });
        }
    }   

    viewLikesList(){
        this.router.navigate(['/profiles/list/likes', this.post.idPost]);
    }

    onSubmitComment(){
        console.log(this.commento);

        let date = moment().format();

        let newComment: CommentPost = new CommentPost(null, this.commento, date, this.post.idPost, this.idLoggedUser)
        this.profilesService.addComment(newComment).subscribe(response => {
            console.log(response);
        });
        console.log(this.profilesService.getProfileLogged());
        newComment.nicknameProfile = this.profilesService.getProfileLogged().nickname;
        this.comments.push(newComment);
        this.commento = "";
    }

    onToggleLikeComment(index: number){
        if(this.comments[index].isLiked){
            this.profilesService.removeCommentLike(this.comments[index].idComment).subscribe(response => {
                console.log(response);
                this.comments[index].commentLikesCounter--;
                this.comments[index].isLiked = false;
            })
        } else if(!this.comments[index].isLiked) {
            this.profilesService.addCommentLike(this.comments[index].idComment).subscribe(response => {
                console.log(response);
                this.comments[index].commentLikesCounter++;
                this.comments[index].isLiked = true;
            })
        }
    }

    onRemovePost(){
        console.log("id post: " + this.post.idPost);
        this.profilesService.removePost(this.post.idPost).subscribe(response => {
            console.log("removing post...");
            console.log(response);
            this.router.navigate(['/profiles', this.idLoggedUser]);
        });
    }

    onUpdatePost(){
        localStorage.setItem('postToChange', JSON.stringify(this.post));
        localStorage.setItem('profile', JSON.stringify(this.profilo));
        this.router.navigate(['/post/edit', this.post.idPost]);
    }

    onFocusCommentForm(){
        console.log('focus comment form');
        let textArea = document.getElementById(this.post.idPost);
        textArea.focus();
    }
        /**
     * questo metodo serve ad aprire il menù (cancella, modifica) di operazioni sul post
     */
    dropdownToggle(){
        console.log('dropdown works');
        this.isDropdown = !this.isDropdown;
    }

}