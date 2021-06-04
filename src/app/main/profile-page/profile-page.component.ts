import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import * as moment from "moment";
import { Follow } from "../models/follow.model";
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
    //idSession: string = "3a751805-3141-41e4-ac94-9cee1bd262a0";
    idLoggedUser: string = JSON.parse(localStorage.getItem('userData')).id.toString();

    idProfilo: string = "";
    profilo: Profile;
    posts: Post[] = [];
    loadingProfile: boolean = true;
    loadingPosts: boolean = true;
    //
    myProfile: boolean = false;
    following: boolean = false;
    //FIXME
    followers: number; 
    follows: number; 

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
                this.profilo = new Profile(response.id, response.name, response.nickname, response.bio, response.proPic, response.email);
                this.profilesService.adjustProfilePageData(this.profilo);
                this.followers = response.followersCounter;
                this.follows = response.followingCounter;
                if(idProfilo === this.idLoggedUser){
                    this.myProfile = true;
                    console.log(this.myProfile);
                }
                else {
                    console.log("i'm inside follow check");
                    this.followCheck();
                }
                //SPOSTO IL FLAG A FALSE. PROFILO CARICATO.
                this.loadingProfile = false;
                this.posts = [];
                for(let post of response.posts){
                    const postResponse: Post = new Post(post.idPost, post.urlImg, post.description, post.date, post.idProfile, post.commentsCounter, post.likesCounter);
                    this.posts.push(postResponse);
                }
                this.posts.sort( (a,b) =>{
                    return moment(b.date).diff(moment(a.date) );
                } );    
                this.loadingPosts = false;
            }
        )
    }

    private followCheck(){
        console.log("follow check:");
        this.profilesService.getFollow(this.idLoggedUser, this.idProfilo).subscribe(response => {
            console.log(response);
            if(!response){
                console.log(false);
                this.following = false;
            } else if(response.idFollower === this.idLoggedUser && response.idFollowed === this.idProfilo){
                console.log(true);
                this.following = true;
            }
        }, error => {
            console.log(error);
            this.following = false;
        });
    }

    onToggleFollow(){
        if(this.following){
            this.profilesService.removeFollow(this.idLoggedUser, this.idProfilo).subscribe(response => {
                console.log(response);
            });
            this.followers--;
            this.following = false;
        } else {
            let followToAdd: Follow = new Follow(null, new Date(Date.now()).toDateString(), this.idLoggedUser, this.idProfilo);
            this.profilesService.addFollow(this.idLoggedUser, this.idProfilo, followToAdd).subscribe(response => {
                console.log(response);
            });
            this.followers++;
            this.following = true;
        }
    }

    openPost(idPost: string){
        this.router.navigate([`/post/${idPost}`]);
    }

    viewFollowersList(){
        this.router.navigate(['/profiles/list/followers', this.idProfilo]);
    }

    viewFollowingList(){
        this.router.navigate(['/profiles/list/follows', this.idProfilo]);
    }

}