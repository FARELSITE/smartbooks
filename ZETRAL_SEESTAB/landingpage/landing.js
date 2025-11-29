const canvas = document.getElementById('blockchain-canvas');
const ctx = canvas.getContext('2d');

let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
});

const particles = [];
const numParticles = window.innerWidth < 768 ? 80 : 120;

class Particle {
  constructor() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.radius = Math.random() * 3 + 1;
    this.opacity = Math.random() * 0.6 + 0.2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > w) this.vx *= -1;
    if (this.y < 0 || this.y > h) this.vy *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 215, 0, ${this.opacity})`;
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#ffd700';
    ctx.fill();
  }
}

for (let i = 0; i < numParticles; i++) {
  particles.push(new Particle());
}

function connect() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 180) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 215, 0, ${0.15 * (1 - distance / 180)})`;
        ctx.lineWidth = 1;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, w, h);

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  connect();
  requestAnimationFrame(animate);
}

animate();