import { Component,Input, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { Pedido } from './models/pedido';

import { ProductoComponent } from './pages/producto/producto.component';
import { NavdownComponent } from './components/navdown/navdown.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  @Input() pedido:Pedido;
  @Input() pedidos_hechos:Pedido[];

  onActivate(componentReference) {

    if (localStorage.getItem('pedido')) {
      this.pedido = JSON.parse(localStorage.getItem('pedido'));
    }

    if (localStorage.getItem('pedidos_realizados')) {
      this.pedidos_hechos = JSON.parse(localStorage.getItem('pedidos_realizados'));
    }

 }

  ngOnInit() {
   
  }

  

}

