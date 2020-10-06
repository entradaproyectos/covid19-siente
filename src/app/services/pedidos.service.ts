import { Injectable } from '@angular/core';
import { Pedido } from '../models/pedido';
import { Producto } from '../models/producto';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  pedido: any;
  producto: Producto;
  array_prods: any[] = [];
  pedidos_relizados:Pedido[];

  constructor( private router: Router) { 
  }

  guardarPedidoStorage(pedido:Pedido){
	  localStorage.setItem('pedido', JSON.stringify(pedido));
  }

  borrarArtStorage(producto:Producto){

    this.pedido = JSON.parse(localStorage.getItem('pedido'));

    for(let prod of this.pedido.articulos){
      if(prod.id_prod === producto.id_prod && prod.cantidad === producto.cantidad){
        var i = this.pedido.articulos.indexOf(prod);
        var precio_prod = prod.precio;
      }
    }

    this.pedido.precio_final = this.pedido.precio_final - precio_prod;
    this.array_prods = this.pedido.articulos.splice(i,1);
    this.pedido.num_art--;
    this.guardarPedidoStorage(this.pedido);
    return this.pedido;
  
  }

  addArtStorage(producto:Producto){

    producto.precio = Number((Math.round(producto.precio*100)/100).toFixed(2));

    if (localStorage.getItem('pedido')) {

      var existe = false;

      this.pedido = JSON.parse(localStorage.getItem('pedido'));

      for(let articulo of this.pedido.articulos){
        if(articulo.id_prod == producto.id_prod && articulo.cantidad == producto.cantidad){
          // console.log(articulo.nombre);
          // console.log(this.producto);
          existe = true;

          producto.precio_final = Number((Math.round((articulo.precio_final + producto.precio)*100)/100).toFixed(2));
          producto.unidades = articulo.unidades + 1;

          this.borrarArtStorage(producto);

        }
      }
      this.array_prods = this.pedido['articulos'];

      if(!existe){
        producto.unidades = 1;
        producto.precio_final = Number((Math.round((producto.precio)*100)/100).toFixed(2));
      }
      
      this.array_prods.push(producto);

    }else{
      this.pedido = new Pedido();
      this.array_prods = this.pedido['articulos'];

      producto.unidades = 1;
      producto.precio_final = Number((Math.round((producto.precio)*100)/100).toFixed(2));

      this.array_prods.push(producto);
    }

      var precio_suma=0;

      this.pedido['articulos'] = this.array_prods;
      console.log('articulos',this.array_prods);
      this.pedido['num_art'] = this.array_prods.length;

      if(this.array_prods.length > 0){
        for(let prodi of this.array_prods){
          precio_suma = precio_suma + prodi.precio_final;
          console.log(prodi.precio_final);
          console.log(precio_suma);
        }
      }
      console.log('precio suma final',precio_suma);

      this.pedido.precio_final = precio_suma;

      this.guardarPedidoStorage(this.pedido);
      return (this.pedido);
  }

  enviarPedido(){

    this.pedido = JSON.parse(localStorage.getItem('pedido'));
    // console.log(this.pedido);

    if (!localStorage.getItem('pedidos_realizados')) {
      this.pedidos_relizados = [];
      var ped_rel = this.pedidos_relizados.push(this.pedido);
    }else{
      this.pedidos_relizados = JSON.parse(localStorage.getItem('pedidos_realizados'));
      var ped_rel = this.pedidos_relizados.push(this.pedido);
      

    }

    localStorage.setItem('pedidos_realizados', JSON.stringify(this.pedidos_relizados));
    localStorage.removeItem('pedido');
    this.pedidos_relizados = JSON.parse(localStorage.getItem('pedidos_realizados'));
  }

}
