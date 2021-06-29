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
        this.messagesService.openWebSocket();
        this.user = this.profilesService.getProfileLogged();
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

        this.setNewMessagesAsSeen();
        this.conversation.messages.unshift(msg);
        this.conversation.latestMessage = value;
        console.log(this.conversation);
        this.messagesService.sendMessage(msgToSend);
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
}