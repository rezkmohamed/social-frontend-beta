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
            })
        });
        this.messageService.conversation = this.conversation;
    }

    ngOnDestroy(): void {
        this.messageService.closeWebSocket();
    }
}