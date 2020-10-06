import { Component, OnInit, Output, Input} from '@angular/core';
import { Pedido } from 'src/app/models/pedido';

@Component({
  selector: 'app-navdown',
  templateUrl: './navdown.component.html',
  styles: []
})
export class NavdownComponent implements OnInit{

  @Input() pedido:Pedido;

  producto:any[];
  num_prods:number;
  productos: any[] = [];
  precio_total:number;
  precio_final:number;
  precio_transp:number;
  
  constructor() { 

  }
  ngOnInit(){

    setInterval( () => {
      if (localStorage.getItem('pedido')) {
        this.pedido = JSON.parse(localStorage.getItem('pedido'));
      }
    } , 3000);

  }



}
