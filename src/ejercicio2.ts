interface Envio {
  calcularCosto(base: number): number;
}
class ConfiguracionEmpresa {
  readonly recargoExpress = 2500;
  private static instancia: ConfiguracionEmpresa | undefined;
  //
  static obtenerInstancia(): ConfiguracionEmpresa {
    if (!ConfiguracionEmpresa.instancia) {
      ConfiguracionEmpresa.instancia = new ConfiguracionEmpresa();
    }
    return ConfiguracionEmpresa.instancia;
  }
  //
  private constructor() {}
  //
}
//
class EnvioEstandar implements Envio {
  calcularCosto(base: number): number {
    return base;
  }
}
//
class EnvioExpress implements Envio {
  calcularCosto(base: number): number {
    return base + ConfiguracionEmpresa.obtenerInstancia().recargoExpress;
  }
}

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
//
console.log(
  "Mismo Singleton: ",
  ConfiguracionEmpresa.obtenerInstancia() ===
    ConfiguracionEmpresa.obtenerInstancia(),
);
//
console.log("Estándar: $", FabricaEnvios.crear("estandar").calcularCosto(3000));
console.log("Express: $", FabricaEnvios.crear("express").calcularCosto(3000));