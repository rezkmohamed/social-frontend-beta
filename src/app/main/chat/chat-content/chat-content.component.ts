import { Component, Input, OnInit } from "@angular/core";


@Component({
    selector: 'app-chat-content',
    templateUrl: './chat-content.component.html',
    styleUrls: ['./chat-content.component.scss']
})
export class ChatContent implements OnInit{
    @Input() conversation; 

    constructor(){}

    ngOnInit(): void {
    }

    onSubmitMessage(event){
        let value = event.target.value.trim(); //save the input value
        event.target.value = '';
        if(value.length < 1){ //non permetto l'invio di messaggi vuoti
            return;
        }
        //aggiungo il msg
        this.conversation.latestMassege = value;
        this.conversation.messages.unshift({
            id: 1,
            body: value,
            time: '8:23',
            me: true
        });

    }
    
}