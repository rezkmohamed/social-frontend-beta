import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MessageModel } from "../models/message.model";

@Injectable({
    providedIn: 'root'
})
export class MessagesService {
    private urlBase: string = "http://localhost:8080/";
    token: string = JSON.parse(localStorage.getItem('userData'))._token.toString();

    webSocket: WebSocket;
    constructor(private http: HttpClient){}

    public openWebSocket(){
        this.webSocket = new WebSocket('ws://localhost:8080/strange');

        this.webSocket.onopen = (event) => {
            console.log('Open: ' + event);
            this.webSocket.send(JSON.stringify("Bearer " + this.token));
        };

        this.webSocket.onmessage = (event) => {
            const chatMessageDTO = JSON.parse(event.data);
            console.log(chatMessageDTO);
            return false;
        }

        this.webSocket.onclose = (event) => {
            console.log('Close: ' + event);
            //setTimeout(this.openWebSocket, 1000);
        }
    }

    public sendToken(token: string){
        this.webSocket.send(JSON.stringify(token));
    }

    public sendMessage(chatMessageDTO: MessageModel){
        chatMessageDTO.idProfileSender = this.token;
        this.webSocket.send(JSON.stringify(chatMessageDTO));
    }

    public closeWebSocket(){
        this.webSocket.close();
    }

    public getConversations(){
        return this.http.get<any[]>(this.urlBase + "conversations");
    }

    public createConversation(idSecondProfile: string){
        return this.http.post<any>(this.urlBase + "conversations/new/" + idSecondProfile, null);
    }


}