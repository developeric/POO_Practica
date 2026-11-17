//INTERFACES
interface Canal {
  readonly nombre: string;
  calcularCosto(): number;
}
//
interface Registro {
  //SMS || EMAIL
  escribir(linea: string): void;
}
//CLASES IMPLEMENTA CANAL
class Email implements Canal {
  readonly nombre: string = "EMAIL";
  calcularCosto(): number {
    return 0;
  }
}
//
class SMS implements Canal {
  readonly nombre: string = "SMS";
  calcularCosto(): number {
    return 15;
  }
}
//CLASES IMPLEMENTA REGISTRO
class RegistroArchivo implements Registro {
  escribir(linea: string): void {
    console.log("[LOG]", linea);
  }
}
//
class RegistroBaseDeDatos implements Registro {
  escribir(linea: string): void {
    console.log("[DB]", linea);
  }
}

class ServicioNotificaciones {
  private registro: Registro;

  // Se recibe por constructor (inyección), sin parameter properties.
  constructor(registro: Registro) {
    this.registro = registro;
  }

  // Sin ningún `if`: el costo y el nombre salen del propio canal.
  notificar(canal: Canal, mensaje: string): void {
    this.registro.escribir(
      `${canal.nombre}: "${mensaje}" ($${canal.calcularCosto()})`,
    );
  }
}
const servicio = new ServicioNotificaciones(new RegistroArchivo());
servicio.notificar(new Email(), "Hola");
servicio.notificar(new SMS(), "Hola");
const database = new ServicioNotificaciones(new RegistroBaseDeDatos());
database.notificar(new Email(), "Prueba")