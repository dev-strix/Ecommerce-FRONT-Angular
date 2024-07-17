import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { ProductoService } from '../services/producto.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TokenService } from '../services/token.service';
@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css']
})
export class ListaProductoComponent implements OnInit {

  productos: Producto[] = [];
  roles?: string[];
  isAdmin = false;

  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService, 
    private route: Router,
    private tokenService: TokenService)
    { }

  ngOnInit(): void {
    this.cargarProductos();
    this.roles = this.tokenService.getAuthorities();
    //aqui se comprueba si es ADMIN o no, deacuerdo a eso se mostraran los botones
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }
  cargarProductos():void{
    this.productoService.lista().subscribe({
      next: (response) => {
        console.log('lista de productos de BD', response)
        //guardamos la response en el array 'listaPersonasBd'
        this.productos=response;
      },
      error: (e) =>{
        console.error(e)
      },
      complete: () => {
        console.log('Productos Cargados correctamente');
      }
    });
  }

  borrar(id: number) {
    this.productoService.delete(id).subscribe({
      next: (data) => {
        this.toastr.success('Producto Eliminado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.cargarProductos();
      },
      error: (e) =>{
        this.toastr.error(e.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    });
//***************** */
  /*if(id != undefined){
    this.productoService.delete(id).subscribe(
      response=>{
        console.log('Resp del Borrado: ', response);
        this.cargarProductos();
      }
    );      
  }else{
    console.warn('No se ha seleccionado ningun producto.');
  }*/
  }
}
