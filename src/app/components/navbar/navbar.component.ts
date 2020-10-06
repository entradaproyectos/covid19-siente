import { Component, OnInit, Input } from '@angular/core';
import { Pedido } from '../../models/pedido';
import { Router, ActivatedRoute } from '@angular/router';


// Declaramos las variables para jQuery
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  @Input() pedido:Pedido;
  @Input() pedidos_hechos:Pedido[];
  
  aria_expanded:string;
  clase_div:string;

  pagina:string;


  clase:string = 'collapse navbar-collapse';

  constructor(private router:Router,private route: ActivatedRoute ) { 
  } 

  ngOnInit(): void {

    if (localStorage.getItem('pedidos_realizados')) {
      this.pedidos_hechos = JSON.parse(localStorage.getItem('pedidos_realizados'));
    }

    setInterval(()=>{
      // console.log(window.location.href);
      var url1:string = window.location.href;
      var arr = url1.split('/');
      // console.log(arr[4]);
      this.pagina = arr[4];
    },1000);

    


  }

  abc(){
    $('#navbarSupportedContent').removeClass('show');
  }

  buscar(texto:string){
    if(texto.length == 0){
      return;
    }
    this.router.navigate(['buscar',texto]);
  }
  atras(){
    history.back();
  }

}
