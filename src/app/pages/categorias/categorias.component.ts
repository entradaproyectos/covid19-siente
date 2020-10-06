import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styles: []
})
export class CategoriasComponent implements OnInit {
  
  categorias: Observable<any[]>;
  subcategorias: Observable<any[]>;
  id: any;
  id_param:string;
  id_parnum :number;
  n_cat:any;
  n_subcat:any;

  constructor(
    private dataService:  DataService,
    private route: Router,
    private router: ActivatedRoute
    ) { 
  }

  ngOnInit(): void {

    this.id_param = this.router.snapshot.paramMap.get('id');
    this.id_parnum = Number(this.id_param);
    
    if(!this.id_param){

      this.dataService.getCategorias().subscribe( (categorias:any) =>{
        this.categorias = categorias;
      })
    }else if( this.id_parnum < 7 ){
      this.dataService.getCategoriaPorNum(this.id_parnum).subscribe( nombre_cat => {
        this.n_cat = nombre_cat;
      });

      this.route.navigate(['categorias', this.id_param]);
      this.dataService.getSubCategorias(this.id_param).subscribe( (data:any) => {
        this.categorias = data;
      });
    }else if ( this.id_parnum > 6 ){
      this.dataService.getSubCategoriaPorNum(this.id_parnum).subscribe( nombre_subcat => {
        this.n_subcat = nombre_subcat;
      });
      this.route.navigate(['productos', this.id_param]);
      this.dataService.getProductos(this.id_param).subscribe( (data:any) => {
        this.categorias = data;
      });
    }

  }

  abrir(id:number){
    this.dataService.getSubCategorias(id).subscribe( (data:any) => {
      this.categorias = data;
    });
    
    if(id < 7 ){
      this.route.navigate(['categorias', id]);
    }else if(id > 6 ){
      this.route.navigate(['productos', id]);
    }

  }

}
