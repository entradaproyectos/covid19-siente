import { Component, OnInit, Input } from '@angular/core';
import { Producto } from '../../interfaces/productos';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: []
})
export class ProductosComponent implements OnInit {

  @Input() productos: Producto[];
  id_parnum: number;
  id_param: string;
  catSub:string[] = [];
  sub_cat:any;
  cat_num:any;

  loading:boolean = true;

  constructor(
    private router: ActivatedRoute,
    private dataService: DataService,
    private route: Router
    
    ) { }

  ngOnInit(): void {

    window.scrollTo(0,0);

    this.id_param = this.router.snapshot.paramMap.get('id');
    this.id_parnum = Number(this.id_param);

    this.dataService.getProductos(this.id_param).subscribe( (data:any) => {
      this.productos = data;
      console.log(this.productos);
      this.loading = false;
    });

  }

  abrirProducto(id: number | string){
    id = String(id);
    this.route.navigate(['producto',id]);
  }

  bread_nav_cat(){
    this.route.navigate(['galeria',this.id_param]);
  }
}


