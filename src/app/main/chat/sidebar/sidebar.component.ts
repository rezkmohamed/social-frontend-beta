import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Conversation } from "../../models/conversation.model";
import { MessageModel } from "../../models/message.model";
import { MessagesService } from "../../services/messages.service";
import { ProfilesService } from "../../services/profiles.service";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    @Output() conversationClicked: EventEmitter<any> = new EventEmitter();

    user;
    userProfilePic;
    conversationsLoaded: boolean = false;
    conversations;

    constructor(private messageService: MessagesService,
                private profileService: ProfilesService,
                private sanitizer: DomSanitizer) { }

    ngOnInit(): void {
        this.conversations = [];
        this.conversationsLoaded = false;
        this.fillProfileData();
        this.getConversationsSidebar();
    }

    fillProfileData(){
        this.user = this.profileService.getProfileLogged();
        this.profileService.fetchAccount(this.user.id).subscribe(response => {
            this.userProfilePic = response.proPic;
        })
    }

    getConversationsSidebar(){
        this.messageService.getConversations().subscribe(response => {
            console.log(response);
            for(let conv of response){
                const messagesOfConversationResponse: MessageModel[] = [];
                const conversationResponse: Conversation = new Conversation(conv.idConversation, conv.firstProfile, conv.secondProfile, conv.latestMessage, messagesOfConversationResponse);
                for(let msg of conv.messages){
                    const msgToAdd: MessageModel = new MessageModel(msg.idMessage, msg.idProfileSender, msg.idProfileReciver, msg.idConversation, msg.message, msg.dateMillis, msg.seen);
                    console.log(msgToAdd);
                    conversationResponse.messages.push(msgToAdd);
                }
                console.log(conversationResponse);
                this.conversations.push(conversationResponse);
            }
            this.conversationsLoaded = true;
        });
    }

    transform(img){
        if(!img){
            return this.profileService.defaultProPic;
        }
        return this.sanitizer.bypassSecurityTrustResourceUrl(img);
    }
}
