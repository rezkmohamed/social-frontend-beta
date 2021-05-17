import { Component, OnInit, Input } from "@angular/core";
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
    //idSession: string = JSON.parse(localStorage.getItem('sessione')).id.toString();
    idSession: string = "3a751805-3141-41e4-ac94-9cee1bd262a0";
    isLiked: boolean = false;
    loadingComment: boolean = true;
    likesAlPost: Like[] = [];

    commento: string;
    isDropdown: boolean = false;

    constructor(private profilesService: ProfilesService){}

    ngOnInit(): void {
        console.log(this.post);
        this.checkLike();
    }

    private checkLike(){
        this.profilesService.getLike(this.idSession, this.post.idPost).subscribe(response => {
            console.log(response);
            if(response.idPost === this.post.idPost && response.idProfile === this.idSession){
                this.isLiked = true;
            }
        })
    }

    onToggleLike(){

    }   

    viewLikesList(){

    }

    onSubmitComment(){

    }

    onToggleLikeComment(){

    }

    onRemovePost(){
        
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