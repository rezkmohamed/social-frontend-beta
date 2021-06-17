import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    @Output() conversationClicked: EventEmitter<any> = new EventEmitter();

    conversations: {name: string, time: string, latestMassege: string, id: number}[] = [
        {name: "David", time: "8:21 AM", latestMassege: 'ciao capo padrone', id: 0 },
        {name: "David", time: "8:21 AM", latestMassege: 'ciao capo padrone', id: 0 },
        {name: "David", time: "8:21 AM", latestMassege: 'ciao capo padrone', id: 0 },
        {name: "David", time: "8:21 AM", latestMassege: 'ciao capo padrone', id: 0 },
        {name: "David", time: "8:21 AM", latestMassege: 'ciao capo padrone', id: 0 },
        {name: "David", time: "8:21 AM", latestMassege: 'ciao capo padrone', id: 0 },
        {name: "David", time: "8:21 AM", latestMassege: 'ciao capo padrone', id: 0 },
        {name: "David", time: "8:21 AM", latestMassege: 'ciao capo padrone', id: 0 },
        {name: "David", time: "8:21 AM", latestMassege: 'ciao capo padrone', id: 0 },
        {name: "David", time: "8:21 AM", latestMassege: 'ciao capo padrone', id: 0 },
        {name: "David", time: "8:21 AM", latestMassege: 'ciao capo padrone', id: 0 },
        {name: "David", time: "8:21 AM", latestMassege: 'ciao capo padrone', id: 0 },
        {name: "David", time: "8:21 AM", latestMassege: 'ciao capo padrone', id: 0 },
        {name: "David", time: "8:21 AM", latestMassege: 'ciao capo padrone', id: 0 },
        {name: "David", time: "8:21 AM", latestMassege: 'ciao capo padrone', id: 0 },
        {name: "David", time: "8:21 AM", latestMassege: 'ciao capo padrone', id: 0 }
    ];

    constructor() { }

    ngOnInit(): void {
    }

}
