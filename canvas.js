var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = canvas.clientHeight;

var c = canvas.getContext('2d');

var rectangle = [
    {x: 0, y: 0},
    {x: 100, y: 0},
    {x: 100, y: 100},
    {x: 0, y: 100}
];

function transform(points, tx, ty, sx, sy) {
    return points.map(p => {
        return {
            x: p.x * sx + (tx * 50),
            y: p.y * sy + (ty * 50)
        };
    });
}

var colors = ['red', 'green', 'blue', 'yellow'];

function drawShape(points) {
    c.beginPath();
    c.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
        c.lineTo(points[i].x, points[i].y);
    }

    c.closePath();
    c.fillStyle = 'rgba(0, 0, 255, 0.3)'; 
    c.fill();

    for (let i = 0; i < points.length; i++) {
        let start = points[i];
        let end = points[(i + 1) % points.length];

        c.beginPath();
        c.moveTo(start.x, start.y);
        c.lineTo(end.x, end.y);

        c.strokeStyle = colors[i % colors.length];
        c.lineWidth = 3;
        c.stroke();
    }
}

function drawGrid(spacing = 50) {
    c.beginPath();

    for (let x = 0; x <= canvas.width; x += spacing) {
        c.moveTo(x, 0);
        c.lineTo(x, canvas.height);
    }

    for (let y = 0; y <= canvas.height; y += spacing) {
        c.moveTo(0, y);
        c.lineTo(canvas.width, y);
    }

    c.strokeStyle = '#ddd'; 
    c.lineWidth = 1;
    c.stroke();
}

function draw() {
    c.clearRect(0, 0, canvas.width, canvas.height);

    drawGrid();

    var tx = parseFloat(document.getElementById('tx').value);
    var ty = parseFloat(document.getElementById('ty').value);
    var sx = parseFloat(document.getElementById('sx').value);
    var sy = parseFloat(document.getElementById('sy').value);

    var transformed = transform(rectangle, tx, ty, sx, sy);

    drawShape(transformed);
}

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', draw);
});

draw();

