export class Creance {
    code?:number ;

    selected?:boolean = false;

    dueDate?:string ;

    amount?:number ;

    creanceStatus?:string ;

    serviceProvider?: {
        name?:string;
        code?:number;
        image?:string;
    } ; //creancier.serviceProvider

    creancier?:string ; //creancier.name

}
