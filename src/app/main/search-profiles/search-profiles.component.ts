import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Profile } from "../models/profile.model";
import { ProfilesService } from "../profiles.service";

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

    constructor(private profilesService: ProfilesService, private route: Router,private activatedRoute: ActivatedRoute,
        private sanitizer: DomSanitizer){}

    ngOnInit() {
        this.searchProfiles();

        this.activatedRoute.params.subscribe(
            (params: Params) => {
                this.searchProfiles();
            }
        )
    }

    transform(profile: Profile){
        return this.sanitizer.bypassSecurityTrustResourceUrl( "data:image/png;base64, " + profile.proPic);
    }

    private searchProfiles(){
        this.daCercare = this.route.url.substring(this.inizioNomeDaCercare,
        this.route.url.length);
        console.log(this.daCercare);
        
        this.profiles = [];
        this.profilesLoaded = false;

        this.profilesService.searchProfiles(this.daCercare).subscribe(response => {
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
    
}