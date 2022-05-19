// https://www.youtube.com/watch?v=EO6OkltgudE&list=PLpPnRKq7eNW3We9VdCfx9fprhqXHwTPXL&index=2
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

// c.fillStyle = 'rgba(255, 0, 0, 0.5)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0, 0, 255, 0.5)';
// c.fillRect(400, 100, 100, 100);
// c.fillStyle = 'rgba(0, 255, 0, 0.5)';
// c.fillRect(300, 300, 100, 100);

// // https://www.youtube.com/watch?v=83L6B13ixQ0&list=PLpPnRKq7eNW3We9VdCfx9fprhqXHwTPXL&index=2
// // Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "#fa34a3";
// c.stroke();


// for (let i = 0; i < 30; i++) {
//     let x = Math.random() * window.innerWidth;
//     let y = Math.random() * window.innerHeight;
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle = 'blue';
//     c.stroke();
// }

// https://www.youtube.com/watch?v=vxljFhP2krI&list=PLpPnRKq7eNW3We9VdCfx9fprhqXHwTPXL&index=4
const mouse = {
    x: undefined,
    y: undefined
}

const maxRadius = 40;
const minRadius = 2;

const colorArray = [
    '#ffaa33',
    '#99ffaa',
    '#00ff00',
    '#4411aa',
    '#ff1100'
];

window.addEventListener('mousemove', function(event) {
    // console.log(event);
    mouse.x = event.x;
    mouse.y = event.y;
    // console.log(mouse)
})

// let grow = true;

// window.addEventListener('mousedown', function() {
//     grow = !grow;
// })

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
})

// https://www.youtube.com/watch?v=yq2au9EfeRQ&list=PLpPnRKq7eNW3We9VdCfx9fprhqXHwTPXL&index=3

function Circle(x, y, dx, dy, radius, minRadius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = minRadius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = 'blue';
        c.stroke();
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function() {

        if (this.x + radius > innerWidth || this.x - radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + radius > innerHeight || this.y - radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
            // if (grow) {
            //     this.radius += 1;
            // } else {
            //     if (this.radius > 10) {
            //         this.radius -= 1;
            //     }
            // }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }
}



let circleArray = [];

function init() {

    circleArray = [];

    for (let i = 0; i < 800; i++) {
        let radius = Math.random() * 3 + 1;
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let y = Math.random() * (innerHeight - radius * 2) + radius;
        let dx = (Math.random() - 0.5) * 8;
        let dy = (Math.random() - 0.5) * 8;
        circleArray.push(new Circle(x, y, dx, dy, radius, minRadius))
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

init();
animate();
