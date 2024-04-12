//constante para saber cuantos autos ya pasoron el semaforo
let autosPasaron = 0;
let autosEspera = 0;

class Semaforo {
  constructor() {
    this.color = "rojo";
  }

  cambiarColor() {
    if (this.color === "rojo") {
      this.color = "verde";
    } else {
      this.color = "rojo";
    }
  }
}

class Auto {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.velocidad = Math.random() * 2 + 1; // Velocidad aleatoria entre 1 y 3; // Unidad de distancia por segundo
    this.estado = "detenido";
    this.contado = false;
    this.tiempoEspera = 0;
  }

  avanzar(otrosAutos) {
    if (
      otrosAutos.some(
        (auto) =>
          auto.x > this.x &&
          auto.x - this.x < Math.floor(Math.random() * 51) + 75
      )
    ) {
      // Si hay autos delante, detenerse
      this.estado = "detenido";
    } else {
      // Si no hay autos delante, avanzar
      this.estado = "avanzando";
      this.velocidad = Math.random() * 2 + 1; // Velocidad aleatoria entre 1 y 3
      this.x += this.velocidad;
    }
    if (this.x >= 400 && this.estado !== "paso") {
      this.estado = "paso";
    }
  }

  detener() {
    this.estado = "detenido";
    this.tiempoEspera += 1 / 60; // Aumentar el tiempo de espera en 1/60 segundos
  }
}

class Calle {
  constructor() {
    this.semaforo = new Semaforo();
    this.autos = [];
    this.autoGenerado = false; // Indica si ya se generó un auto en esta iteración
  }

  generarAuto() {
    if (!this.autoGenerado) {
      const y = 200; // Altura fija del carril
      const x = -50; // Posición inicial del auto fuera del lienzo
      const auto = new Auto(1, x, y);
      this.autos.push(auto);
      this.autoGenerado = true;

      // Retraso aleatorio antes de generar el siguiente auto
      setTimeout(() => {
        this.autoGenerado = false;
      }, Math.random() * 3000 + 2000); // Retraso entre 2 y 5 segundos
    }
  }

  simular() {
    setInterval(() => {
      if (!this.autoGenerado) {
        const randomTime = Math.floor(Math.random() * 5000) + 1000; // Generar un tiempo aleatorio entre 1 y 5 segundos
        setTimeout(() => {
          this.generarAuto();
          this.autoGenerado = false;
        }, randomTime);
      }
    }, 2000); // Verificar si se debe generar un auto cada 2 segundos

    setInterval(() => {
      this.semaforo.cambiarColor();
    }, 10000); // Cambiar el semáforo cada 10 segundos

    setInterval(() => {
      document.getElementById("tblEstadisticas").innerText = "";
      if (this.semaforo.color === "verde") {
        this.autos.forEach((auto) => {
          auto.avanzar(this.autos.filter((a) => a !== auto)); // Pasar todos los autos menos el actual
        });
        autosEspera = 0;
      } else {
        this.autos.forEach((auto) => {
          if (auto.x < 320) {
            // Si el auto está antes del semáforo
            auto.avanzar(this.autos.filter((a) => a !== auto)); // Pasar todos los autos menos el actual
            autosEspera = this.autos.length - autosPasaron;
          } else if (auto.x >= 400) {
            auto.avanzar(this.autos.filter((a) => a !== auto)); // Pasar todos los autos menos el actual
            //autosPasaron++;
            if (auto.estado === "paso" && !auto.contado) {
              autosPasaron++;
              auto.contado = true;
            }
          } else {
            auto.detener();
          }
        });
      }
      document.getElementById("tblEstadisticas").innerHTML +=
        "<p>Cantidad de autos que circularon: " + this.autos.length + "</p>";
      //añadir a la tabla el numero de autos que pasaron con un elemento p
      document.getElementById("tblEstadisticas").innerHTML +=
        "<p>Autos que pasaron: " + autosPasaron + "</p>";
      //autos detenidos en semaforo
      document.getElementById("tblEstadisticas").innerHTML +=
        "<p>Autos en espera: " + autosEspera + "</p>";
      const tiempoEsperaTotal = this.autos
        .reduce((total, auto) => total + auto.tiempoEspera, 0)
        .toFixed(2);

      let tiempoEsperaTotalFormatted = tiempoEsperaTotal;
      if (tiempoEsperaTotal >= 60) {
        const minutos = Math.floor(tiempoEsperaTotal / 60);
        const segundos = tiempoEsperaTotal % 60;
        tiempoEsperaTotalFormatted = `${minutos} minutos ${segundos.toFixed(
          2
        )} segundos`;
      } else {
        tiempoEsperaTotalFormatted = `${tiempoEsperaTotal} segundos`;
      }
      document.getElementById("tblEstadisticas").innerHTML +=
        "<p>Tiempo de espera total: " + tiempoEsperaTotalFormatted + "</p>";
      const tiempoEsperaPromedio = (
        this.autos.reduce((total, auto) => total + auto.tiempoEspera, 0) /
        this.autos.length
      ).toFixed(2);
      document.getElementById("tblEstadisticas").innerHTML +=
        "<p>Tiempo de espera promedio: " +
        tiempoEsperaPromedio +
        " segundos</p>";
    }, 1000 / 60); // Actualizar la posición de los autos cada 60 veces por segundo
  }
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const calle = new Calle();
calle.simular();

function draw() {
  // Dibujar la calle
  ctx.fillStyle = "gray";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Dibujar el semáforo
  ctx.fillStyle = "black";
  ctx.fillRect(400, 0, 50, 100);
  if (calle.semaforo.color === "verde") {
    ctx.fillStyle = "green";
  } else {
    ctx.fillStyle = "red";
  }
  ctx.beginPath();
  ctx.arc(425, 50, 20, 0, Math.PI * 2);
  ctx.fill();

  // Dibujar los autos
  calle.autos.forEach((auto) => {
    ctx.fillStyle = "blue";
    ctx.fillRect(auto.x, auto.y, 50, 30);
  });
}

setInterval(draw, 1000 / 60); // Redibujar la escena cada 60 veces por segundo
