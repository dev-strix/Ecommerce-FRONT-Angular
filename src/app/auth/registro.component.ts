import { Component, OnInit } from '@angular/core';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  nuevoUsuario: NuevoUsuario | undefined;
  nombre?: string;
  nombreUsuario?: string;
  email?: string;
  password?: string;
  errMsj?: string;
  isLogged = false;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService 
  ) { }
  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }
  onRegister(): void {
    if (!this.nombre || !this.nombreUsuario || !this.email || !this.password) {
      this.toastr.error('Todos los campos son obligatorios', 'Fail', {
        timeOut: 3000,  positionClass: 'toast-top-center',
      });
      return;
    }
    this.nuevoUsuario = new NuevoUsuario(
      this.nombre,
      this.nombreUsuario, 
      this.email, 
      this.password,
    );
    this.authService.nuevo(this.nuevoUsuario).subscribe({
      next:data => {
        this.toastr.success('Cuenta Creada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-left'
        });

        this.router.navigate(['/login']);
      },
      error:err => {
        this.errMsj = err.error.mensaje;
        this.toastr.error(this.errMsj, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        // console.log(err.error.message);
      }
    });
  }
}
