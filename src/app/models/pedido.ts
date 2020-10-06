import { Producto } from './producto';

export class Pedido{
    id_ped:number;
    creadaEn: string;
    observaciones:string;
    precio_final:number;
    precio_transp:number;
    num_art:number;
    articulos: Producto[];
    enviadaEn: string;
    fecha_entrega:string;

	constructor(){

        var f = new Date();

        var minutos = null;

        if(f.getMinutes().toString().length < 2){
            minutos = '0' + f.getMinutes();
        }else if(f.getMinutes() === 0){
            minutos = '00';
        }else{
            minutos = f.getMinutes();
        }

        this.creadaEn = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear() + "-" + f.getHours() + ":" + minutos;
        
        this.id_ped = new Date().getTime();

        this.observaciones = '';
        
        this.precio_final = null;

        this.num_art = null;

        this.articulos = [];

        this.enviadaEn = '';

        this.fecha_entrega = '';

        this.precio_transp = null;

	}
}