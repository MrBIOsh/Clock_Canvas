class Clock {
  display = null;
  time = new Date();
  interval = 1000;
  constructor(display, time, interval) {
    this.display = display;

    if (time) this.time = time;
    if (interval) this.interval = interval;
    

    setInterval(() => {
      this.time = new Date(this.time.getTime() + this.interval)
      this.update(this.time);
    }, this.interval);  
    this.init(); 
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
  grad = null;

  constructor(canvasEl, theme) {
    this.canvas = canvasEl;
    this.theme = theme;
    this.ctx = canvasEl.getContext('2d');
    this.radius = (canvasEl.width / 2) * 0.9;
    this.ctx.translate(this.radius/0.9,this.radius/0.9);
  } 

  init() {
    // do nothing
  }
  
  drawClock() {
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.radius, 0, 2*Math.PI);
    this.ctx.fillStyle = getGrad(this.ctx, this.theme.background, this.radius);
    this.ctx.fill();    

    this.ctx.beginPath();    
    this.ctx.arc(0, 0, this.radius, 0, 2*Math.PI);
    this.ctx.lineWidth = this.radius*0.02;
    this.ctx.strokeStyle = this.theme.contourColor;
    this.ctx.stroke();

    this.ctx.beginPath();    
    this.ctx.arc(0, 0, this.radius*0.05, 0, 2*Math.PI);
    this.ctx.fillStyle = this.theme.contourColor;
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
    this.ctx.strokeStyle = this.theme.arrowColor;
    this.ctx.stroke();
    this.ctx.rotate(-position);
    this.ctx.closePath();
  }  

  update(date) {
    this.drawClock();
    this.drawNumber();   
    this.drawSegment(); 
    this.drawTime(date);
  }
}

const display = new Display(document.getElementById("clock"), 
{background: ['#222', '#888', '#444'], arrowColor: 'white', contourColor: 'yellow'});

const clock = new Clock(display);