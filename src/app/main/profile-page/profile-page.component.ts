import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Params, Router } from "@angular/router";
import * as moment from "moment";
import { Follow } from "../models/follow.model";
import { NotificationModel } from "../models/notification.model";
import { Post } from "../models/post.model";
import { Profile } from "../models/profile.model";
import { FollowService } from "../services/follow.service";
import { MessagesService } from "../services/messages.service";
import { NotificationsService, NotificationType } from "../services/notification.service";
import { PostsService } from "../services/posts.service";
import { ProfilesService } from "../services/profiles.service";

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
    idLoggedUser: string;
    loggedUser;
    loggedProfileProPic: string;

    inizioIdDaCercare = 10;
    idProfilo = this.router.url.substring(this.inizioIdDaCercare, this.router.url.length);

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
                private notificationsSerivce: NotificationsService,
                private postService: PostsService,
                private followService: FollowService,
                private profilesService: ProfilesService,
                private messageService: MessagesService,
                private router: Router,
                private route: ActivatedRoute,
                private sanitizer: DomSanitizer){}


    ngOnInit(): void {
        this.idLoggedUser =JSON.parse(localStorage.getItem('userData')).id.toString();
        this.loggedUser = JSON.parse(localStorage.getItem('userData'));
        this.loggedProfileProPic = localStorage.getItem('proPic');
        this.route.params.subscribe(
            (params: Params) => {
                this.fillProfile();
            }
        )
    }

    private fillProfile(){
        let inizioIdDaCercare = 10;
        this.idProfilo = this.router.url.substring(inizioIdDaCercare, this.router.url.length);
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
                    this.followCheck();
                }
                //SPOSTO IL FLAG A FALSE. PROFILO CARICATO.
                this.loadingProfile = false;
                this.posts = [];
                for(let post of response.posts){
                    const postResponse: Post = new Post(post.idPost, post.urlImg, post.description, post.dateMillis, post.idProfile, post.commentsCounter, post.likesCounter);
                    this.posts.push(postResponse);
                }
                if(this.numberOfPosts === this.posts.length){
                    this.notScrolly = false;
                }
                this.loadingPosts = false;
            }
        )
    }

    private followCheck(){
        this.followService.getFollow(this.idLoggedUser, this.idProfilo).subscribe(response => {
            if(!response){
                this.following = false;
            } else if(response.idFollower === this.idLoggedUser && response.idFollowed === this.idProfilo){
                this.following = true;
            }
        }, error => {
            this.following = false;
        });
    }

    onToggleFollow(){
        if(this.following){
            this.followService.removeFollow(this.idProfilo).subscribe(response => {
                let notification: NotificationModel = new NotificationModel(this.idLoggedUser, this.idProfilo, this.notificationsSerivce.DELETING_CODE, this.loggedProfileProPic, NotificationType.FOLLOW, null, false);
                this.notificationsSerivce.sendMessage(notification);
            });
            this.followers--;
            this.following = false;
        } else {
            let followToAdd: Follow = new Follow(null, this.idLoggedUser, this.idProfilo);
            this.followService.addFollow(this.idProfilo, followToAdd).subscribe(response => {
                let notification: NotificationModel = new NotificationModel(this.idLoggedUser, this.idProfilo, this.loggedUser.nickname, this.loggedProfileProPic, NotificationType.FOLLOW, null, false);
                this.notificationsSerivce.sendMessage(notification);
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
                    let newPost: Post = new Post(response[i].idPost, response[i].urlImg, response[i].description, response[i].dateMillis, response[i].idProfile);
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

    onStartChat(){
        this.messageService.createConversation(this.idProfilo).subscribe(response => {
            this.router.navigate(["/chat"]);
        });
    }
}
