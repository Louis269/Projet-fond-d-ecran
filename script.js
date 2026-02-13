const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

let meteorites = [];

class Meteorite {
    constructor() {
        this.reset();
    }

    reset() {
        const angle = Math.random() * 2 * Math.PI;
        const radius = Math.max(canvas.width, canvas.height);
        this.x = centerX + Math.cos(angle) * radius;
        this.y = centerY + Math.sin(angle) * radius;
        this.z = Math.random() * 20 + 1; // profondeur
        this.size = Math.random() * 2 + 1;
        this.speed = Math.random() * 10 + 5;
    }

    update() {
        const dx = centerX - this.x;
        const dy = centerY - this.y;
        this.x += dx / this.z;
        this.y += dy / this.z;

        // effet 3D : taille augmente en se rapprochant
        this.size = Math.min(12, this.size + 0.05);

        // réinitialiser si proche du centre
        if (Math.abs(this.x - centerX) < 10 && Math.abs(this.y - centerY) < 10) {
            this.reset();
        }
    }

    draw() {
        ctx.fillStyle = "#00f0ff";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // trail lumineux
        ctx.strokeStyle = "rgba(0, 240, 255, 0.3)";
        ctx.beginPath();
        ctx.moveTo(this.x - this.size*2, this.y - this.size*2);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
    }
}

function init() {
    for (let i = 0; i < 300; i++) {
        meteorites.push(new Meteorite());
    }
}

function drawBackground() {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#0f0c29");
    gradient.addColorStop(0.5, "#302b63");
    gradient.addColorStop(1, "#24243e");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawText() {
    ctx.font = "bold 80px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "#00f0ff";
    ctx.shadowColor = "#00f0ff";
    ctx.shadowBlur = 20;
    ctx.fillText("GAMING MODE", centerX, centerY);
}

function animate() {
    // fond semi-transparent pour trail
    ctx.fillStyle = "rgba(0, 0, 20, 0.3)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    meteorites.forEach(m => {
        m.update();
        m.draw();
    });

    drawText();

    requestAnimationFrame(animate);
}

// Télécharger l'image
function downloadWallpaper() {
    const link = document.createElement("a");
    link.download = "gaming-wallpaper-3D.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}

init();
animate();

document.getElementById("downloadBtn").addEventListener("click", downloadWallpaper);
