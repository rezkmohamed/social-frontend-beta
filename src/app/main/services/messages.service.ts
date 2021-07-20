import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Conversation } from "../models/conversation.model";
import { MessageModel } from "../models/message.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class MessagesService {
    private urlBase: string = environment.urlBase;
    conversation;
    conversations: Conversation[] = [];
    newMessagesForConversation: Map<Conversation, number> = new Map();


    webSocket: WebSocket;
    constructor(private http: HttpClient){}

    openWebSocket(){
        this.webSocket = new WebSocket(environment.wsBase + 'strange');

        this.webSocket.onopen = (event) => {
            console.log('Open: ' + event);
            let token: string = JSON.parse(localStorage.getItem('userData'))._token.toString();

            this.webSocket.send(JSON.stringify("Bearer " + token));
        };

        this.webSocket.onmessage = (event) => {
            let chatMessageDTO: MessageModel = JSON.parse(event.data);
            console.log("ON MESSAGE::: ");
            console.log(chatMessageDTO);
            console.log(this.conversations);
            for(let conv of this.conversations){
                if(conv.idConversation === chatMessageDTO.idConversation){
                    conv.messages.unshift(chatMessageDTO);
                    conv.latestMessage = chatMessageDTO.message;
                    conv.latestMessageDate = chatMessageDTO.date;
                    this.newMessagesForConversation.set(conv, 1);
                }
            }
        }

        this.webSocket.onclose = (event) => {
            console.log('Close: ' + event);
        }
    }

    sendToken(token: string){
        this.webSocket.send(JSON.stringify(token));
    }

    sendMessage(chatMessageDTO: MessageModel){
        this.webSocket.send(JSON.stringify(chatMessageDTO));
    }

    closeWebSocket(){
        this.webSocket.close();
    }

    getConversations(){
        return this.http.get<any[]>(this.urlBase + "conversations");
    }

    createConversation(idSecondProfile: string){
        return this.http.post<any>(this.urlBase + "conversations/new/" + idSecondProfile, null);
    }

    getMessagesForConversation(idConversation: string){
        return this.http.get<any[]>(this.urlBase + "conversations/messages/" + idConversation);
    }

    setMessagesAsSeen(idConversation: string){
        return this.http.put(this.urlBase + "conversations/setseen/" + idConversation, null);
    }
}
