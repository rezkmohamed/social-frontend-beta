import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Post } from "../models/post.model";
import { Profile } from "../models/profile.model";
import { ProfilesService } from "../profiles.service";

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
    //idSession: string = JSON.parse(localStorage.getItem("sessione")).id.toString();
    idSession: string = "3a751805-3141-41e4-ac94-9cee1bd262a0";
    idProfilo: string = "";
    profilo: Profile;
    posts: Post[] = [];
    loadingProfile: boolean = true;
    loadingPosts: boolean = true;
    //FIXME
    followers: number; 
    following: number; 

    constructor(private profilesService: ProfilesService,
                private router: Router,
                private route: ActivatedRoute){}


    ngOnInit(): void {
        this.fillProfile();

        this.route.params.subscribe(
            (params: Params) => {
                this.fillProfile();
            }
        )

    }
    
    private fillProfile(){
        let inizioIdDaCercare = 10;
        this.idProfilo = this.router.url.substring(inizioIdDaCercare, this.router.url.length);
        console.log(this.idProfilo);
        this.getAccount(this.idProfilo);
    }

    private getAccount(idProfilo: string){
        this.profilesService.fetchAccount(idProfilo).subscribe(
            response => {
                console.log(response);
                console.log(response.posts);
                this.profilo = new Profile(response.id, response.name, response.nickname, response.bio, response.proPic, response.email);
                this.profilesService.adjustProfilePageData(this.profilo);
                console.log(this.profilo);
                this.followers = response.followersCounter;
                this.following = response.followingCounter;
                //SPOSTO IL FLAG A FALSE. PROFILO CARICATO.
                this.loadingProfile = false;
                this.posts = [];
                for(let post of response.posts){
                    const postResponse: Post = new Post(post.idPost, post.urlImg, post.description, post.date, post.idProfile, post.commentsCounter, post.likesCounter);
                    this.posts.push(postResponse);
                }
                this.loadingPosts = false;
            }
        )
    }

}