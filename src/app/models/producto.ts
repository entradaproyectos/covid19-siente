
export class Producto{
	id_prod: number ;
    id_categoria:number ;
    nombre:string ;
    ingredientes:string ;
    imagen:string ;
    precio_gramo:number ;
    cantidad?:number ;
    precio?:number ;
    unidades?:number ;
    precio_final?:number ;
    oferta?:boolean;
    precio_gramo_oferta?:number;

	constructor(){
        
        this.unidades = 0;
        this.precio_final = 0;


		
	}
}