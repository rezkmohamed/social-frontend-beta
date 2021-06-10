import { Component, Input, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Profile } from "../../models/profile.model";


@Component({
    selector: 'app-profile-element-view',
    templateUrl: './profile-element-view.component.html',
    styleUrls: ['./profile-element-view.component.css']
})
export class ProfileElementViewComponent implements OnInit {
    @Input('profile') profile: Profile;

    constructor(private sanitizer: DomSanitizer){}


    transform(){
        return this.sanitizer.bypassSecurityTrustResourceUrl( "data:image/png;base64, " + this.profile.proPic);
    }


    ngOnInit(): void {
    }
    
}