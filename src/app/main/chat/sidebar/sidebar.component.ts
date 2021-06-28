import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Profile } from "../../models/profile.model";
import { MessagesService } from "../../services/messages.service";
import { ProfilesService } from "../../services/profiles.service";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    @Output() conversationClicked: EventEmitter<any> = new EventEmitter();

    user;
    userProfilePic;
    conversationsLoaded: boolean = false;
    conversations = [];
    /*conversations = [
        {name: "David", time: "8:21 AM", latestMassege: 'ciao capo padrone', id: 0 ,messages: [
            {id: 1, body: 'Hello world', time: '8:21', me: true},
            {id: 2, body: 'Hello Bro', time: '8:21', me: false},
            {id: 3, body: 'Che cazzo vuoi da me scemo', time: '8:21', me: true},
            {id: 4, body: 'Hello Bro', time: '8:21', me: true}
        ]},
        {name: "David", time: "8:21 AM", latestMassege: 'ciao capo padrone', id: 0, messages: [
            {id: 1, body: 'Hello world', time: '8:21', me: true},
            {id: 2, body: 'Hello Bro', time: '8:21', me: false},
            {id: 3, body: 'Che cazzo vuoi da me scemo', time: '8:21', me: true},
            {id: 4, body: 'Hello Bro', time: '8:21', me: true}
        ]}
    ];*/

    constructor(private messageService: MessagesService,
                private profileService: ProfilesService,
                private sanitizer: DomSanitizer) { }

    ngOnInit(): void {
        this.user = this.profileService.getProfileLogged();
        this.profileService.fetchAccount(this.user.id).subscribe(response => {
            this.userProfilePic = response.proPic;
        })

        this.messageService.getConversations().subscribe(response => {
            console.log(response);
            this.conversations = response;
            this.conversationsLoaded = true;
        });
    }

    transform(img: string){
        if(img == null){
            return this.profileService.defaultProPic;
        }
        return this.sanitizer.bypassSecurityTrustResourceUrl(img);
    }
}
