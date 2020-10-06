export interface Producto{
    id_prod:number;
    id_categoria:number;
    nombre:string;
    ingredientes:string;
    imagen:string; 
    precio_gramo:number;
    cantidad?:number;
    new?:boolean,
    oferta?:boolean,
    precio_gramo_oferta?:number
}
