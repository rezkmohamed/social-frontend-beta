import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Post } from "../../models/post.model";
import { Profile } from "../../models/profile.model";
import { ProfilesService } from "../../profiles.service";

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

    constructor(private profilesService: ProfilesService, private router: Router){}
    ngOnInit(){
        console.log(this.post);
        console.log(this.profile);
    }

    onSubmit(){
        this.post.description = this.descrizione;
        this.profilesService.updatePost(this.post).subscribe(response => {
            if(response.status === 200){
                console.log("post modificato");
                confirm("post modificato");
            }
        }, error => {
            console.log("errore");
            console.log(error);
            confirm("errore nella modifica!");
        })
    }

    ngOnDestroy(){
        localStorage.removeItem('profile');
        localStorage.removeItem('postToChange');
    }

}