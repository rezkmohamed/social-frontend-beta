import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

@NgModule({
    declarations: [
        AuthComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            { path: '', component: AuthComponent, children: [
                { path: 'login', component: LoginComponent},
                { path: 'register', component: RegisterComponent}/*,
                { path: 'resetpassword', component: ResetPasswordComponent}*/
            ]}
        ])
    ]
})
export class AuthModule {}