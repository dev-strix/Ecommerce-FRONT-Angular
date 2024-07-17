import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router); //para redirigir a la ruta que se pide

  const expectedRoles: string[] =route.data['expectedRoles'];
  const jsonData = sessionStorage.getItem('AuthAuthorities');

  if (!jsonData) {
    alert('No hay Roles ni Autorizaciones, JSON vacio');
    router.navigate(['/login']);
    return false;
  }
  try {
    const authorities = JSON.parse(jsonData);

    // Verificar si el usuario tiene al menos uno de los roles esperados
    const userHasExpectedRole = authorities.some((auth: { authority: string }) => 
      expectedRoles.includes(auth.authority.replace('ROLE_', '').toLowerCase())
    );

    if (userHasExpectedRole) {
      return true;
    } else {
      alert('No tienes los roles necesarios para acceder a esta ruta');
      //router.navigate(['/login']); // Redirigir a la página de inicio de sesión o una página de acceso denegado
      return false;
    }
  } catch (error) {
    alert('Error al intentar parsear el JSON desde sessionStorage');
    router.navigate(['/login']); // Redirigir a la página de inicio de sesión o una página de acceso denegado
    return false;
  }
};
/*
ROLE_SUPER_ADMIN
ROLE_SUPPORT
ROLE_VIEWER
ROLE_CONTRIBUTOR
ROLE_MANAGER
ROLE_OPERATIONS
ROLE_FINANCE
*/