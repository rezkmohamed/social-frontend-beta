import { Component, OnInit, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import * as moment from "moment";
import { CommentPost } from "../models/comment.model";
import { Like } from "../models/like.model";
import { NotificationModel } from "../models/notification.model";
import { Post } from "../models/post.model";
import { Profile } from "../models/profile.model";
import { CommentsService } from "../services/comment.service";
import { LikesService } from "../services/likes.service";
import { NotificationsService, NotificationType } from "../services/notification.service";
import { PostsService } from "../services/posts.service";
import { ProfilesService } from "../services/profiles.service";



@Component({
    selector: 'app-post-card',
    templateUrl: './post-card.component.html',
    styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
    @Input('profilo') profilo: Profile;
    @Input('post') post: Post;
    @Input('comments') comments: CommentPost[];
    idLoggedUser: string;    
    loggedUserData;

    profileLogged: Profile;
    isLiked: boolean = false;
    loadingComment: boolean = true;
    likesAlPost: Like[] = [];
    
    commento: string;
    isDropdown: boolean = false;

    isCommentsLikesLoaded: boolean = true;

    constructor(
        private commentService: CommentsService,
        private likeService: LikesService,
        private postService: PostsService,
        private profilesService: ProfilesService, 
        private router: Router, 
        private sanitizer: DomSanitizer,
        private notificationService: NotificationsService){}

    ngOnInit(): void {
        this.idLoggedUser = JSON.parse(localStorage.getItem('userData')).id;
        this.loggedUserData = JSON.parse(localStorage.getItem('userData'));
        this.checkLike();        
    }

    transform(img : string){
        return this.sanitizer.bypassSecurityTrustResourceUrl(img);
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
            this.likeService.removeLike(this.post.idPost).subscribe(response => {
                this.isLiked = false;
                this.post.likesCounter--;
                let notification: NotificationModel = new NotificationModel(this.idLoggedUser, this.profilo.id, null, null, NotificationType.LIKE, null, false, this.post.idPost);
                notification.nicknameProfileNotificator = "delete_code";

                this.notificationService.sendMessage(notification);
            })
        } else {
            let like: Like = new Like(null, this.post.idPost, this.idLoggedUser);

            this.likeService.addLike(this.post.idPost, like).subscribe(response => {
                let notification: NotificationModel = new NotificationModel(this.idLoggedUser, this.profilo.id, this.loggedUserData.nickname, null, NotificationType.LIKE, null, false, this.post.idPost);
                this.isLiked = true;
                this.post.likesCounter++;
                this.notificationService.sendMessage(notification);
            });
        }
    }   

    viewLikesList(){
        this.router.navigate(['/profiles/list/likes', this.post.idPost]);
    }

    onSubmitComment(){
        console.log(this.commento);

        let newComment: CommentPost = new CommentPost(null, this.commento, -1, this.post.idPost, this.idLoggedUser)
        this.commentService.addComment(newComment).subscribe(response => {
            console.log(response);
            newComment.idComment = response.idComment;
        });
        console.log(this.profilesService.getProfileLogged());
        newComment.nicknameProfile = this.profilesService.getProfileLogged().nickname;
        newComment.commentLikesCounter = 0;
        newComment.isLiked = false;
        this.comments.push(newComment);
        this.commento = "";
    }

    onToggleLikeComment(index: number){
        if(this.comments[index].isLiked){
            this.commentService.removeCommentLike(this.comments[index].idComment).subscribe(response => {
                console.log(response);
                this.comments[index].commentLikesCounter--;
                this.comments[index].isLiked = false;
            })
        } else if(!this.comments[index].isLiked) {
            this.commentService.addCommentLike(this.comments[index].idComment).subscribe(response => {
                console.log(response);
                this.comments[index].commentLikesCounter++;
                this.comments[index].isLiked = true;
            })
        }
    }

    onRemovePost(){
        console.log("id post: " + this.post.idPost);
        this.postService.removePost(this.post.idPost).subscribe(response => {
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