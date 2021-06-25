import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MessageModel } from "../models/message.model";

@Injectable({
    providedIn: 'root'
})
export class MessagesService {
    private urlBase: string = "http://localhost:8080/";
    private token: string;
    webSocket: WebSocket;
    constructor(){}

    public openWebSocket(){
        this.webSocket = new WebSocket('ws://localhost:8080/strange');

        this.webSocket.onopen = (event) => {
            console.log('Open: ' + event);
            this.webSocket.send(JSON.stringify(this.token));
        };

        this.webSocket.onmessage = (event) => {
            const chatMessageDTO = JSON.parse(event.data);
            console.log(chatMessageDTO);
        }

        this.webSocket.onclose = (event) => {
            console.log('Close: ' + event);
        }
    }

    public sendToken(token: string){
        this.webSocket.send(JSON.stringify(token));
    }

    public sendMessage(chatMessageDTO: MessageModel){
        this.webSocket.send(JSON.stringify(chatMessageDTO));
    }

    public closeWebSocket(){
        this.webSocket.close();
    }
}