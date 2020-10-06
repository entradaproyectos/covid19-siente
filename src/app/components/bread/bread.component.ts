import { Component, OnInit, Input } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-bread',
  templateUrl: './bread.component.html',
  styles: []
})
export class BreadComponent implements OnInit {

  @Input() productos:Producto[];
  @Input() categorias:any;

  id_param:string = '';
  id_parnum:number = null;

  nombre_categoria:string = '';
  nombre_subcategoria:string;

  id_subcategoria:number;
  id_categoria:number;

  id_sub_num:string;

  elemento:string = '';

  producto:Producto;

  constructor(private route:ActivatedRoute,
              private router: Router,
              private _dt:DataService
    ) { }

  ngOnInit(): void {  

    let ruta = this.router.url;
    let ruta_exp = ruta.split('/');

    this.elemento = ruta_exp[1];
    this.id_param = ruta_exp[2];
    this.id_parnum = Number(ruta_exp[2]);

    if(!this.id_param){

      this._dt.getCategorias().subscribe( (categorias:any[]) =>{
        this.categorias = categorias;
      })
    }
    
    if(this.elemento === 'categorias' && this.id_parnum){

      if( this.id_parnum < 7 ){
        this._dt.getCategoriaPorNum(this.id_parnum).subscribe( nombre_cat => {
          this.nombre_categoria = nombre_cat;
          this.id_categoria = this.id_parnum;
        });

      }else if ( this.id_parnum > 6 ){
        this._dt.getSubCategoriaPorNum(this.id_parnum).subscribe( nombre_subcat => {
          this.nombre_subcategoria = nombre_subcat;
        });
      }

    }else if(this.elemento === 'productos'){

      this._dt.getSubCategoriaPorNum(this.id_parnum).subscribe( nombre_subcat => {
        this.nombre_subcategoria = nombre_subcat;
      });

      if(this.id_parnum > 6 && this.id_parnum < 20){
        this.nombre_categoria = 'Tés a Granel';
        this.id_categoria = 1;
      }else if(this.id_parnum > 19 && this.id_parnum < 24){
        this.nombre_categoria = 'Infusiones a Granel';
        this.id_categoria = 2;
      }else if(this.id_parnum > 23 && this.id_parnum < 27){
        this.nombre_categoria = 'Infusiones o Té Envasado';
        this.id_categoria = 3;
      }

    }else if(this.elemento === 'producto'){

      this._dt.getProducto(this.id_parnum).subscribe( (data:Producto) => {
        this.producto = data;
        this.id_subcategoria = data.id_categoria;
        
        this._dt.getSubCategoriaPorNum(this.producto.id_categoria).subscribe( (nombre_subcat:any) => {
          this.nombre_subcategoria = nombre_subcat;

          if(this.id_subcategoria > 6 && this.id_subcategoria < 20){
            this.nombre_categoria = 'Tés a Granel';
            this.id_categoria = 1;
          }else if(this.id_subcategoria > 19 && this.id_subcategoria < 24){
            this.nombre_categoria = 'Infusiones a Granel';
            this.id_categoria = 2;
          }else if(this.id_subcategoria > 23 && this.id_subcategoria < 27){
            this.nombre_categoria = 'Infusiones o Té Envasado';
            this.id_categoria = 3;
          }
        });
      });
    }
  }

  IrCategoria(){
    this.router.navigate(['categorias', this.id_categoria]);
  }

  IrSubCategoria(){
    this.router.navigate(['categorias', this.producto.id_categoria]);
  }
}
