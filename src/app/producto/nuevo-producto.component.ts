import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Producto } from '../models/producto';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit{

  nombre = '';
  //precio: number = null;
  precio: number = 0;

  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService,
    private router: Router
  ) { } 
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  onCreate(): void {
    const producto = new Producto(this.nombre, this.precio);
    this.productoService.save(producto).subscribe({
      next:data => {
        this.toastr.success('Producto Creado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/lista']);
      },
      error:err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        // this.router.navigate(['/']);
      },
      complete: () =>{ 
        console.info('complete');
        this.toastr.info('Producto Creado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-right'
        })
      }
    });
  }
}
