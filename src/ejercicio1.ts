abstract class Habitacion {
  readonly numero: number;
  constructor(numero: number) {
    this.numero = numero;
  }
  abstract calcularPrecio(noches: number): number;
}

class Simple extends Habitacion {
  precio: number = 20000;
  calcularPrecio(noches: number): number {
    return noches * this.precio;
  }
}
class Suite extends Habitacion {
  precio: number = 50000;
  calcularPrecio(noches: number): number {
    return noches * this.precio;
  }
}
class Hotel {
  private habitaciones: Habitacion[] = [];
  //
  chekIn(habitacion: Habitacion): void {
    this.habitaciones.push(habitacion);
    Hotel.total++;
  }
  //
  static total: number = 0;
  //
  get cantidad(): number {
    return this.habitaciones.length;
  }
  //
  mostrarPrecios(noches: number): void {
    for (const habitacion of this.habitaciones) {
      console.log(
        `Habitación ${habitacion.numero} paga: $${habitacion.calcularPrecio(noches)}`,
      );
    }
  }
}

const hotel = new Hotel();
hotel.chekIn(new Simple(101));
hotel.chekIn(new Suite(303));
hotel.mostrarPrecios(2);
console.log("Habitaciones ocupadas: ", hotel.cantidad);
console.log("Total histrórico de check-ins: ", Hotel.total);

