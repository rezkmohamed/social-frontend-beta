import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
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
export class ChatContent implements OnInit, OnChanges{
    @Input() conversation;
    user;
    newMessages: number = 0;
    firstNewMessageId: string;

    constructor(public messagesService: MessagesService,
                public profilesService: ProfilesService,
                private sanitizer: DomSanitizer){}


    ngOnChanges(changes: SimpleChanges): void {
        //console.log("ngOnChanges called");
        this.firstNewMessageId = this.checkNewMessages();
        if(this.newMessages <= 0 || !this.firstNewMessageId){
            return;
        }

        this.ngAfterViewChecked();
    }

    ngOnInit(): void {
        this.firstNewMessageId = "";
        this.user = this.profilesService.getProfileLogged();
        console.log(this.user);

    }

    ngAfterViewChecked(){
        this.firstNewMessageId = this.checkNewMessages();
        let variabile = document.getElementById(this.firstNewMessageId);
        if(variabile){
            variabile.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
            this.messagesService.setMessagesAsSeen(this.conversation.idConversation).subscribe(response => {
                this.messagesService.newMessagesForConversation.set(this.conversation, 0);
                console.log(response);
            })
        }
        //console.log(this.messages);
    }

    onSubmitMessage(event){
        let value = event.target.value.trim(); //save the input value
        event.target.value = '';
        if(value.length < 1){ //non permetto l'invio di messaggi vuoti
            return;
        }
        //aggiungo il msg
        let date = moment().valueOf();
        let msg = new MessageModel(null, this.user.id, this.conversation.profile2.id, this.conversation.idConversation, value, date, false);
        console.log(msg);

        this.setNewMessagesAsSeen();
        this.conversation.messages.unshift(msg);
        this.conversation.latestMessage = value;
        this.messagesService.sendMessage(msg);
        this.messagesService.newMessagesForConversation.set(this.conversation, 0);
    }

    setNewMessagesAsSeen(){
        let newMessages: boolean = false;
        for(let message of this.conversation.messages){
            if(message.isSeen === false && message.idProfileReciver === this.user.id){
                message.isSeen = true;
                newMessages = true;
            }
        }
        if(newMessages){
            this.messagesService.setMessagesAsSeen(this.conversation.idConversation).subscribe(response => {
                console.log(response);
            })
        }
    }

    checkNewMessages(){
        let firstNewMessageId: string = "";
        if(this.user){
            for(let message of this.conversation.messages){
                if(message.isSeen === false && message.idProfileReciver === this.user.id){
                    this.newMessages++;
                    firstNewMessageId = message.idMessage;
                }
            }
        }
        return firstNewMessageId;
    }

    transform(img: string){
        if(!img){
            return this.profilesService.defaultProPic;
        }
        return this.sanitizer.bypassSecurityTrustResourceUrl(img);
    }
}