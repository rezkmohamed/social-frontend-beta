import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Post } from "../../models/post.model";
import { Profile } from "../../models/profile.model";
import { ProfilesService } from "../../profiles.service";

@Component({
    selector: 'app-detail-full',
    templateUrl: './detail-full.component.html'
})
export class DetailFullCompont implements OnInit {
    profilo: Profile;
    post: Post;
    idPost: string;
    idProfilo: string;
    loadingProfile: boolean = true;
    loadingPost: boolean = true;

    constructor(private profilesService: ProfilesService, private route: Router){}

    ngOnInit(){
        this.getData();
    }

    private getData(){
        let startingUrl: number = 6;
        this.idPost = this.route.url.substring(startingUrl, this.route.url.length);
        console.log(this.idPost);
        this.getPost();
    }

    private getPost(){
        this.profilesService.getPost(this.idPost).subscribe(response => {
            let responsePost = new Post(response.idPost, response.urlImg, response.description, response.date, response.idProfile);
            responsePost.likesCounter = response.likesCounter;
            this.post = responsePost;
            this.loadingPost = false;

            let responseProfile = new Profile(response.profile.id, response.profile.name, response.profile.nickname, response.profile.bio, response.profile.proPic, response.profile.email);
            this.profilo = responseProfile;
            this.loadingProfile = false;
            
        })
    }
}