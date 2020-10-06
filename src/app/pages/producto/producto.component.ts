import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';

import Swal from 'sweetalert2'
import { PedidosService } from '../../services/pedidos.service';
import { Pedido } from '../../models/pedido';
import { Producto } from '../../models/producto';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: []
})
export class ProductoComponent implements OnInit {

  @Output() searchItem = new EventEmitter();
  
  pedido:Pedido;

  producto: Producto;
  id_parnum: number;
  sub_cat:any[] = [];
  precio_gramo:any;

  num_prods:number;
  productos: any[] = [];
  precio_total:number;
  precio_final:number;
  precio_transp:number;

  categoria:string;
  subcategoria:any;

  id_categoria:number;

  cat_num:number;

  constructor(
    private router: ActivatedRoute  ,
    private dataService: DataService ,
    private pedidoService: PedidosService
    
       ) { 

    }

  ngOnInit(): void {

    window.scrollTo(0,0);

    let id_param = this.router.snapshot.paramMap.get('id');
    this.id_parnum = Number(id_param);
    this.dataService.getProducto(this.id_parnum).subscribe( (data:any) => {
      this.producto = data;
      this.id_categoria = Number(data.id_categoria);
    });

    if (localStorage.getItem('pedido')) {
      this.pedido = JSON.parse(localStorage.getItem('pedido'));
    }
    console.log(this.pedido);

  }

  comprarGr(gramos:number){

    Swal.fire({
      title: `¿Quieres añadir ${this.producto.nombre} ${gramos}gr al carrito?`,
      allowOutsideClick: false,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#AEBD00',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {

        let precio:number;
        if (this.producto.oferta) {
            precio = this.producto.precio_gramo_oferta*gramos;
        } else {
            precio = this.producto.precio_gramo*gramos;
        }

        this.producto.cantidad = gramos;
        this.producto.precio = Number((Math.round(precio*100)/100).toFixed(2));

        console.log('pag_producto',this.pedido);

        // console.log(this.producto);

        this.pedido = this.pedidoService.addArtStorage(this.producto);
        this.searchItem.emit(this.pedido);
        // window.location.reload(true);
        // console.log(this.pedido);

        Swal.fire({
          icon: 'success',
          title: 'Añadido a Carrito',
          showConfirmButton: false,
          timer: 1500
        })

        }
      }
    )

  }

}
