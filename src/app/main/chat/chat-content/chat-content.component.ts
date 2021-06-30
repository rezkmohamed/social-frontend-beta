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

    ngOnInit(): void {
        this.messagesService.openWebSocket();
        this.user = this.profilesService.getProfileLogged();
        console.log(this.user);
    }

    onSubmitMessage(event){
        let value = event.target.value.trim(); //save the input value
        event.target.value = '';
        if(value.length < 1){ //non permetto l'invio di messaggi vuoti
            return;
        }
        //aggiungo il msg
        let date = moment().valueOf();
        let msg = new MessageModel(null, this.user.id, this.conversation.profile2.id, this.conversation.idConversation, value, date, true);
        console.log(msg);

        this.setNewMessagesAsSeen();
        this.conversation.messages.unshift(msg);
        this.conversation.latestMessage = value;
        console.log(this.conversation);
        this.messagesService.sendMessage(msg);
    }

    setNewMessagesAsSeen(){
        let newMessages: boolean = false;
        for(let message of this.conversation.messages){
            if(message.isSeen === false){
                message.isSeen = true;
                newMessages = true;
            }
        }
        if(newMessages){
            this.messagesService.setMessagesAsSeen(this.conversation.idConversation).subscribe(response => {
                console.log(response);
            })
            console.log("messages seen");
        }
    }

    ngOnDestroy(): void {
        this.messagesService.closeWebSocket();
    }

    transform(img: string){
        if(!img){
            return this.profilesService.defaultProPic;
        }
        return this.sanitizer.bypassSecurityTrustResourceUrl(img);
    }
}