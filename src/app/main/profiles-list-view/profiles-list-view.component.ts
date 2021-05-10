import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Profile } from "../models/profile.model";
import { ProfilesService } from "../profiles.service";

enum ListMode {
    likesAlPost = 0,
    followersProfilo = 1,
    followingProfilo = 2,
    errore = 3,
}

@Component({
    selector: 'app-profiles-list-view',
    templateUrl: './profiles-list-view.component.html'
})
export class ProfilesListViewComponent implements OnInit{
    url: string;
    typeList: ListMode = ListMode.errore;
    profiles: Profile[] = [];
    loadingProfiles: boolean = true;


    constructor(private profilesService: ProfilesService, private router: Router){}
    
    ngOnInit(): void {
        this.checkTypeOfList();
        this.fetchData();
    }
    

        /**
     * metodo che serve a capire che tipo di chiamata al 
     * backend dovrò effettuare
     */
    private checkTypeOfList() {
        let endUrl: number = 16;
        this.url = this.router.url.substring(0, endUrl);
        switch(this.url){
            case '/profiles/list/l':
                this.typeList = ListMode.likesAlPost;
                break;
            case '/profiles/list/f':
                this.url = this.router.url.substring(0, 22);
                if(this.url === '/profiles/list/followe'){
                    this.typeList = ListMode.followersProfilo;
                }
                else if(this.url === '/profiles/list/follows'){
                    this.typeList = ListMode.followingProfilo;
                }
                break;
            default:
                console.log('debugga il check del url');
                break;
        }
    }

    /**
     * metodo wrapper per effettuare le chiamate al backend
     */
    private fetchData(){
        switch(+this.typeList){
            case ListMode.likesAlPost:
                this.getLikes();
                break;
            case ListMode.followersProfilo: 
                this.getFollowers();
                break;
            case ListMode.followingProfilo: 
                this.getFollowing();
                break;
            default:
                console.log('errore');
                break;
        }
    }

    //metodo che filla i profiles con i profiles che hanno messo like
    //al post
    getLikes(){

    }

    getFollowers(){

    }

    getFollowing(){
        
    }
}