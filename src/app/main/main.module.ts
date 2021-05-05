import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { MainComponent } from "./main.component";
import { PostCardComponent } from "./post-card/post-card.component";


@NgModule({
    declarations: [
        MainComponent,
        HeaderComponent,
        PostCardComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        MainComponent,
        HeaderComponent
    ]
})
export class MainModule {}