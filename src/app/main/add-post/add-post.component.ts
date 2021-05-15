import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Post } from "../models/post.model";
import { ProfilesService } from "../profiles.service";


@Component({
    selector: 'app-add-post',
    templateUrl: './add-post.component.html',
    styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
    @ViewChild('f') addPostForm: NgForm;

    constructor(private profilesService: ProfilesService, private router: Router){}

    ngOnInit(): void {}

    onSubmit(){
        console.log(this.addPostForm.value);
        let urlImg = this.addPostForm.value.urlImg;
        let descrizione = this.addPostForm.value.descrizione;
        //let idSessione: string = JSON.parse(localStorage.getItem("sessione")).id.toString();
        let idSessione: string = "3a751805-3141-41e4-ac94-9cee1bd262a0";

        this.profilesService.createPost(new Post(null,urlImg, descrizione, new Date(Date.now()).toDateString(), idSessione)).subscribe(response => {
            console.log(response);
            this.router.navigate([`/profiles/${idSessione}`]);
        })
    }
}