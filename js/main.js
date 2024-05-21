const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const canvasMulti = document.getElementById("canvasMulti");
let ctxMulti = canvasMulti.getContext("2d");

const window_height = 300;
const window_width = 500;

canvasMulti.height = canvas.height = window_height;
canvasMulti.width = canvas.width = window_width;



canvas.style.backgroundColor = canvasMulti.style.backgroundColor = "#b7f7ed";

class Circle {
    constructor(x, y, radius, color, text, backcolor, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.backcolor = backcolor;
        this.speed = speed;
        this.dx = 1 * this.speed;
        this.dy = 1 * this.speed;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.backcolor;
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = this.color;
        context.stroke();
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "bold 20px cursive";
        context.fillStyle = "white";
        context.fillText(this.text, this.posX, this.posY);
        context.closePath();
    }

    update(context, row) {
        this.draw(context);
        if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.posX += this.dx;
        this.posY += this.dy;

        const posXInt = Math.floor(this.posX);
        const posYInt = Math.floor(this.posY);
        document.querySelector('.x').textContent = posXInt;
        document.querySelector('.y').textContent = posYInt;
        row.querySelector('.x').textContent = Math.floor(this.posX);
        row.querySelector('.y').textContent = Math.floor(this.posY);
    }
}

let randomRadius = Math.floor(Math.random() * 60 + 20);
let randomX = Math.random() * window_width;
let randomY = Math.random() * window_height;
let randomSpeed = Math.random() * 3 + 1;
let randomBackcolor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
let randomStrokecolor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;

randomX = Math.max(randomRadius, Math.min(randomX, window_width - randomRadius));
randomY = Math.max(randomRadius, Math.min(randomY, window_height - randomRadius));

let miCirculo = new Circle(randomX, randomY, randomRadius, randomStrokecolor, "1", randomBackcolor, randomSpeed);
miCirculo.draw(ctx);

let updateCircle = function () {
    requestAnimationFrame(updateCircle);
    ctx.clearRect(0, 0, window_width, window_height);
    miCirculo.update(ctx, document.getElementById('circle-1'));
};

const nCircles = 10;
let circles = [];
const tableBody = document.getElementById("circle-data");

for (let i = 0; i < nCircles; i++) {
    let randomRadius = Math.floor(Math.random() * 30 + 20);
    let randomX = Math.random() * window_width;
    let randomY = Math.random() * window_height;
    let randomSpeed = Math.random() * 3 + 1;
    let randomBackcolor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, ${Math.random()})`;
    let randomStrokecolor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, ${Math.random()})`;

    randomX = Math.max(randomRadius, Math.min(randomX, window_width - randomRadius));
    randomY = Math.max(randomRadius, Math.min(randomY, window_height - randomRadius));

    let miCirculo = new Circle(randomX, randomY, randomRadius, randomStrokecolor, i + 1, randomBackcolor, randomSpeed);
    circles.push(miCirculo);

    const row = document.createElement('tr');
    row.id = `circle-${i + 1}`;
    row.innerHTML = `<td>${i + 1}</td><td class="x">${Math.floor(randomX)}</td><td class="y">${Math.floor(randomY)}</td>`;
    tableBody.appendChild(row);
}

let updateCircleMulti = function () {
    requestAnimationFrame(updateCircleMulti);
    ctxMulti.clearRect(0, 0, window_width, window_height);
    circles.forEach((circle, index) => {
        circle.update(ctxMulti, document.getElementById(`circle-${index + 1}`));
    });
};

updateCircle();
updateCircleMulti();
