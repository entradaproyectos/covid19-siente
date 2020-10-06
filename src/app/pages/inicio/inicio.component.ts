import { Component, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/productos';
import { DataService } from '../../services/data.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styles: []
})
export class InicioComponent implements OnInit {

  top_ventas:Producto[];
  top_ventas_ids:any;
  destacados:Producto[];
  destacados_ids:any;
  ofertas:Producto[];
  ofertas_ids:any;

  loading:boolean = true;
  instrucciones:boolean = false;
  mapa:boolean = false;
  dispositivo:string;
  desktop:boolean;

  constructor(private _ds:DataService, private route:Router) { 

    this.top_ventas_ids = [50,62,122,130,8];
    this.destacados_ids = [49,46,15,60,73,86,82,102,108,120,121,129,140];
    this.ofertas_ids = [];
    
    const platform = navigator.platform;

    if(platform === 'HP-UX' || 'Linux i686' || 'Linux armv7l' || 'Mac68K' || 'MacPPC' || 'MacIntel' || 'SunOS' || 'Win16' || 'Win32' || 'WinCE' || 'Opera'){
      this.desktop = true;
    }else{
      this.desktop = false;
    }
    
  }

  ngOnInit(): void {

    console.log(this.desktop);
    console.log(navigator.platform);

    window.scrollTo(0,0);

    var array:any[] = [];

    for (let index = 0; index < this.top_ventas_ids.length; index++) {
      var prod:any = '';
      this._ds.getProducto(this.top_ventas_ids[index]).subscribe( (data:any) => {
        prod = data;
        array.push(prod);
      });
    }
    this.top_ventas = array;
    var array2:any[] = [];
    for (let index = 0; index < this.destacados_ids.length; index++) {
      var prod:any = '';
      this._ds.getProducto(this.destacados_ids[index]).subscribe( (data:any) => {
        prod = data;
        array2.push(prod);
      });
    }
    this.destacados = array2;

    var array3:any[] = [];
    for (let index = 0; index < this.ofertas_ids.length; index++) {
      var prod:any = '';
      this._ds.getProducto(this.ofertas_ids[index]).subscribe( (data:any) => {
        prod = data;
        array3.push(prod);
      });
    }
    this.loading = false;
    this.ofertas = array3;
  }

  abrirProducto(id:number | string){
    id = String(id);
    this.route.navigate(['producto',id]);
  }

  mostrarInstrucciones(){
    this.instrucciones = true;
  }
  ocultarInstrucciones(){
    this.instrucciones = false;
  }

  

}
