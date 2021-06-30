import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MessageModel } from "../models/message.model";

@Injectable({
    providedIn: 'root'
})
export class MessagesService {
    private urlBase: string = "http://localhost:8080/";
    token: string = JSON.parse(localStorage.getItem('userData'))._token.toString();
    conversation;

    webSocket: WebSocket;
    constructor(private http: HttpClient){}

    openWebSocket(){
        this.webSocket = new WebSocket('ws://localhost:8080/strange');
        //this.conversation = conversation;

        this.webSocket.onopen = (event) => {
            console.log('Open: ' + event);
            this.webSocket.send(JSON.stringify("Bearer " + this.token));
        };

        this.webSocket.onmessage = (event) => {
            let chatMessageDTO: MessageModel = JSON.parse(event.data);
            console.log("ON MESSAGE::: ");
            console.log(chatMessageDTO);
            if(this.conversation.idConversation === chatMessageDTO.idConversation){
                this.conversation.messages.unshift(chatMessageDTO);
            }
            return false;
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