//------------------------------------------------------

// const clock = document.getElementById('clock');
// const context = clock.getContext('2d');

// var radius = clock.width / 2;

// context.translate(radius,radius);

// radius = radius * 0.95;

// setInterval(draw, 1000);

// function draw() {
//     drawClock(context, radius);
//     // drawNumber(context, radius);
//     // drawTime(context, radius);
//     // drawSegment(context, radius);
// }

// function drawClock(context, radius) {
//     context.beginPath();
//     context.arc(0, 0, radius, 0, 2*Math.PI);
//     context.fillStyle = "#fff"
//     context.fill();    

//     context.beginPath();    
//     context.arc(0, 0, radius, 0, 2*Math.PI);
//     context.lineWidth = radius*0.02;
//     context.strokeStyle = "#000";
//     context.stroke();

//     context.beginPath();    
//     context.arc(0, 0, radius*0.05, 0, 2*Math.PI);
//     context.fillStyle = "#000"
//     context.fill();
// }

// function drawNumber(context, radius) {
//     let angle;
//     let num;
    
//     context.font = radius * 0.15 + "px arial";

//     context.textBaseline = "middle";
//     context.textAlign = "center";

//     for (num = 1; num < 13; num++) {
//         angle = num * Math.PI/6;
//         context.rotate(angle);
//         context.translate(0, -radius*0.8);
//         context.rotate(-angle);
//         context.fillText(num.toString(), 0, 0);
//         context.rotate(angle);
//         context.translate(0, radius*0.8);        
//         context.rotate(-angle);
//     }
// }

// function drawTime(context, radius) {
//     let date = new Date();
//     let hours = date.getHours();
//     let minutes = date.getMinutes();
//     let seconds = date.getSeconds();

//     hours = hours % 12;
//     hours = (hours * Math.PI/6) + (minutes * Math.PI/(6 * 60)) + (seconds * Math.PI/(6 * 3600));
//     drawArrow(context, hours, radius*0.04, radius*0.45);
//     minutes = (minutes*Math.PI/30) + (seconds * Math.PI/30*60);    
//     drawArrow(context, minutes, radius*0.04, radius*0.7);
//     seconds = seconds*Math.PI/30;  
//     drawArrow(context, seconds, radius*0.02, radius*0.7);
// }

// function drawArrow(context, position, width, length) {
//     context.beginPath();
//     context.moveTo(0,0);
//     context.rotate(position);
//     context.lineTo(0, -length);
//     context.lineWidth = width;
//     context.lineCap = "round";
//     context.strokeStyle = "#000";
//     context.stroke();
//     context.rotate(-position);
//     context.closePath();
// }

// function drawSegment(context, radius) {
//     let angle = Math.PI/30;

//     for (let i = 0; i < 60; i++) {      
        
//         context.rotate(i*angle);        
//         if ((i % 5) == 0) {        
//             context.moveTo(0, -radius*0.9);
//         } else {        
//             context.moveTo(0, -radius*0.93);
//         }    
//         context.lineTo(0, -radius*0.99);
//         context.lineWidth = radius*0.01;    
//         context.stroke();
//         context.rotate(-i*angle);
//         context.closePath()
//     }
// }

/*---------------------------------------------------------------------*/


class Clock {
  display = null;
  constructor(display, time, delay) {
    this.display = display;
    setInterval(() => {
      this.init();
      this.update(new Date());
    }, delay);   
  }

  update(time) {
    this.display.update(time);
  }

  init() {
    this.display.init();
  }
}

class Display {
  canvas = null;  
  ctx = null;
  radius = null;

  constructor(canvasEl) {
    this.canvas = canvasEl;
    this.ctx = canvasEl.getContext('2d');
    this.radius = (canvasEl.width / 2) * 0.9;
    this.ctx.translate(this.radius/0.9,this.radius/0.9);
  } 

  init() {
    this.drawClock();
    this.drawNumber();   
    this.drawSegment(); 
  }
  
  drawClock() {
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.radius, 0, 2*Math.PI);
    this.ctx.fillStyle = "#fff"
    this.ctx.fill();    

    this.ctx.beginPath();    
    this.ctx.arc(0, 0, this.radius, 0, 2*Math.PI);
    this.ctx.lineWidth = this.radius*0.02;
    this.ctx.strokeStyle = "#000";
    this.ctx.stroke();

    this.ctx.beginPath();    
    this.ctx.arc(0, 0, this.radius*0.05, 0, 2*Math.PI);
    this.ctx.fillStyle = "#000"
    this.ctx.fill();
  }

  drawNumber() {
    let angle;
    let num;
    
    this.ctx.font = this.radius * 0.15 + "px arial";
    this.ctx.textBaseline = "middle";
    this.ctx.textAlign = "center";

    for (num = 1; num < 13; num++) {
        angle = num * Math.PI/6;
        this.ctx.rotate(angle);
        this.ctx.translate(0, -this.radius*0.8);
        this.ctx.rotate(-angle);
        this.ctx.fillText(num.toString(), 0, 0);
        this.ctx.rotate(angle);
        this.ctx.translate(0, this.radius*0.8);        
        this.ctx.rotate(-angle);
    }
  }

  drawSegment() {
    let angle = Math.PI/30;

    for (let i = 0; i < 60; i++) {      
        
      this.ctx.rotate(i*angle);        
        if ((i % 5) == 0) {        
          this.ctx.moveTo(0, -this.radius*0.9);
        } else {        
          this.ctx.moveTo(0, -this.radius*0.93);
        }    
        this.ctx.lineTo(0, -this.radius*0.99);
        this.ctx.lineWidth = this.radius*0.01;    
        this.ctx.stroke();
        this.ctx.rotate(-i*angle);
        this.ctx.closePath()
    }
  }

  drawTime(date) {   
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    hours = hours % 12;
    hours = (hours * Math.PI/6) + (minutes * Math.PI/(6 * 60)) + (seconds * Math.PI/(6 * 3600));
    this.drawArrow(hours, this.radius*0.04, this.radius*0.45);
    minutes = (minutes*Math.PI/30) + (seconds * Math.PI/30*60);    
    this.drawArrow(minutes, this.radius*0.04, this.radius*0.7);
    seconds = seconds*Math.PI/30;  
    this.drawArrow(seconds, this.radius*0.02, this.radius*0.7);
  }

  drawArrow(position, width, length) {
    this.ctx.beginPath();
    this.ctx.moveTo(0,0);
    this.ctx.rotate(position);
    this.ctx.lineTo(0, -length);
    this.ctx.lineWidth = width;
    this.ctx.lineCap = "round";
    this.ctx.strokeStyle = "#000";
    this.ctx.stroke();
    this.ctx.rotate(-position);
    this.ctx.closePath();
  }  

  update(date) {
    this.drawTime(date);
  }
}

const canvas = document.getElementById("clock");

const display = new Display(canvas);
const clock = new Clock(display, new Date(), 1000);


//console.log(clock);
