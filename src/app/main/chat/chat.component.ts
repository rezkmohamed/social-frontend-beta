import { Component, OnInit } from "@angular/core";
import { MessagesService } from "../services/messages.service";

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{
    conversation;

    constructor(){}

    ngOnInit(): void {
        //this.messagesService.openWebSocket();
    }

    onConversationSelected(conversation){
        this.conversation = conversation;
    }
}