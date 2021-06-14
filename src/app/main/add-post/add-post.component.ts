import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import * as moment from "moment";
import { Post } from "../models/post.model";
import { PostsService } from "../services/posts.service";


@Component({
    selector: 'app-add-post',
    templateUrl: './add-post.component.html',
    styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
    @ViewChild('f') addPostForm: NgForm;
    idLoggedUser: string = JSON.parse(localStorage.getItem('userData')).id.toString();
    selectedFile: File;
    fileIsSelected: boolean = false;
    fileName: string = "";
    fileIsOkay: boolean = false;
    fileIsSended: boolean = false;
    descrizione: string = "";


    constructor(private postService: PostsService, private router: Router){}

    ngOnInit(): void {}



    onFileChanged(event) {
        this.selectedFile = event.target.files[0];
        this.fileName = this.selectedFile.name;
        this.fileIsSelected = true;
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


        this.postService.createPost(uploadData).subscribe(response => {
            console.log(response);
            this.fileIsOkay = true;
            this.fileIsSended = true;
            //this.router.navigate([`/profiles/${this.idLoggedUser}`]);
        }, err => {
            console.log(err);
            this.fileIsOkay = false;
            this.fileIsSended = true;
        })

    }
}