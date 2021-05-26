import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Profile } from "../../models/profile.model";
import { ProfilesService } from "../../profiles.service";

@Component({
    selector: 'app-update-profile',
    templateUrl: './update-profile.component.html',
    styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
    @ViewChild('f') updateProfileForm: NgForm;
    profile: Profile;
    loadingProfile: boolean = true;
    //idSession: string = JSON.parse(localStorage.getItem("sessione")).id.toString();
    //idSession: string = "3a751805-3141-41e4-ac94-9cee1bd262a0";
    idLoggedUser: string = JSON.parse(localStorage.getItem('userData')).id.toString();

    generalDataChanged: boolean = false;
    /**
     * cambio mail
     */
    emailForm: FormGroup =new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null, [Validators.required]),
        'confirm': new FormControl(null, [Validators.required])
    });
    emailChangeSubmitted: boolean = false;
    emailChangeSuccess: boolean = false;
    /**
     * cambio psw
     */
    passwordForm: FormGroup = new FormGroup({
        'old': new FormControl(null, [Validators.required]),
        'new': new FormControl(null, [Validators.required]),
        'confirm': new FormControl(null, [Validators.required])
    });
    passwordChangeSubmitted: boolean = false;
    passwordChangeSuccess: boolean = false;

    constructor(private profilesService: ProfilesService, private router: Router){}

    ngOnInit() {
        /**
         * DA MODIFICARE:
         * DOPO AVER IMPLEMENTATO IL LOGIN, AVRO' I DATI GIA' NEL 
         * LOCALSTORAGE (NO CHIAMATE SUPPLEMENTARI).
         */
        this.getProfile();
    }
    
    onChangeGeneralData(){
        let profileUpdated: Profile = new Profile(this.idLoggedUser,this.updateProfileForm.value.nome, this.updateProfileForm.value.nickname, this.updateProfileForm.value.biografia, this.updateProfileForm.value.proPic, this.profile.email);

        this.profilesService.updateProfile(profileUpdated).subscribe(response => {
            console.log(response);
            console.log(response.status);
        })
    }

    private startingEmailForm(){
        this.emailForm = new FormGroup({
            'email': new FormControl(this.profile.email, [Validators.required, Validators.email]),
            'password': new FormControl(null, [Validators.required]),
            'confirm': new FormControl(null, [Validators.required])
        });
    }

    onChangeMail(){
        if((this.emailForm.get('password').valid && 
        this.emailForm.get('confirm').valid ) && 
        this.emailForm.touched) {
            let profileUpdated: Profile = this.profile;
            profileUpdated.email = this.emailForm.value.email;
            
            this.profilesService.updateProfile(profileUpdated).subscribe(response => {
                console.log(response);
                this.emailChangeSubmitted = true;
                this.emailChangeSuccess = true;
            }, error => {
                console.log(error);
                this.emailChangeSuccess = false;
            })
        }
    }

    onChangePassword(){
        //TO-DO
    }

    private getProfile(){
        this.profilesService.fetchAccount(this.idLoggedUser).subscribe(response => {
            this.profile = new Profile(response.id, response.name, response.nickname, response.bio, response.proPic, response.email);
            this.loadingProfile = false;
            this.startingEmailForm();
        })
    }
}