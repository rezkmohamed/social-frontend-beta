import { Component, OnInit } from "@angular/core";
import { Post } from "../models/post.model";
import { Profile } from "../models/profile.model";
import { ProfilesService } from "../profiles.service";


@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
    posts: Post[] = [];
    profiles: Profile[] = [];

    constructor(private profilesService: ProfilesService){}

    ngOnInit(): void {
        this.fetchPostsInit();
    }
    
    //TEST METHOD
    fetchPostsInit(){
        this.profilesService.fetchHomePage("3a751805-3141-41e4-ac94-9cee1bd262a0").subscribe(response => {
            console.log(response);
            console.log(response.length);
            console.log(response[0].idPost);
            console.log(response[0].urlImg);
            console.log(response[0].description);
            console.log(response[0].date);
            console.log(response[0].idProfile);
            /*let i = 0;
            response.forEach(element => {
                let post: Post = new Post(response[i].idPost, 
                    response[i].urlImg, response[i].description,
                    response[i].date, response[i].idProfile);
                this.posts.push(post);
                let profile: Profile = new Profile(response[i].profile.id,
                    response[i].profile.name, response[i].profile.nickname,
                    response[i].profile.bio, response[i].profile.proPic,
                    response[i].profile.email);
                this.profiles.push(profile);

                i++;
            });*/
            for(let i = 0; i < response.length; i++){
                console.log(response[i]);
                if(response[i]){
                    this.posts[i] = new Post(response[i].idPost, 
                        response[i].urlImg, response[i].description,
                        response[i].date, response[i].idProfile);

                        this.profiles[i] = new Profile(response[i].profile.id,
                        response[i].profile.name, response[i].profile.nickname,
                        response[i].profile.bio, response[i].profile.proPic,
                        response[i].profile.email);
                }
            }
        });
    }
}