import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { MainRoutingModule } from "./main-routing.module";
import { MainComponent } from "./main.component";
import { PostCardComponent } from "./post-card/post-card.component";
import { ProfilePageComponent } from "./profile-page/profile-page.component";
import { ProfileElementViewComponent } from "./profiles-list-view/profile-element-view/profile-element-view.component";
import { ProfilesListViewComponent } from "./profiles-list-view/profiles-list-view.component";


@NgModule({
    declarations: [
        MainComponent,
        HeaderComponent,
        PostCardComponent,
        HomepageComponent,
        ProfilePageComponent,
        ProfilesListViewComponent,
        ProfileElementViewComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MainRoutingModule
    ],
    exports: [
        MainComponent,
        HeaderComponent
    ]
})
export class MainModule {}