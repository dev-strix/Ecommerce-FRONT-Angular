import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{

  isLogged = false;
  nombreUsuario = '';

  constructor(private tokenService: TokenService) { }
  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.nombreUsuario = this.tokenService.getUserName()+'';
      //const userName = this.tokenService.getUserName();
      /*if (userName !== null) {
        this.nombreUsuario = userName;
      }*/
    } else {
      this.isLogged = false;
      this.nombreUsuario = '';
    }
  }

}
