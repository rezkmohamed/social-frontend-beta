import { Component, OnInit, Input } from "@angular/core";
import { Post } from "../models/post.model";
import { Profile } from "../models/profile.model";

@Component({
    selector: 'app-post-card',
    templateUrl: './post-card.component.html',
    styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
    @Input('profilo') profilo: Profile;
    @Input('post') post: Post;



    commento: string;
    isDropdown: boolean = false;

    ngOnInit(): void {


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