import { Component, OnDestroy, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { Post } from "../../models/post.model";
import { Profile } from "../../models/profile.model";
import { PostsService } from "../../services/posts.service";

@Component({
    selector: 'app-edit-post-card',
    templateUrl: './edit-post-card.component.html',
    styleUrls: ['./edit-post-card.component.scss']
})
export class EditPostCardComponent implements OnInit, OnDestroy {
    post: Post = JSON.parse(localStorage.getItem('postToChange'));
    profile: Profile = JSON.parse(localStorage.getItem('profile'));
    idLoggedUser: string = JSON.parse(localStorage.getItem('userData')).id;
    descrizione: string = this.post.description;

    constructor(private postService: PostsService , private sanitizer: DomSanitizer){}
    ngOnInit(){
        console.log(this.post);
        console.log(this.profile);
    }

    transform(img : string){
        return this.sanitizer.bypassSecurityTrustResourceUrl(img);
    }

    onSubmit(){
        this.post.description = this.descrizione;
        this.postService.updatePost(this.post).subscribe(response => {
            if(response.status === 200){
                confirm("post modificato");
            }
        }, error => {
            confirm("errore nella modifica!");
        })
    }

    ngOnDestroy(){
        localStorage.removeItem('profile');
        localStorage.removeItem('postToChange');
    }

}