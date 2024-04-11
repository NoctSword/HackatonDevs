class Semaforo {
    constructor() {
      this.color = 'rojo';
    }
  
    cambiarColor() {
      if (this.color === 'rojo') {
        this.color = 'verde';
      } else {
        this.color = 'rojo';
      }
    }
  }
  
  class Auto {
    constructor(id, x, y) {
      this.id = id;
      this.x = x;
      this.y = y;
      this.velocidad = 2; // Unidad de distancia por segundo
      this.estado = 'detenido';
    }
  
    avanzar() {
      this.estado = 'avanzando';
      this.x += this.velocidad;
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
      }
    }
  
    simular() {
      setInterval(() => {
        this.generarAuto();
        this.autoGenerado = false;
      }, 5000); // Generar auto cada 5 segundos
  
      setInterval(() => {
        this.semaforo.cambiarColor();
      }, 10000); // Cambiar el semáforo cada 10 segundos
  
      setInterval(() => {
        if (this.semaforo.color === 'verde') {
          this.autos.forEach(auto => {
            auto.avanzar();
          });
        } else {
          this.autos.forEach(auto => {
            if (auto.x < 700) { // Si el auto está antes del semáforo
              auto.avanzar();
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
    ctx.fillRect(700, 0, 50, 400);
    if (calle.semaforo.color === 'verde') {
      ctx.fillStyle = 'green';
    } else {
      ctx.fillStyle = 'red';
    }
    ctx.beginPath();
    ctx.arc(725, 50, 20, 0, Math.PI * 2);
    ctx.fill();
  
    // Dibujar los autos
    calle.autos.forEach(auto => {
      ctx.fillStyle = 'blue';
      ctx.fillRect(auto.x, auto.y, 50, 30);
    });
  }
  
  setInterval(draw, 1000 / 60); // Redibujar la escena cada 60 veces por segundo
  