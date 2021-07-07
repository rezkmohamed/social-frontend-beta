import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Conversation } from "../models/conversation.model";
import { MessageModel } from "../models/message.model";

@Injectable({
    providedIn: 'root'
})
export class MessagesService {
    private urlBase: string = "http://localhost:8080/";
    token: string = JSON.parse(localStorage.getItem('userData'))._token.toString();
    conversation;
    conversations: Conversation[];
    newMessagesForConversation: Map<Conversation, number> = new Map();


    webSocket: WebSocket;
    constructor(private http: HttpClient){}

    openWebSocket(){
        this.webSocket = new WebSocket('ws://localhost:8080/strange');

        this.webSocket.onopen = (event) => {
            console.log('Open: ' + event);
            this.webSocket.send(JSON.stringify("Bearer " + this.token));
            this.conversations = [];
        };

        this.webSocket.onmessage = (event) => {
            let chatMessageDTO: MessageModel = JSON.parse(event.data);
            console.log("ON MESSAGE::: ");
            console.log(chatMessageDTO);
            console.log(this.conversations);
            for(let conv of this.conversations){
                if(conv.idConversation === chatMessageDTO.idConversation){
                    console.log("conversation found");
                    console.log(conv);
                    conv.messages.unshift(chatMessageDTO);
                    conv.latestMessage = chatMessageDTO.message;
                    conv.latestMessageDate = chatMessageDTO.date;
                    this.newMessagesForConversation.set(conv, 1);
                }
            }
            /*if(this.conversation){
                if(this.conversation.idConversation === chatMessageDTO.idConversation){
                    this.conversation.messages.unshift(chatMessageDTO);
                    this.conversation.latestMessage = chatMessageDTO.message;
                    this.conversation.latestMessageDate = chatMessageDTO.date;
                    this.newMessagesForConversation.set(this.conversation, this.newMessagesForConversation.get(this.conversation) +1);
                    console.log('if pushed');
                }
            }
            else {
                for(let cnv of this.conversations){
                    if(cnv.idConversation === chatMessageDTO.idConversation){
                        cnv.latestMessage = chatMessageDTO.message;
                        cnv.latestMessageDate = chatMessageDTO.date;
                        this.newMessagesForConversation.set(cnv, this.newMessagesForConversation.get(cnv) +1);
                        console.log('else pushed');
                    }
                }
            }
            return false;*/
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