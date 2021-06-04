import { NgbDate } from "@ng-bootstrap/ng-bootstrap";


export class DateExample {
    dateExample: NgbDate;



    exampleMethodNgbDate(){
        const today = new Date();

        this.dateExample = new NgbDate(
            today.getFullYear(),
            today.getMonth() + 1,// +1 perchè l'array di mesi parte da 0
            today.getDate()
        );
    }


    

}