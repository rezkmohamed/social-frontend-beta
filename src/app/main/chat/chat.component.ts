import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{
    conversation;

    ngOnInit(): void {
    }

    onConversationSelected(conversation){
        this.conversation = conversation;
    }
}