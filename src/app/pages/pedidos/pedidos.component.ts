import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pedido } from '../../models/pedido';

import Swal  from 'sweetalert2';
import { DataService } from '../../services/data.service';
import { PedidosService } from '../../services/pedidos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styles: []
})
export class PedidosComponent implements OnInit {

  precio_transp = 4.5;

  @Input() pedidos_hechos:Pedido[];
  pedido:Pedido;

  @Output() searchItem = new EventEmitter();

  constructor(
    private _ps:PedidosService,
    private router:Router
    ) { }

  ngOnInit(){

    window.scrollTo(0,0);

    if (localStorage.getItem('pedidos_realizados')) {
      this.pedidos_hechos = JSON.parse(localStorage.getItem('pedidos_realizados'));
    }
  }

  rehacerPedido(pedido:Pedido){

    if (localStorage.getItem('pedido')) {
      Swal.fire({
        title: `Tienes el carrito lleno. ¿Quieres descartar el carrito para hacer este pedido?`,
        text: "Se te creará el pedido como carrito listo para enviar",
        allowOutsideClick: false,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#AEBD00',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Si!',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.value) {
  
          localStorage.removeItem('pedido');
          pedido.id_ped = new Date().getTime();
          this._ps.guardarPedidoStorage(pedido);
          this.searchItem.emit(pedido);
          this.router.navigate(['carrito']);
          setTimeout(()=>{
            window.location.reload(true);
          },1000);

          Swal.fire({
            icon: 'success',
            title: 'Añadido a Carrito',
            showConfirmButton: false,
            timer: 1500
          })
  
          }
        }
      )



    }else{
      //se pasa el pedido a carrito
      Swal.fire({
        title: `¿Quieres rehacer este pedido?`,
        text: "Se te creará el pedido como carrito listo para enviar",
        allowOutsideClick: false,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#AEBD00',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Si!',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.value) {
  
          this._ps.guardarPedidoStorage(pedido);
          this.searchItem.emit(pedido);
          this.router.navigate(['carrito']);
          setTimeout(()=>{
            window.location.reload(true);
          },1000);

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
}
