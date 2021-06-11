import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import * as moment from "moment";
import { Post } from "../models/post.model";
import { ProfilesService } from "../profiles.service";


@Component({
    selector: 'app-add-post',
    templateUrl: './add-post.component.html',
    styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
    @ViewChild('f') addPostForm: NgForm;
    idLoggedUser: string = JSON.parse(localStorage.getItem('userData')).id.toString();
    selectedFile: File;
    fileIsOkay: boolean = false;
    fileIsSended: boolean = false;
    descrizione: string = "";


    constructor(private profilesService: ProfilesService, private router: Router){}

    ngOnInit(): void {}



    onFileChanged(event) {
        this.selectedFile = event.target.files[0]
    }


    onUpload() {
        const uploadData = new FormData();
        let date = moment().format();

        uploadData.append('myFile', this.selectedFile);
        console.log(uploadData.get('myFile'));
        uploadData.append('description', this.descrizione);
        console.log(uploadData.get('description'));

        uploadData.append('date', date);
        console.log(uploadData.get('date'));

        uploadData.append('idProfile', this.idLoggedUser);
        console.log(uploadData.get('idProfile'));

        this.profilesService.createPost(uploadData).subscribe(response => {
            console.log(response);
            this.router.navigate([`/profiles/${this.idLoggedUser}`]);
        })

    }
}