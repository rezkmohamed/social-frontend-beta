import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddPostComponent } from "./add-post/add-post.component";
import { ChatComponent } from "./chat/chat.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { MainComponent } from "./main.component";
import { ProfilePageComponent } from "./profile-page/profile-page.component";
import { ProfilesListViewComponent } from "./profiles-list-view/profiles-list-view.component";


const routes: Routes = [
    { path: '', component: MainComponent, children: [

        { path: 'homepage', component: HomepageComponent },
        { path: 'profiles', children: [
            { path: ':id', component: ProfilePageComponent },
            { path: 'list/followers/:idprofile', component: ProfilesListViewComponent },
            { path: 'list/likes/:idpost', component: ProfilesListViewComponent },
            { path: 'list/follows/:idprofiles', component: ProfilesListViewComponent }
        ]},
        { path: 'chat', component: ChatComponent },
        { path: 'posts', children: [
            { path: 'add', component: AddPostComponent }
        ]}

    ]}
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule {}