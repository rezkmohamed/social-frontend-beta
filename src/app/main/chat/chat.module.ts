import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ChatContentComponent } from "./chat-content/chat-content.component";
import { ChatComponent } from "./chat.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

@NgModule({
    declarations: [
        ChatComponent,
        ChatContentComponent,
        SidebarComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        HttpClientModule,
    ],
    exports: [
        ChatComponent
    ]
})
export class ChatModule {}