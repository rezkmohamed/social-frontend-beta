import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { AddPostComponent } from "./add-post/add-post.component";
import { ChatContent } from "./chat/chat-content/chat-content.component";
import { ChatComponent } from "./chat/chat.component";
import { SidebarComponent } from "./chat/sidebar/sidebar.component";
import { HeaderComponent } from "./header/header.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { MainRoutingModule } from "./main-routing.module";
import { MainComponent } from "./main.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { EditPostCardComponent } from "./post-card/edit-post-card/edit-post-card.component";
import { PostCardComponent } from "./post-card/post-card.component";
import { DetailFullCompont } from "./profile-page/detail-full/detail-full.component";
import { ProfilePageComponent } from "./profile-page/profile-page.component";
import { UpdateProfileComponent } from "./profile-page/update-profile/update-profile.component";
import { ProfileElementViewComponent } from "./profiles-list-view/profile-element-view/profile-element-view.component";
import { ProfilesListViewComponent } from "./profiles-list-view/profiles-list-view.component";
import { SearchProfilesComponent } from "./search-profiles/search-profiles.component";


@NgModule({
    declarations: [
        MainComponent,
        HeaderComponent,
        PostCardComponent,
        HomepageComponent,
        ProfilePageComponent,
        ProfilesListViewComponent,
        ProfileElementViewComponent,
        AddPostComponent,
        SearchProfilesComponent,
        UpdateProfileComponent,
        DetailFullCompont,
        EditPostCardComponent,
        ChatComponent,
        SidebarComponent,
        ChatContent,
        NotificationsComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MainRoutingModule,
        InfiniteScrollModule
    ],
    exports: [
        MainComponent,
        HeaderComponent
    ]
})
export class MainModule {}