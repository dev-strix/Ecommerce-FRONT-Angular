import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoginUsuario } from '../models/login-usuario';
import { JwtDTO } from '../models/jwt-dto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  isLogged = false;
  isLoginFail = false;
  loginUsuario?: LoginUsuario;
  nombreUsuario?: string;
  password?: string;
  roles?: string[] = [];
  errMsj?: string;
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    //codigo opcional, solo para notificaciones tipo toastr
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario+'', this.password+'');
    this.authService.login(this.loginUsuario)
    //observable.subscribe({}); es una instancia de Observable que produce una secuencia de valores
   .subscribe({
    next: (response: JwtDTO) => {
      this.isLogged = true;
      this.isLoginFail = false;
      this.tokenService.setToken(response.token+'');
      this.tokenService.setUserName(response.nombreUsuario+'');
      // Asegurarse de que response.authorities es un string[]
      if (Array.isArray(response.authorities)) {
        //alert(response.authorities)
        this.tokenService.setAuthorities(response.authorities);
      } else {
        console.error('Expected response.authorities to be an array of strings');
      }
      this.roles = response.authorities;
      //this.tokenService.setAuthorities(response.authorities); Esto es codigo viejo
      //this.roles = response.authorities;
      //Codigo para notificaciones tipo toastr
      this.toastr.success('Bienvenido ' + this.loginUsuario?.nombreUsuario, 'OK', {
        timeOut: 3000, positionClass: 'toast-top-center'
      })
      this.router.navigate(['/']);
    },
    error: (err) => {
      this.isLogged = false;
      this.isLoginFail = true;
      this.errMsj = err.error.message;
      //Codigo para notificaciones tipo toastr
      this.toastr.error(this.errMsj, 'Fail', {
        timeOut: 5000,  
        progressBar: true,
        progressAnimation: 'increasing',
        //closeButton: true,
        positionClass: 'toast-top-center',
      })
    },
    complete: () =>{
      console.log('Login request completed')
    }
   });
  }
}
