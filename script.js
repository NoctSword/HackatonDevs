class Semaforo {
  constructor() {
    this.color = "rojo";
  }
<<<<<<< Updated upstream
  
  class Auto {
    constructor(id, x, y) {
      this.id = id;
      this.x = x;
      this.y = y;
      this.velocidad = 2; // Unidad de distancia por segundo
      this.estado = 'detenido';
    }
  
    avanzar(otrosAutos) {
      if (otrosAutos.some(auto => auto.x > this.x && auto.x - this.x < Math.floor(Math.random() * 51) + 76)) {
        // Si hay autos delante, detenerse
        this.estado = 'detenido';
      } else {
        // Si no hay autos delante, avanzar
        this.estado = 'avanzando';
        this.velocidad = Math.random() * 2 + 1; // Velocidad aleatoria entre 1 y 3
        this.x += this.velocidad;
      }
    }
  
    detener() {
      this.estado = 'detenido';
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
        if (this.semaforo.color === 'verde') {
          this.autos.forEach(auto => {
            auto.avanzar(this.autos.filter(a => a !== auto)); // Pasar todos los autos menos el actual
          });
        } else {
          this.autos.forEach(auto => {
            if (auto.x < 320) { // Si el auto está antes del semáforo
              auto.avanzar(this.autos.filter(a => a !== auto)); // Pasar todos los autos menos el actual
            } else if (auto.x >= 400) {
              auto.avanzar(this.autos.filter(a => a !== auto)); // Pasar todos los autos menos el actual
            } else {
              auto.detener();
            }
          });
        }
      }, 1000 / 60); // Actualizar la posición de los autos cada 60 veces por segundo
    }
  }
  
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  
  const calle = new Calle();
  calle.simular();
  
  function draw() {
    // Dibujar la calle
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    // Dibujar el semáforo
    ctx.fillStyle = 'black';
    ctx.fillRect(400, 0, 50, 200);
    if (calle.semaforo.color === 'verde') {
      ctx.fillStyle = 'green';
=======

  cambiarColor() {
    if (this.color === "rojo") {
      this.color = "verde";
>>>>>>> Stashed changes
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
    this.velocidad = 2; // Unidad de distancia por segundo
    this.estado = "detenido";
  }

  avanzar(otrosAutos) {
    if (otrosAutos.some((auto) => auto.x > this.x && auto.x - this.x < 75)) {
      // Si hay autos delante, detenerse
      this.estado = "detenido";
    } else {
      // Si no hay autos delante, avanzar
      this.estado = "avanzando";
      this.velocidad = Math.random() * 2 + 1; // Velocidad aleatoria entre 1 y 3
      this.x += this.velocidad;
    }
    // Verificar si el auto ha pasado el semáforo
    if (this.x > 300) {
      // Asumiendo que el semáforo está en x = 300
      // Encontrar el índice de este auto en el arreglo de autos
      const index = otrosAutos.findIndex((auto) => auto === this);

      // Si el auto se encuentra en el arreglo, eliminarlo
      if (index !== -1) {
        otrosAutos.splice(index, 1);
      }
    }
  }

  detener() {
    this.estado = "detenido";
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
      if (this.semaforo.color === "verde") {
        this.autos.forEach((auto) => {
          auto.avanzar(this.autos.filter((a) => a !== auto)); // Pasar todos los autos menos el actual
        });
        
      } else {
        this.autos.forEach((auto) => {
          if (auto.x < 320) {
            // Si el auto está antes del semáforo
            auto.avanzar(this.autos.filter((a) => a !== auto)); // Pasar todos los autos menos el actual
          } else if (auto.x >= 400) {
            auto.avanzar(this.autos.filter((a) => a !== auto)); // Pasar todos los autos menos el actual
          } else {
            auto.detener();
          }
        });
      }
    }, 1000 / 60); // Actualizar la posición de los autos cada 60 veces por segundo
  }
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const calle = new Calle();
calle.simular();

function draw() {
  // console.log(calle.autos);
  // Dibujar la calle
  ctx.fillStyle = "gray";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Dibujar el semáforo
  ctx.fillStyle = "black";
  ctx.fillRect(400, 0, 50, 200);
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
