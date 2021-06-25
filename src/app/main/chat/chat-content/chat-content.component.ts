import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import * as moment from "moment";
import { MessageModel } from "../../models/message.model";
import { MessagesService } from "../../services/messages.service";


@Component({
    selector: 'app-chat-content',
    templateUrl: './chat-content.component.html',
    styleUrls: ['./chat-content.component.scss']
})
export class ChatContent implements OnInit, OnDestroy{
    @Input() conversation; 

    constructor(public messagesService: MessagesService){}

    ngOnInit(): void {
        //this.messagesService.openWebSocket();
        this.messagesService.openConnetion();
    }

    onSubmitMessage(event){
        let value = event.target.value.trim(); //save the input value
        event.target.value = '';
        if(value.length < 1){ //non permetto l'invio di messaggi vuoti
            return;
        }
        //aggiungo il msg
        let date = moment().format();
        let msg = new MessageModel(null, null, 'gfg', date, true);
        //this.messagesService.sendMessage(msg);
        this.conversation.latestMassege = value;
        this.conversation.messages.unshift({
            id: 1,
            body: value,
            time: '8:23',
            me: true
        });

    }
    

    ngOnDestroy(): void {
        //this.messagesService.closeWebSocket();
    }
}