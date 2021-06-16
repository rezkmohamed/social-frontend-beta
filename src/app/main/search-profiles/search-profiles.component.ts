import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Profile } from "../models/profile.model";
import { ProfilesService } from "../services/profiles.service";

@Component({
    selector: 'app-search-profiles',
    templateUrl: './search-profiles.component.html',
    styleUrls: ['./search-profiles.component.css']
})
export class SearchProfilesComponent implements OnInit {
    daCercare: string;
    inizioNomeDaCercare = 17;
    profiles: Profile[] = [];
    profilesLoaded: boolean = false;


    notEmptyPost: boolean = true;
    notScrolly: boolean = true;


    constructor(private profilesService: ProfilesService, private route: Router,private activatedRoute: ActivatedRoute,
        private sanitizer: DomSanitizer){}

    ngOnInit() {
        //this.searchProfiles();

        this.activatedRoute.params.subscribe(
            (params: Params) => {
                this.loadNextProfiles(0);
            }
        )
    }

    transform(profile: Profile){
        return this.sanitizer.bypassSecurityTrustResourceUrl(profile.proPic);
    }

    onScroll(){
        if(this.notScrolly && this.notEmptyPost){
            this.notScrolly = false;
            const lastProfile: number = this.profiles.length;
            this.loadNextProfiles(lastProfile);
        }
    }
    
    loadNextProfiles(lastProfile: number){
        this.daCercare = this.route.url.substring(this.inizioNomeDaCercare,
            this.route.url.length);
            console.log(this.daCercare);
            
//            this.profilesLoaded = false;
    
            this.profilesService.searchProfiles(this.daCercare, lastProfile).subscribe(response => {
                console.log(response);
                for(let i = 0; i < response.length; i++){
                    let profile: Profile = new Profile(response[i].id,
                        response[i].name, response[i].nickname,
                        response[i].bio, response[i].proPic,
                        response[i].email);
                    this.profilesService.adjustProfilePageData(profile);
                    this.profiles.push(profile);
                }
                this.profilesLoaded = true;
            })
    }
    /*
    private searchProfiles(){
        this.daCercare = this.route.url.substring(this.inizioNomeDaCercare,
        this.route.url.length);
        console.log(this.daCercare);
        
        this.profiles = [];
        this.profilesLoaded = false;

        this.profilesService.searchProfiles(this.daCercare, 0).subscribe(response => {
            console.log(response);
            for(let i = 0; i < response.length; i++){
                let profile: Profile = new Profile(response[i].id,
                    response[i].name, response[i].nickname,
                    response[i].bio, response[i].proPic,
                    response[i].email);
                this.profilesService.adjustProfilePageData(profile);
                this.profiles[i] = profile;
            }
            this.profilesLoaded = true;
        })
    }
*/
}