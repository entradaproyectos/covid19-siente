import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../models/producto';
import { DataService } from '../../services/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: []
})
export class BuscarComponent implements OnInit {

  texto:string;

  productos:Producto[];
  producto:Producto;

  resultado:any[];

  nomb_ingre:string= 'nombre';

  constructor(
    private route: ActivatedRoute,
    private _ds: DataService,
    private router: Router  
    ) { }

  ngOnInit(){

    window.scrollTo(0,0);

    this.texto = this.route.snapshot.paramMap.get('texto');
    this.buscarNombre(this.texto);
  }

  abrirProducto(id:number | string){
    id = String(id);
    this.router.navigate(['producto',id]);
  }

  buscar_algo(texto:string){
    if(this.nomb_ingre == 'nombre'){
      this.buscarNombre(texto);
    }else if(this.nomb_ingre == 'ingredientes'){
      this.buscarIngre(texto);
    }
  }

  buscarNombre(texto:string){
    this.texto = texto;
    this.nomb_ingre = 'nombre';
    if(texto.length === 0){
      return;
    }
    this._ds.buscarNombre(this.texto).subscribe((data:any) => {
          this.productos = data;
        });
  }

  buscarIngre(texto:string){
    this.texto = texto;
    this.nomb_ingre = 'ingredientes';
    if(texto.length === 0){
      return;
    }
    this._ds.buscarIngre(this.texto).subscribe((data:any) => {
          this.productos = data;
        });
  }

  

}
