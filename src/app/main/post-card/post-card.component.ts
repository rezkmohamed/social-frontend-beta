import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { th } from "date-fns/locale";
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
    //idSession: string = JSON.parse(localStorage.getItem('sessione')).id.toString();
    //idSession: string = "3a751805-3141-41e4-ac94-9cee1bd262a0";
    idLoggedUser: string = JSON.parse(localStorage.getItem('userData')).id;

    profileLogged: Profile;
    isLiked: boolean = false;
    loadingComment: boolean = true;
    likesAlPost: Like[] = [];
    
    commento: string;
    isDropdown: boolean = false;

    constructor(private profilesService: ProfilesService, private router: Router){}

    ngOnInit(): void {
        console.log(this.post);
        console.log(this.idLoggedUser);
        this.checkLike();
    }

    private checkLike(){
        this.profilesService.getLike(this.idLoggedUser, this.post.idPost).subscribe(response => {
            console.log(response);
            if(response != null || response != undefined){
                if(response.idPost === this.post.idPost && response.idProfile === this.idLoggedUser){
                    this.isLiked = true;
                } else {
                    this.isLiked = false;
                }
            }
            else {
                this.isLiked = false;
            }
        })
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
        let newComment: CommentPost = new CommentPost(null, this.commento, null, this.post.idPost, this.idLoggedUser)
        this.profilesService.addComment(newComment).subscribe(response => {
            console.log(response);
        });
        console.log(this.profilesService.getProfileLogged());
        newComment.nicknameProfile = this.profilesService.getProfileLogged().nickname;
        this.comments.push(newComment);
        this.commento = "";
    }

    onToggleLikeComment(){

    }

    onRemovePost(){
        console.log("id post: " + this.post.idPost);
        this.profilesService.removePost(this.post.idPost).subscribe(response => {
            console.log("removing post...");
            console.log(response);
            this.router.navigate(['/profiles', this.idLoggedUser]);
        });
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