import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Pedido } from '../../models/pedido';
import { Producto } from '../../models/producto';
import { PedidosService } from '../../services/pedidos.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

// Declaramos las variables para jQuery
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styles: []
})
export class CarritoComponent implements OnInit {

  @Output() searchItem = new EventEmitter();

  pedido:Pedido;
  producto:Producto;
  num_prods:number;
  precio_total:number;
  precio_final:number;
  precio_transp:number;

  @ViewChild('barcelona')barcelona; 
  @ViewChild('peninsula')peninsula; 
  @ViewChild('baleares')baleares; 

  error_transp:boolean = false;

  emailstring: string;
  mailto:boolean = false;

  instrucciones:boolean = false;
  
  constructor(private pedidoService:PedidosService,
              private route: Router,
              private myElement: ElementRef
    ) 
    { 
      this.emailstring = "mailto:entradaproyectos@gmail.com";
    }

  ngOnInit(): void {

    window.scrollTo(0,0);

    if (localStorage.getItem('pedido')) {
      this.pedido = JSON.parse(localStorage.getItem('pedido'));
      
    }else{
      this.route.navigate(['/inicio']);
    }

    console.log('pag_carrito',this.pedido);

  }

  ngAfterViewInit () {
    // console.log(this.barcelona.nativeElement);
    
    if (this.pedido.precio_transp === 4.5) {
      this.barcelona.nativeElement.setAttribute("checked", "true");
    } else if(this.pedido.precio_transp === 4.9){
      this.peninsula.nativeElement.setAttribute("checked", "true");
    } else if(this.pedido.precio_transp === 11.9){
      this.baleares.nativeElement.setAttribute("checked", "true");
    }
  }

  borrarItem(producto:Producto){  

    Swal.fire({
      title: `¿Quieres eliminar ${producto.nombre} ${producto.cantidad}gr del carrito?`,
      // text: "You won't be able to revert this!",
      allowOutsideClick: false,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#AEBD00',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {

        
        if(this.pedido.articulos.length === 1){
          localStorage.removeItem('pedido');
          this.route.navigate(['inicio']);
          this.searchItem.emit(this.pedido);
          // window.location.reload(true);
   
        }else{
          this.pedido = this.pedidoService.borrarArtStorage(producto);
          this.searchItem.emit(this.pedido);
          // window.location.reload(true);
        }

        Swal.fire({
          icon: 'success',
          title: 'Eliminado del Carrito',
          showConfirmButton: false,
          timer: 1500
        })
      }
      }
    )
  }

  tocarBoton(){

    if (this.pedido.precio_transp === null) {
      
    } else {
      
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: `¿Quieres enviar este pedido con número ${this.pedido.id_ped} por un valor de ${this.pedido.precio_final + 4.5}€?`,
        text: "Se abrirá tu app gestor de mail para enviarnos un mail con el contenido del pedido, no te olvides de poner tus datos.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, lo envío!',
        cancelButtonText: 'No, por ahora',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {

          this.pedido.fecha_entrega = '';
          this.pedido.enviadaEn = '';

          //dia_envio_mail
          var f = new Date();
          var minutos = '';
          if(String(f.getMinutes()).length < 2){
              minutos = String('0' + String(f.getMinutes()));
          }else if(f.getMinutes() === 0){
            minutos = '00';
          };

          var enviadaEn = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear() + "-" + f.getHours() + ":" + f.getMinutes() ;
          this.pedido.enviadaEn = enviadaEn;

          //dia entrega
          var dias=["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
          var dt = new Date((f.getMonth() +1)+' '+f.getDate()+', '+f.getFullYear()+' 12:00:00');
          var dia_sem_hoy = dias[dt.getUTCDay()];

          var num_dia_sumar = null;
          var dia_mierc_entrega = null;

          if(f.getDay() > 2 || (f.getDay() === 2 && f.getHours() > 13 )){
            num_dia_sumar = 10 - f.getDay();
            dia_mierc_entrega = f.getDate() + num_dia_sumar;
          }else if(f.getDay() < 2 || (f.getDay() === 2 && f.getHours() < 14 )){
            num_dia_sumar = 3 - f.getDay();
            dia_mierc_entrega = f.getDate() + num_dia_sumar;
          }

          var mes = f.getMonth();
          var anyo = f.getFullYear();

          var numero_dias_mes = new Date(anyo, mes, 0).getDate();
          var fecha_entrega;

          if(dia_mierc_entrega <= numero_dias_mes){
            fecha_entrega = dia_mierc_entrega + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
          }else if(dia_mierc_entrega > numero_dias_mes && mes !== 11){
          var numero_dias_mes = new Date(anyo, mes, 0).getDate();
          fecha_entrega = dia_mierc_entrega - numero_dias_mes + "/" + (f.getMonth() +2) + "/" + f.getFullYear();
          }else if(dia_mierc_entrega > numero_dias_mes && mes === 11){
            fecha_entrega = dia_mierc_entrega - numero_dias_mes + "/" + 1 + "/" + f.getFullYear() + 1;
          }

          this.pedido.fecha_entrega = fecha_entrega;

          localStorage.removeItem('pedido');
          this.pedidoService.guardarPedidoStorage(this.pedido);

          let precio_def = (Number(this.pedido.precio_final.toFixed(2)) + Number(this.pedido.precio_transp.toFixed(2)));

          let precio_art = this.pedido.precio_final.toFixed(2);

          let body_line = escape("\n");

          var array_email_prods:any[] = [];
          var pr:string;
          var string_email_prods:string;

          for(let p of this.pedido.articulos){
            if(p.cantidad > 49){
            pr = p.nombre + '    ' + p.cantidad + 'gr    ' + p.precio + '€    ' + p.unidades + ' uds.    ' + p.precio_final + '€  ';
            }else{
              pr = p.nombre + '    ' + p.precio + '€    ' + p.unidades + ' uds.    ' + p.precio_final + '€  ';
            }
            array_email_prods.push(pr);
          }

          string_email_prods = array_email_prods.join(',' + body_line);
          
      let mail = 'mailto:tienda@siente.es';
      // let mail = 'mailto:entradaproyectos@gmail.com';
      let asunto = `Envio pedido a Siente referencia: ${this.pedido.id_ped}`;

      let cuerpo = "Gracias por tu pedido, tealover! "+body_line+" __________________________________ "+body_line+body_line+"Este es tu número de pedido: "+body_line+this.pedido.id_ped+body_line+" __________________________________ "+body_line+" Consta de: "+body_line+" "+string_email_prods +body_line+" __________________________________ "+body_line+" Lo empezaste a crear en esta fecha: "+body_line+" "+this.pedido.creadaEn+" "+body_line+" y el envío del mail en esta fecha: "+body_line+" "+this.pedido.enviadaEn+" "+body_line+" __________________________________ "+" "+body_line+" El precio de los artículos es: "+body_line+" "+precio_art+"€ "+body_line+" Y añadiendo los " +this.pedido.precio_transp+" € de transporte, te queda en: "+body_line+" "+precio_def+"€ "+body_line+" __________________________________ "+" "+body_line+" En breve recibirás un mail con la confirmación de pedido(segun stock disponible) y con la información de cómo hacer el pago. "+body_line+" __________________________________ "+" "+body_line+body_line+body_line+body_line+" No te olvides de poner los datos: "+body_line+" DNI, "+body_line+" Nombre y Apellidos, "+body_line+" Dirección, "+body_line+" Código Postal, "+body_line+" y Localidad "+body_line;

      this.emailstring = mail+"?subject="+asunto+"&body="+cuerpo;

            this.mailto = true;
            // this.enviarPedido();
            setTimeout(()=>{

                var event = new MouseEvent('click', {
                  'view': window,
                  'bubbles': true,
                  'cancelable': true
                });
                var cb = document.getElementsByClassName('btn-enviar')[1]; 
                var canceled = !cb.dispatchEvent(event);
                if (canceled) {

                } else {
  
                  setTimeout(()=>{
                    this.pedidoService.enviarPedido();

                    window.location.reload(true);
                  },1000);
                }

            },1000);

          swalWithBootstrapButtons.fire(
            'Ahora tienes que enviar el mail que se te va a abrir',
            'Te contestaremos lo antes posible',
            'success'
          )
        } else if (
          
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
          ) {

          swalWithBootstrapButtons.fire(
            'Cancelado el envío',
            'Te esperamos :)',
            'error'
          )
        }
      })
    }

  }

  seguirComprando(){
    this.route.navigate(['/inicio']);
  }

  cantidad50(item:Producto, index:number){
    this.pedido.articulos[index].cantidad = 50;

    if (this.pedido.articulos[index].precio_gramo_oferta) {
      this.pedido.articulos[index].precio = this.pedido.articulos[index].precio_gramo_oferta*50;
      
    } else {
      this.pedido.articulos[index].precio = this.pedido.articulos[index].precio_gramo*50;
      
    }

    this.pedido.articulos[index].precio_final = this.pedido.articulos[index].precio*this.pedido.articulos[index].unidades;




    var suma = 0;
    for(let prodi of this.pedido.articulos){
      suma += prodi.precio_final;
    }
    this.pedido.precio_final = suma;

    this.pedidoService.guardarPedidoStorage(this.pedido);
        this.searchItem.emit(this.pedido);

  }

  cantidad100(item:Producto, index:number){
    this.pedido.articulos[index].cantidad = 100;

    if (this.pedido.articulos[index].precio_gramo_oferta) {
      this.pedido.articulos[index].precio = this.pedido.articulos[index].precio_gramo_oferta*100;
      
    } else {
      this.pedido.articulos[index].precio = this.pedido.articulos[index].precio_gramo*100;
      
    }


    this.pedido.articulos[index].precio_final = this.pedido.articulos[index].precio*this.pedido.articulos[index].unidades;
    var suma = 0;
    for(let prodi of this.pedido.articulos){
      suma += prodi.precio_final;
    }
    this.pedido.precio_final = suma;

    this.pedidoService.guardarPedidoStorage(this.pedido);
        this.searchItem.emit(this.pedido);

  }

  cantidad250(item:Producto, index:number){
    this.pedido.articulos[index].cantidad = 250;


    
    if (this.pedido.articulos[index].precio_gramo_oferta) {
      this.pedido.articulos[index].precio = this.pedido.articulos[index].precio_gramo_oferta*250;
      
    } else {
      this.pedido.articulos[index].precio = this.pedido.articulos[index].precio_gramo*250;
      
    }



    this.pedido.articulos[index].precio_final = this.pedido.articulos[index].precio*this.pedido.articulos[index].unidades;
    var suma = 0;
    for(let prodi of this.pedido.articulos){
      suma += prodi.precio_final;
    }
    this.pedido.precio_final = suma;

    this.pedidoService.guardarPedidoStorage(this.pedido);
        this.searchItem.emit(this.pedido);

  }

  sumarUd(item:Producto,index:number){
    ++this.pedido.articulos[index].unidades;

    if (this.pedido.articulos[index].precio_gramo_oferta) {
      this.pedido.articulos[index].precio_final = this.pedido.articulos[index].cantidad * this.pedido.articulos[index].precio_gramo_oferta * this.pedido.articulos[index].unidades;
      
      
    } else {
      this.pedido.articulos[index].precio_final = this.pedido.articulos[index].cantidad * this.pedido.articulos[index].precio_gramo * this.pedido.articulos[index].unidades;
      
      
    }


    var suma = 0;
    for(let prodi of this.pedido.articulos){
      suma += prodi.precio_final;
    }
    this.pedido.precio_final = suma;

    this.pedidoService.guardarPedidoStorage(this.pedido);
        this.searchItem.emit(this.pedido);

  }

  restarUd(item:Producto,index:number){

    if(this.pedido.articulos[index].unidades === 1){
      return;
    }

    --this.pedido.articulos[index].unidades;

    if (this.pedido.articulos[index].precio_gramo_oferta) {
      this.pedido.articulos[index].precio_final = this.pedido.articulos[index].cantidad * this.pedido.articulos[index].precio_gramo_oferta * this.pedido.articulos[index].unidades;

      this.pedido.precio_final = this.pedido.precio_final - (this.pedido.articulos[index].cantidad * this.pedido.articulos[index].precio_gramo);
      
      
    } else {
      
      this.pedido.articulos[index].precio_final = this.pedido.articulos[index].cantidad * this.pedido.articulos[index].precio_gramo * this.pedido.articulos[index].unidades;
  
      this.pedido.precio_final = this.pedido.precio_final - (this.pedido.articulos[index].cantidad * this.pedido.articulos[index].precio_gramo);
      
      
    }

    this.pedidoService.guardarPedidoStorage(this.pedido);
    this.searchItem.emit(this.pedido);

  }

  mostrarInstrucciones(){
    this.instrucciones = true;
  }
  ocultarInstrucciones(){
    this.instrucciones = false;
  }

  seleccionarTransp(event){
    console.log(event.target.value);
    this.precio_transp = Number(event.target.value);
    this.pedido.precio_transp = Number(event.target.value);
    console.log(this.precio_transp);

    this.pedidoService.guardarPedidoStorage(this.pedido);
    this.searchItem.emit(this.pedido);
  }

}
