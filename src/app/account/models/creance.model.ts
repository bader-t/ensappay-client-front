export class Creance {
    code?:number ;

    selected?:boolean = false;

    dueDate?:string ;

    amount?:number ;

    creanceStatus?:string ;

    serviceProvider?: ServiceProvider; //creancier.serviceProvider

    creancier?:string ;
    
    constructor(code?:number ,

        dueDate?:string,

        amount?:number ,

        creanceStatus?:string ,
        creancier?:string ,
        ){
            this.code=code;
            this.selected =false;
            this.dueDate =dueDate;
            this.creanceStatus = creanceStatus;
           
            this.creancier=creancier;
            
    }
     addServiceProv(serviceProvider :ServiceProvider) {
      this.serviceProvider = serviceProvider;
    }

}
export class ServiceProvider {

    name?:string;
    code?:number;
    image?:string;

  constructor(code: number, name: string , image: string) {
    this.code = code;
    this.name = name;
    this.image = image;
  }
}
