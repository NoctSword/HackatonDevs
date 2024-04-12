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
    constructor(id, y) {
      this.id = id;
      this.x = -50; // Posición inicial del auto fuera del lienzo
      this.y = y; // Altura variable de la calle
      this.velocidad = 2; // Unidad de distancia por segundo
      this.estado = 'detenido';
    }
  
    avanzar() {
      this.estado = 'avanzando';
      this.x += this.velocidad;
      if (this.x > 850) {
        this.x = -50; // Reiniciar posición al llegar al final de la calle
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
    }
  
    generarAuto() {
      const y = Math.random() * 300 + 50; // Generar altura aleatoria entre 50 y 350
      const auto = new Auto(this.autos.length + 1, y);
      this.autos.push(auto);
    }
  
    simular() {
      setInterval(() => {
        this.generarAuto();
      }, 5000); // Generar auto cada 5 segundos
  
      setInterval(() => {
        this.semaforo.cambiarColor();
      }, 10000); // Cambiar el semáforo cada 10 segundos
  
      setInterval(() => {
        if (this.semaforo.color === 'verde') {
          this.autos.forEach(auto => {
            auto.avanzar();
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
    ctx.fillRect(700, 50, 50, 150);
    if (calle.semaforo.color === 'verde') {
      ctx.fillStyle = 'green';
    } else {
      ctx.fillStyle = 'red';
    }
    ctx.beginPath();
    ctx.arc(725, 125, 20, 0, Math.PI * 2);
    ctx.fill();
  
    // Dibujar los autos
    calle.autos.forEach(auto => {
      ctx.fillStyle = 'blue';
      ctx.fillRect(auto.x, auto.y, 50, 30);
    });
  }
  
  setInterval(draw, 1000 / 60); // Redibujar la escena cada 60 veces por segundo