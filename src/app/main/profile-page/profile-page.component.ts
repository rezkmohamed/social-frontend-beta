import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Params, Router } from "@angular/router";
import * as moment from "moment";
import { Follow } from "../models/follow.model";
import { Post } from "../models/post.model";
import { Profile } from "../models/profile.model";
import { FollowService } from "../services/follow.service";
import { PostsService } from "../services/posts.service";
import { ProfilesService } from "../services/profiles.service";

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
    idLoggedUser: string = JSON.parse(localStorage.getItem('userData')).id.toString();


    inizioIdDaCercare = 10;
    idProfilo = this.router.url.substring(this.inizioIdDaCercare, this.router.url.length);

    //idProfilo: string = "";
    profilo: Profile;
    posts: Post[] = [];
    numberOfPosts: number;
    loadingProfile: boolean = true;
    loadingPosts: boolean = true;

    myProfile: boolean = false;
    following: boolean = false;

    followers: number; 
    follows: number; 

    notEmptyPost: boolean = true;
    notScrolly: boolean = true;

    constructor(
                private postService: PostsService,
                private followService: FollowService,
                private profilesService: ProfilesService,
                private router: Router,
                private route: ActivatedRoute,
                private sanitizer: DomSanitizer){}


    ngOnInit(): void {
        //this.fillProfile();

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

    transform(){
        if(this.profilo.proPic === this.profilesService.defaultProPic){
            return this.profilo.proPic;
        }
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.profilo.proPic);
    }

    transformPic(post: Post){
        return this.sanitizer.bypassSecurityTrustResourceUrl(post.urlImg);
    }

    private getAccount(idProfilo: string){
        this.profilesService.fetchAccount(idProfilo).subscribe(
            response => {
                console.log(response);
                this.profilo = new Profile(response.id, response.name, response.nickname, response.bio, response.proPic, response.email);
                this.numberOfPosts = response.postsCounter;
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
                if(response.posts.length <= 0){
                    this.notScrolly = false;
                }
                for(let post of response.posts){
                    const postResponse: Post = new Post(post.idPost, post.urlImg, post.description, post.localDate, post.idProfile, post.commentsCounter, post.likesCounter);
                    this.posts.push(postResponse);
                }
                this.loadingPosts = false;
            }
        )
    }

    private followCheck(){
        console.log("follow check:");
        this.followService.getFollow(this.idLoggedUser, this.idProfilo).subscribe(response => {
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
            this.followService.removeFollow(this.idProfilo).subscribe(response => {
                console.log(response);
            });
            this.followers--;
            this.following = false;
        } else {
            let followToAdd: Follow = new Follow(null, new Date(Date.now()).toDateString(), this.idLoggedUser, this.idProfilo);
            this.followService.addFollow(this.idProfilo, followToAdd).subscribe(response => {
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

    onScroll(){
        if(this.notScrolly && this.notEmptyPost){
            this.notScrolly = false;
            const lastPost: number = this.posts.length;
            this.loadNextPosts(this.idProfilo ,lastPost);
        }
    }

    loadNextPosts(idProfilo: string ,lastPost: number){
        this.postService.getNextPostsForProfile(idProfilo, lastPost).subscribe(response => {
            if(!response.length){
                this.notEmptyPost = false;
            }

            for(let i = 0; i < response.length; i++){
                if(response[i]){
                    let newPost: Post = new Post(response[i].idPost, response[i].urlImg, response[i].description, response[i].localDate, response[i].idProfile);
                    this.posts.push(newPost);
                }
            }
            if(this.posts.length === this.numberOfPosts){
                this.notScrolly = false;
            } else {
                this.notScrolly = true;
            }
        });
    }

}