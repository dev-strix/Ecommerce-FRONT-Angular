export class LoginUsuario {
    nombreUsuario?: string;
    password?: string;

    constructor(nombreusuario: string, password: string) {
        this.nombreUsuario = nombreusuario;
        this.password = password;
    }
}
