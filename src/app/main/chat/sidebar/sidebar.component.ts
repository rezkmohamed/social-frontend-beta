import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    @Output() conversationClicked: EventEmitter<any> = new EventEmitter();

    conversations = [
        {name: "David", time: "8:21 AM", latestMassege: 'ciao capo padrone', id: 0 ,messages: [
            {id: 1, body: 'Hello world', time: '8:21', me: true},
            {id: 2, body: 'Hello Bro', time: '8:21', me: false},
            {id: 3, body: 'Che cazzo vuoi da me scemo', time: '8:21', me: true},
            {id: 4, body: 'Hello Bro', time: '8:21', me: true}
        ]},
        {name: "David", time: "8:21 AM", latestMassege: 'ciao capo padrone', id: 0, messages: [
            {id: 1, body: 'Hello world', time: '8:21', me: true},
            {id: 2, body: 'Hello Bro', time: '8:21', me: false},
            {id: 3, body: 'Che cazzo vuoi da me scemo', time: '8:21', me: true},
            {id: 4, body: 'Hello Bro', time: '8:21', me: true}
        ]},
        {name: "David", time: "8:21 AM", latestMassege: 'ciao capo padrone', id: 0, messages: [
            {id: 1, body: 'Hello world', time: '8:21', me: true},
            {id: 2, body: 'Hello Bro', time: '8:21', me: false},
            {id: 3, body: 'Che cazzo vuoi da me scemo', time: '8:21', me: true},
            {id: 4, body: 'Hello Bro', time: '8:21', me: true}
        ]},
        {name: "David", time: "8:21 AM", latestMassege: 'ciao capo padrone', id: 0, messages: [
            {id: 1, body: 'Hello world', time: '8:21', me: true},
            {id: 2, body: 'Hello Bro', time: '8:21', me: false},
            {id: 3, body: 'Che cazzo vuoi da me scemo', time: '8:21', me: true},
            {id: 4, body: 'Hello Bro', time: '8:21', me: true}
        ] },
        {name: "David", time: "8:21 AM", latestMassege: 'ciao capo padrone', id: 0, messages: [
            {id: 1, body: 'Hello world', time: '8:21', me: true},
            {id: 2, body: 'Hello Bro', time: '8:21', me: false},
            {id: 3, body: 'Che cazzo vuoi da me scemo', time: '8:21', me: true},
            {id: 4, body: 'Hello Bro', time: '8:21', me: true}
        ] },
        {name: "David", time: "8:21 AM", latestMassege: 'ciao capo padrone', id: 0, messages: [
            {id: 1, body: 'Hello world', time: '8:21', me: true},
            {id: 2, body: 'Hello Bro', time: '8:21', me: false},
            {id: 3, body: 'Che cazzo vuoi da me scemo', time: '8:21', me: true},
            {id: 4, body: 'Hello Bro', time: '8:21', me: true}
        ] },
        {name: "David", time: "8:21 AM", latestMassege: 'ciao capo padrone', id: 0, messages: [
            {id: 1, body: 'Hello world', time: '8:21', me: true},
            {id: 2, body: 'Hello Bro', time: '8:21', me: false},
            {id: 3, body: 'Che cazzo vuoi da me scemo', time: '8:21', me: true},
            {id: 4, body: 'Hello Bro', time: '8:21', me: true}
        ] },
        {name: "David", time: "8:21 AM", latestMassege: 'ciao capo padrone', id: 0, messages: [
            {id: 1, body: 'Hello world', time: '8:21', me: true},
            {id: 2, body: 'Hello Bro', time: '8:21', me: false},
            {id: 3, body: 'Che cazzo vuoi da me scemo', time: '8:21', me: true},
            {id: 4, body: 'Hello Bro', time: '8:21', me: true}
        ] },
        {name: "David", time: "8:21 AM", latestMassege: 'ciao capo padrone', id: 0, messages: [
            {id: 1, body: 'Hello world', time: '8:21', me: true},
            {id: 2, body: 'Hello Bro', time: '8:21', me: false},
            {id: 3, body: 'Che cazzo vuoi da me scemo', time: '8:21', me: true},
            {id: 4, body: 'Hello Bro', time: '8:21', me: true}
        ] },
        {name: "David", time: "8:21 AM", latestMassege: 'ciao capo padrone', id: 0, messages: [
            {id: 1, body: 'Hello world', time: '8:21', me: true},
            {id: 2, body: 'Hello Bro', time: '8:21', me: false},
            {id: 3, body: 'Che cazzo vuoi da me scemo', time: '8:21', me: true},
            {id: 4, body: 'Hello Bro', time: '8:21', me: true}
        ] },
        {name: "David", time: "8:21 AM", latestMassege: 'ciao capo padrone', id: 0, messages: [
            {id: 1, body: 'Hello world', time: '8:21', me: true},
            {id: 2, body: 'Hello Bro', time: '8:21', me: false},
            {id: 3, body: 'Che cazzo vuoi da me scemo', time: '8:21', me: true},
            {id: 4, body: 'Hello Bro', time: '8:21', me: true}
        ] },
        {name: "David", time: "8:21 AM", latestMassege: 'ciao capo padrone', id: 0, messages: [
            {id: 1, body: 'Hello world', time: '8:21', me: true},
            {id: 2, body: 'Hello Bro', time: '8:21', me: false},
            {id: 3, body: 'Che cazzo vuoi da me scemo', time: '8:21', me: true},
            {id: 4, body: 'Hello Bro', time: '8:21', me: true}
        ] },
        {name: "David", time: "8:21 AM", latestMassege: 'ciao capo padrone', id: 0, messages: [
            {id: 1, body: 'Hello world', time: '8:21', me: true},
            {id: 2, body: 'Hello Bro', time: '8:21', me: false},
            {id: 3, body: 'Che cazzo vuoi da me scemo', time: '8:21', me: true},
            {id: 4, body: 'Hello Bro', time: '8:21', me: true}
        ] },
        {name: "David", time: "8:21 AM", latestMassege: 'ciao capo padrone', id: 0, messages: [
            {id: 1, body: 'Hello world', time: '8:21', me: true},
            {id: 2, body: 'Hello Bro', time: '8:21', me: false},
            {id: 3, body: 'Che cazzo vuoi da me scemo', time: '8:21', me: true},
            {id: 4, body: 'Hello Bro', time: '8:21', me: true}
        ] },
        {name: "David", time: "8:21 AM", latestMassege: 'ciao capo padrone', id: 0, messages: [
            {id: 1, body: 'Hello world', time: '8:21', me: true},
            {id: 2, body: 'Hello Bro', time: '8:21', me: false},
            {id: 3, body: 'Che cazzo vuoi da me scemo', time: '8:21', me: true},
            {id: 4, body: 'Hello Bro', time: '8:21', me: true}
        ] },
        {name: "David", time: "8:21 AM", latestMassege: 'ciao capo padrone', id: 0, messages: [
            {id: 1, body: 'Hello world', time: '8:21', me: true},
            {id: 2, body: 'Hello Bro', time: '8:21', me: false},
            {id: 3, body: 'Che cazzo vuoi da me scemo', time: '8:21', me: true},
            {id: 4, body: 'Hello Bro', time: '8:21', me: true}
        ] }
    ];

    constructor() { }

    ngOnInit(): void {
    }

}
