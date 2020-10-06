import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


//components
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavdownComponent } from './components/navdown/navdown.component';
import { BreadComponent } from './components/bread/bread.component';

//pages
import { InicioComponent } from './pages/inicio/inicio.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';

//services
import { DataService } from './services/data.service';
import { PedidosService } from './services/pedidos.service';

//pipes
import { ImagenesPipe } from './pipes/imagenes.pipe';
import { ConvertPipe } from './pipes/convert.pipe';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InicioComponent,
    CategoriasComponent,
    BuscarComponent,
    CarritoComponent,
    ProductosComponent,
    ImagenesPipe,
    ProductoComponent,
    ConvertPipe,
    NavdownComponent,
    BreadComponent,
    PedidosComponent
    
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    DataService,
    PedidosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
