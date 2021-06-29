import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { MessagesService } from "../services/messages.service";
import { ProfilesService } from "../services/profiles.service";

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{
    conversation;
    user;

    constructor(private messageService: MessagesService, private profilesService: ProfilesService){}

    ngOnInit(): void {
        this.user = this.profilesService.getProfileLogged();

    }

    onConversationSelected(conversation){
        this.conversation = conversation;
        this.messageService.getMessagesForConversation(conversation.idConversation).subscribe(response =>{
            console.log(response);
            response.sort( (a,b) => {
                return moment(b.date).diff(moment(a.date));
            });
            this.conversation.messages = response;
        });

        if(this.user.id === this.conversation.firstProfile.id){
            this.user = this.conversation.firstProfile;
        } else if(this.user.id === this.conversation.secondProfile.id){
            this.user = this.conversation.secondProfile;
            this.conversation.secondProfile = this.conversation.firstProfile;
            this.conversation.firstProfile = this.user;
        }

        this.messageService.conversation = this.conversation;
        console.log(this.conversation);
        console.log(this.messageService.conversation);
    }
}