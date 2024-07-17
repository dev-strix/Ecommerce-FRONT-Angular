import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProductoComponent } from './producto/lista-producto.component';
import { DetalleProductoComponent } from './producto/detalle-producto.component';
import { NuevoProductoComponent } from './producto/nuevo-producto.component';
import { EditarProductoComponent } from './producto/editar-producto.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './auth/login.component';
import { RegistroComponent } from './auth/registro.component';
import { authGuard } from './guards/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: '', component:IndexComponent},
  {path: 'login', component:LoginComponent},
  {path:'registro', component:RegistroComponent},
  {path: 'lista', component: ListaProductoComponent, canActivate: [authGuard],data:{expectedRoles:['admin','user']}},
  {path: 'detalle/:id', component: DetalleProductoComponent,canActivate: [authGuard],data:{expectedRoles:['admin','user']}},
  {path: 'nuevo', component: NuevoProductoComponent, canActivate: [authGuard],data:{expectedRoles:['admin']}},
  {path: 'editar/:id', component: EditarProductoComponent, canActivate: [authGuard],data:{expectedRoles:['admin']}},
  {path: '**', component: NotFoundComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
