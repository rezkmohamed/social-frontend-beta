import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
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

    constructor(private profilesService: ProfilesService, private router: Router){}

    ngOnInit(): void {}

    onSubmit(){
        console.log(this.addPostForm.value);
        let urlImg = this.addPostForm.value.urlImg;
        let descrizione = this.addPostForm.value.descrizione;


        let date = moment().format();
        console.log(date);

        this.profilesService.createPost(new Post(null,urlImg, descrizione, date, this.idLoggedUser)).subscribe(response => {
            console.log(response);
            this.router.navigate([`/profiles/${this.idLoggedUser}`]);
        })
    }
}