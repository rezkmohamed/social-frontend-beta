import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { AuthService } from "src/app/auth/auth.service";
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

    userToken;
    user;
    userProfilePic;
    conversationsLoaded: boolean = false;
    loadedProfileData: boolean = false;
    conversations;
    newMessagesForConversation: Map<Conversation, number> = new Map();

    constructor(
                private authService: AuthService,
                private messageService: MessagesService,
                private profileService: ProfilesService,
                private sanitizer: DomSanitizer) { }

    ngOnInit(): void {
        this.conversations = [];
        //this.messageService.conversations = this.conversations;
        this.conversationsLoaded = false;
        this.loadedProfileData = false;
        this.fillProfileData();
    }

    fillProfileData(){
        //this.user = this.profileService.getProfileLogged();
        this.userToken = this.authService.user.getValue().token;
        this.profileService.fetchLoggedProfile(this.userToken).subscribe(response => {
          console.log(response);
          this.user = response;
          this.loadedProfileData = true;
          this.getConversationsSidebar();
        })
    }

    getConversationsSidebar(){
        this.messageService.getConversations().subscribe(response => {
            //console.log(response);
            for(let conv of response){
                const messagesOfConversationResponse: MessageModel[] = [];
                const conversationResponse: Conversation = new Conversation(conv.idConversation, conv.firstProfile, conv.secondProfile, conv.latestMessage, messagesOfConversationResponse);

                this.newMessagesForConversation.set(conversationResponse, 0);

                for(let msg of conv.messages){
                    const msgToAdd: MessageModel = new MessageModel(msg.idMessage, msg.idProfileSender, msg.idProfileReciver, msg.idConversation, msg.message, msg.dateMillis, msg.seen);

                    if(!msgToAdd.isSeen && msgToAdd.idProfileReciver === this.user.id){
                        this.newMessagesForConversation.set(conversationResponse, this.newMessagesForConversation.get(conversationResponse) + 1);
                    }
                    conversationResponse.messages.push(msgToAdd);
                }
                this.conversations.push(conversationResponse);
                this.messageService.conversations.push(conversationResponse);
            }
            this.messageService.newMessagesForConversation = this.newMessagesForConversation;
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
