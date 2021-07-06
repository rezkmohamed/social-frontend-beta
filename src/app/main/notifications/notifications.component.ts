import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'app-notifications-component',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit{
    constructor(){}

    ngOnInit(): void {
        console.log();
    }

    onNavigateToNotification(){
        console.log('notification cliccked!');
    }
}