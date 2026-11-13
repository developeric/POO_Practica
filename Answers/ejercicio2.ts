// Ejercicio 2 — Envíos de una empresa de paquetería (RESUELTO)
// Compará con tu src/ejercicio2.ts recién después de intentarlo.

// Singleton: constructor privado + una única instancia accesible por obtenerInstancia().
class ConfiguracionEmpresa {
  private static instancia: ConfiguracionEmpresa | undefined;
  readonly recargoExpress = 2500;

  private constructor() {}

  static obtenerInstancia(): ConfiguracionEmpresa {
    if (!ConfiguracionEmpresa.instancia) {
      ConfiguracionEmpresa.instancia = new ConfiguracionEmpresa();
    }
    return ConfiguracionEmpresa.instancia;
  }
}

interface Envio {
  calcularCosto(base: number): number;
}

class EnvioEstandar implements Envio {
  calcularCosto(base: number): number {
    return base;
  }
}

class EnvioExpress implements Envio {
  calcularCosto(base: number): number {
    // El recargo se lee del Singleton, no se repite el número acá.
    return base + ConfiguracionEmpresa.obtenerInstancia().recargoExpress;
  }
}

// Factory: es el único lugar donde se hace `new EnvioEstandar` / `new EnvioExpress`.
class FabricaEnvios {
  static crear(tipo: "estandar" | "express"): Envio {
    switch (tipo) {
      case "estandar":
        return new EnvioEstandar();
      case "express":
        return new EnvioExpress();
    }
  }
}

// Prueba
console.log("Mismo Singleton:", ConfiguracionEmpresa.obtenerInstancia() === ConfiguracionEmpresa.obtenerInstancia());
console.log(`Estándar: $${FabricaEnvios.crear("estandar").calcularCosto(3000)}`);
console.log(`Express: $${FabricaEnvios.crear("express").calcularCosto(3000)}`);
