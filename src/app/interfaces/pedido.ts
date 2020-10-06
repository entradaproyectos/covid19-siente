export interface Pedido{
    id_ped:number;
    enviado:boolean,
    productos_pedido: any[];
    fecha_envio: Date;
    precio_total:number;
    precio_transp:number;
    observaciones:string;
}
