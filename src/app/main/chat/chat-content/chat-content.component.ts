import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import * as moment from "moment";
import { MessageModel } from "../../models/message.model";
import { MessagesService } from "../../services/messages.service";
import { ProfilesService } from "../../services/profiles.service";


@Component({
    selector: 'app-chat-content',
    templateUrl: './chat-content.component.html',
    styleUrls: ['./chat-content.component.scss']
})
export class ChatContent implements OnInit, OnDestroy{
    @Input() conversation; 
    user;

    constructor(public messagesService: MessagesService,
                public profilesService: ProfilesService,
                private sanitizer: DomSanitizer){}

    
    transform(img: string){
        if(img == null){
            return this.profilesService.defaultProPic;
        }
        return this.sanitizer.bypassSecurityTrustResourceUrl(img);
    }
    
    ngOnInit(): void {
        this.messagesService.openWebSocket(this.conversation);
        console.log(this.conversation);
        this.user = this.profilesService.getProfileLogged();
        if(this.user.id === this.conversation.firstProfile.id){
            this.user = this.conversation.firstProfile;
        } else if(this.user.id === this.conversation.secondProfile.id){
            this.user = this.conversation.secondProfile;
            this.conversation.secondProfile = this.conversation.firstProfile;
            this.conversation.firstProfile = this.user;
        }
        console.log(this.conversation);
    }

    onSubmitMessage(event){
        let value = event.target.value.trim(); //save the input value
        event.target.value = '';
        if(value.length < 1){ //non permetto l'invio di messaggi vuoti
            return;
        }
        //aggiungo il msg
        let date = moment().format();
        let msg = new MessageModel(null, this.user.id,this.conversation.secondProfile.id, this.conversation.idConversation, value, date, true);
        let msgToSend = new MessageModel(null, this.user.id,this.conversation.secondProfile.id, this.conversation.idConversation, value, date, true);
        this.conversation.messages.unshift(msg);
        this.conversation.latestMessege = value;
        console.log(this.conversation);
        this.messagesService.sendMessage(msgToSend);
    }

    ngOnDestroy(): void {
        this.messagesService.closeWebSocket();
    }
}