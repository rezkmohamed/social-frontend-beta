import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

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
