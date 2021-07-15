import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Profile } from "../../models/profile.model";
import { ProfilesService } from "../../services/profiles.service";

const STATUS_OK = 200;

@Component({
    selector: 'app-update-profile',
    templateUrl: './update-profile.component.html',
    styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
    @ViewChild('f') updateProfileForm: NgForm;
    profile: Profile;
    loadingProfile: boolean = true;
    idLoggedUser: string = JSON.parse(localStorage.getItem('userData')).id.toString();


    loading: boolean;
    generalDataChanged: boolean = false;
    generalDataFormSubmitted: boolean = false;
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


    /**
     * FILE IMMAGINE DEL PROFILO.
     */
    selectedFile: File;
    fileIsOkay: boolean = false;
    fileIsSended: boolean = false;
    fileIsSelected: boolean = false;
    fileName: string = "";


    constructor(private profilesService: ProfilesService, private router: Router){}

    ngOnInit() {
        this.getProfile();
    }

    onChangeGeneralData(){
        this.loading = true;
        let profileUpdated: Profile = new Profile(this.idLoggedUser,this.updateProfileForm.value.nome, this.updateProfileForm.value.nickname, this.updateProfileForm.value.biografia, null, this.profile.email);
        this.generalDataFormSubmitted = true;

        this.profilesService.updateProfile(profileUpdated).subscribe(response => {
            if(response.status === STATUS_OK){
                this.generalDataChanged = true;
                this.loading = false;
            }
        }, error => {
            this.generalDataChanged = false;
            this.loading = false;
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
        this.loading = true;

        if((this.emailForm.get('password').valid && 
        this.emailForm.get('confirm').valid ) && 
        this.emailForm.touched) {
            let profileUpdated: Profile = this.profile;
            let userRequest: {
                idUser: string,
                nickname: string,
                email: string,
                pass: string
            } = {idUser: this.idLoggedUser,nickname: this.profile.nickname, email: this.profile.email, pass: this.emailForm.get('password').value};
            profileUpdated.email = this.emailForm.value.email;
            this.emailChangeSubmitted = true;

            this.profilesService.checkPassword(userRequest).subscribe(response =>{
                if(response.status === STATUS_OK){
                    this.profilesService.updateProfile(profileUpdated).subscribe(response => {
                        this.emailChangeSuccess = true;
                        this.loading = false;
                    }, error => {
                        this.emailChangeSuccess = false;
                        this.loading = false;
                    });
                }
            }, error => {
                this.emailChangeSuccess = false;
                this.loading = false;
            });
        }
    }

    private startingPasswordForm(){
        this.passwordForm = new FormGroup({
            'old': new FormControl(null, [Validators.required]),
            'new': new FormControl(null, [Validators.required]),
            'confirm': new FormControl(null, [Validators.required])
        });
    }

    onChangePassword(){
        this.loading = true;

        let newPassword: string = this.passwordForm.get('new').value;
        let confirmNewPassword: string = this.passwordForm.get('confirm').value;
        this.passwordChangeSuccess = false;
        if(newPassword != confirmNewPassword){
            this.passwordChangeSubmitted = true;
            this.loading = false;
            return;
        }
        let userRequest: {
            idUser: string,
            nickname: string,
            email: string,
            pass: string
        } = {idUser: this.idLoggedUser,nickname: this.profile.nickname, email: this.profile.email, pass: this.passwordForm.get('old').value};
        this.profilesService.checkPassword(userRequest).subscribe(response => {
            this.profilesService.updatePassword(this.idLoggedUser, newPassword).subscribe(response => {
                if(response.status === STATUS_OK){
                    this.passwordChangeSubmitted = true;
                    this.passwordChangeSuccess = true;
                    this.loading = false;

                }
            })
        }, error => {
            this.passwordChangeSubmitted = true;
            this.passwordChangeSuccess = false;
            this.loading = false;
        })

    }

    private getProfile(){
        this.profilesService.fetchAccount(this.idLoggedUser).subscribe(response => {
            this.profile = new Profile(response.id, response.name, response.nickname, response.bio, response.proPic, response.email);
            this.loadingProfile = false;
            this.startingEmailForm();
            this.startingPasswordForm();
        })
    }

    onFileChanged(event) {
        this.selectedFile = event.target.files[0];
        this.fileIsSelected = true;
        this.fileName = this.selectedFile.name;
    }


    onUpload() {
        const uploadData = new FormData();
        uploadData.append('myFile', this.selectedFile, this.selectedFile.name);

        this.profilesService.uploadProfilePic(uploadData).subscribe(response => {
            this.fileIsOkay = true;
            this.fileIsSended = true;
        }, err => {
            this.fileIsOkay = false;
            this.fileIsSended = true;
        });
    }
    
}