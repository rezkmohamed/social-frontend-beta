import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomepageComponent } from "./homepage/homepage.component";
import { MainComponent } from "./main.component";
import { ProfilePageComponent } from "./profile-page/profile-page.component";


const routes: Routes = [
    { path: '', component: MainComponent, children: [
        { path: '', component: HomepageComponent },
        { path: 'profiles', children: [
            {path: ':id', component: ProfilePageComponent}
        ]}
    ]}
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule {}