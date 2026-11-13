// Ejercicio 1 — Hotel (RESUELTO)
// Compará con tu src/ejercicio1.ts recién después de intentarlo.

// Clase abstracta: `numero` es readonly y se recibe en el constructor.
abstract class Habitacion {
  readonly numero: number;

  constructor(numero: number) {
    this.numero = numero;
  }

  // Cada subclase decide cuánto cuesta (polimorfismo).
  abstract calcularPrecio(noches: number): number;
}

class Simple extends Habitacion {
  calcularPrecio(noches: number): number {
    return noches * 20000;
  }
}

class Suite extends Habitacion {
  calcularPrecio(noches: number): number {
    return noches * 50000;
  }
}

class Hotel {
  // Arreglo privado: solo se modifica desde la propia clase.
  private habitaciones: Habitacion[] = [];

  // Atributo static: cuenta TODOS los ingresos, de cualquier hotel.
  static totalCheckIns: number = 0;

  checkIn(habitacion: Habitacion): void {
    this.habitaciones.push(habitacion);
    Hotel.totalCheckIns++;
  }

  // Getter: se usa sin paréntesis -> hotel.cantidad
  get cantidad(): number {
    return this.habitaciones.length;
  }

  // Sin `if` por tipo: cada objeto sabe calcular su precio.
  mostrarPrecios(noches: number): void {
    for (const habitacion of this.habitaciones) {
      console.log(`Habitación ${habitacion.numero} paga $${habitacion.calcularPrecio(noches)}`);
    }
  }
}

// Prueba
const hotel = new Hotel();
hotel.checkIn(new Simple(101));
hotel.checkIn(new Suite(303));
hotel.mostrarPrecios(2);
console.log(`Habitaciones ocupadas: ${hotel.cantidad}`);
console.log(`Total histórico de check-ins: ${Hotel.totalCheckIns}`);
