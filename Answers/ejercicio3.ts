// Ejercicio 3 — Refactorizar un servicio de notificaciones (RESUELTO)
// Compará con tu src/ejercicio3.ts recién después de intentarlo.

// OCP: un canal nuevo se agrega con una clase nueva, sin tocar ServicioNotificaciones.
interface Canal {
  readonly nombre: string;
  calcularCosto(): number;
}

// DIP: ServicioNotificaciones depende de esta abstracción y no de un registro concreto.
interface Registro {
  escribir(linea: string): void;
}

class Email implements Canal {
  readonly nombre = "Email";

  calcularCosto(): number {
    return 0;
  }
}

class SMS implements Canal {
  readonly nombre = "SMS";

  calcularCosto(): number {
    return 15;
  }
}

class RegistroArchivo implements Registro {
  escribir(linea: string): void {
    console.log(`[LOG] ${linea}`);
  }
}

class RegistroBaseDeDatos implements Registro {
  escribir(linea: string): void {
    console.log(`[DB] ${linea}`);
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
    this.registro.escribir(`${canal.nombre}: "${mensaje}" ($${canal.calcularCosto()})`);
  }
}

// Prueba
const servicio = new ServicioNotificaciones(new RegistroArchivo());
servicio.notificar(new Email(), "Hola");
servicio.notificar(new SMS(), "Hola");

const servicioDb = new ServicioNotificaciones(new RegistroBaseDeDatos());
servicioDb.notificar(new Email(), "Prueba");
