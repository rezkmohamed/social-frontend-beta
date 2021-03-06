import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddPostComponent } from "./add-post/add-post.component";
import { ChatComponent } from "./chat/chat.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { MainComponent } from "./main.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { EditPostCardComponent } from "./post-card/edit-post-card/edit-post-card.component";
import { DetailFullCompont } from "./profile-page/detail-full/detail-full.component";
import { ProfilePageComponent } from "./profile-page/profile-page.component";
import { UpdateProfileComponent } from "./profile-page/update-profile/update-profile.component";
import { ProfilesListViewComponent } from "./profiles-list-view/profiles-list-view.component";
import { SearchProfilesComponent } from "./search-profiles/search-profiles.component";


const routes: Routes = [
    { path: '', component: MainComponent, children: [
        { path: 'notifications', component: NotificationsComponent},
        { path: 'chat', component: ChatComponent},
        { path: 'homepage', component: HomepageComponent },
        { path: 'profiles', children: [
            { path: ':id', component: ProfilePageComponent },
            { path: 'search/:name', component: SearchProfilesComponent },
            { path: 'list/followers/:idprofile', component: ProfilesListViewComponent },
            { path: 'list/likes/:idpost', component: ProfilesListViewComponent },
            { path: 'list/follows/:idprofiles', component: ProfilesListViewComponent }
        ]},
        {
            path: 'profile', children: [
                {path: 'edit', component: UpdateProfileComponent}
            ]
        },
        { path: 'posts', children: [
            { path: 'add', component: AddPostComponent }
        ]},
        { path: 'post', children: [
            { path: ':id', component: DetailFullCompont },
            { path: 'edit/:id', component: EditPostCardComponent }, 
        ]}
    ]}
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule {}