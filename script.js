const clock = document.getElementById('clock');
const context = clock.getContext('2d');

var radius = clock.width / 2;

context.translate(radius,radius);

radius = radius * 0.95;

setInterval(draw, 1000);

function draw() {
    drawClock(context, radius);
    drawNumber(context, radius);
    drawTime(context, radius);
    drawSegment(context, radius);
}

function drawClock(context, radius) {
    context.beginPath();
    context.arc(0, 0, radius, 0, 2*Math.PI);
    context.fillStyle = "#fff"
    context.fill();    

    context.beginPath();    
    context.arc(0, 0, radius, 0, 2*Math.PI);
    context.lineWidth = radius*0.02;
    context.strokeStyle = "#000";
    context.stroke();

    context.beginPath();    
    context.arc(0, 0, radius*0.05, 0, 2*Math.PI);
    context.fillStyle = "#000"
    context.fill();
}

function drawNumber(context, radius) {
    let angle;
    let num;
    
    context.font = radius * 0.15 + "px arial";

    context.textBaseline = "middle";
    context.textAlign = "center";

    for (num = 1; num < 13; num++) {
        angle = num * Math.PI/6;
        context.rotate(angle);
        context.translate(0, -radius*0.8);
        context.rotate(-angle);
        context.fillText(num.toString(), 0, 0);
        context.rotate(angle);
        context.translate(0, radius*0.8);        
        context.rotate(-angle);
    }
}

function drawTime(context, radius) {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    hours = hours % 12;
    hours = (hours * Math.PI/6) + (minutes * Math.PI/(6 * 60)) + (seconds * Math.PI/(6 * 3600));
    drawArrow(context, hours, radius*0.04, radius*0.45);
    minutes = (minutes*Math.PI/30) + (seconds * Math.PI/30*60);    
    drawArrow(context, minutes, radius*0.04, radius*0.7);
    seconds = seconds*Math.PI/30;  
    drawArrow(context, seconds, radius*0.02, radius*0.7);
}

function drawArrow(context, position, width, length) {
    context.beginPath();
    context.moveTo(0,0);
    context.rotate(position);
    context.lineTo(0, -length);
    context.lineWidth = width;
    context.lineCap = "round";
    context.strokeStyle = "#000";
    context.stroke();
    context.rotate(-position);
    context.closePath();
}

function drawSegment(context, radius) {
    let angle = Math.PI/30;

    for (let i = 0; i < 60; i++) {      
        
        context.rotate(i*angle);        
        if ((i % 5) == 0) {        
            context.moveTo(0, -radius*0.9);
        } else {        
            context.moveTo(0, -radius*0.93);
        }    
        context.lineTo(0, -radius*0.99);
        context.lineWidth = radius*0.01;    
        context.stroke();
        context.rotate(-i*angle);
        context.closePath()
    }
}
