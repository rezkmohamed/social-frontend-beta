import { Component, OnDestroy, OnInit } from "@angular/core";
import { Conversation } from "../models/conversation.model";
import { MessageModel } from "../models/message.model";
import { MessagesService } from "../services/messages.service";
import { ProfilesService } from "../services/profiles.service";

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy{
    conversation: Conversation;
    user;

    constructor(private messageService: MessagesService, private profilesService: ProfilesService){}

    ngOnInit(): void {
        this.user = this.profilesService.getProfileLogged();
        this.messageService.openWebSocket();
    }

    onConversationSelected(conversation){
        this.conversation = conversation;

        this.messageService.getMessagesForConversation(conversation.idConversation).subscribe(response =>{
            const messagesOfConversationResponse: MessageModel[] = [];
            for(let msg of response){
                const msgToAdd: MessageModel = new MessageModel(msg.idMessage, msg.idProfileSender, msg.idProfileReciver, msg.idConversation, msg.message, msg.dateMillis, msg.seen);
                messagesOfConversationResponse.push(msgToAdd);
            }
            this.conversation.messages = messagesOfConversationResponse;
            this.messageService.newMessagesForConversation.set(conversation, 0);
            this.messageService.setMessagesAsSeen(conversation.idConversation).subscribe(response => {
                console.log(response);
                //this.messageService.newMessagesForConversation.set(this.conversation, 0);
            })
        });
        /*if(this.user.id === this.conversation.profile1.id){
            this.user = this.conversation.profile1;
        } else if(this.user.id === this.conversation.profile2.id){
            this.user = this.conversation.profile2;
            this.conversation.profile2 = this.conversation.profile1;
            this.conversation.profile1 = this.user;
        }*/
        this.messageService.conversation = this.conversation;
    }

    ngOnDestroy(): void {
        this.messageService.closeWebSocket();
    }
}