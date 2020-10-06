import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from './pages/inicio/inicio.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';

export const routes: Routes = [
    { path:'', pathMatch:'full',redirectTo: 'inicio'},
    { path: 'inicio', component: InicioComponent },
    { path: 'categorias', component: CategoriasComponent },
    { path: 'categorias/:id', component: CategoriasComponent},
    { path: 'productos/:id', component: ProductosComponent },
    { path: 'producto/:id', component: ProductoComponent },
    { path: 'buscar', component: BuscarComponent },
    { path: 'buscar/:texto', component: BuscarComponent },
    { path: 'carrito', component: CarritoComponent },
    { path: 'pedidos', component: PedidosComponent },
    { path:'**', pathMatch:'full',redirectTo: 'inicio'}
    
];

@NgModule({

	imports: [
		RouterModule.forRoot(routes, {useHash:true})
	],
	exports: [
		RouterModule
	]
})

export class AppRoutingModule {
	constructor() {}
	
}