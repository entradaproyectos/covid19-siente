import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  categorias: any[] = [];
  subCategorias: any[] = [];
  categoria_nombre:string;
  subcategoria_nombre:string;

  constructor( private http: HttpClient ) { }

  getCategorias(){
    return this.http.get('/assets/data/categorias.json');
  }

  getSubCategorias(id:number | string){
    id = Number(id);
    return this.http.get('/assets/data/categorias.json').pipe(
      map( (categorias:any) => {
        let subs: any[] = [];
        for(let categoria of categorias){
          let subCategorias = categoria.subcategorias;
          if(categoria.id === id){
            return subCategorias;
          }
        }
      })
    );
  }


  
  getProductos(id:number | string){
    
    id = Number(id); 
    return this.http.get('/assets/data/productos.json').pipe(
      map( (productos:any) => {
        
        let prods: any[] = [];
        for(let producto of productos){
          let prods_sub = Number(producto.id_categoria);
          
          if(prods_sub === id){
            prods.push(producto);
          }
        }
        return prods;
      })
    );
  }

  getProducto(id:number){
    
    id = Number(id); 
    return this.http.get('/assets/data/productos.json').pipe(
      map( (productos:any) => {
        for(let producto of productos){
          if(producto.id_prod === id){
            let pro =  producto;
            return producto;
          }
        }
      })
    );
  }

  getCategoriaPorNum(id:number | string){
    return this.http.get('/assets/data/categorias.json').pipe(
      map( (categorias:any) => {
        for(let categoria of categorias){
          if (categoria.id == id){
            return categoria.nombre;
          }
        }
      })
    )
  }

  getSubCategoriaPorNum(id:number){
    
    return this.http.get('/assets/data/categorias.json').pipe(
      map( (categorias:any) => {
        var array_subs = [];
        for (let index = 0; index < categorias.length; index++) {
          for(let subcate of categorias[index].subcategorias){
            array_subs.push(subcate);
          }
        }
        for (let index = 0; index < array_subs.length; index++) {
          
          if(array_subs[index].id === id){
            return array_subs[index].nombre;
          }
        }
      })
      )
    }

  buscarNombre(texto:string){
    texto = texto.toLowerCase();
    var array:any[] = [];
    return this.http.get('/assets/data/productos.json').pipe(
      map( (productos:any) => {
        for(let producto of productos){
          if(producto.nombre.toLowerCase().includes(texto)){
            array.push(producto);
          }
        }
        return array;
      })
    )
  }  

  buscarIngre(texto:string){
    texto = texto.toLowerCase();
    var array:any[] = [];
    return this.http.get('/assets/data/productos.json').pipe(
      map( (productos:any) => {
        for(let producto of productos){
          if(producto.ingredientes.toLowerCase().includes(texto)){
            array.push(producto);
          }
        }
        return array;
      })
    )
  }  
}