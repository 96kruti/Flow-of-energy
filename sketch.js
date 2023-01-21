let particles = []; //particles 

let pp = []; //pp for perlin particles
const num = 1000;
//We are initializing the noisescale so that perlin noise scales down
const noiseScale= 0.01;
const speed = 0.09;

function setup() {
  createCanvas(600, 600);
 
  //Declare vector and push a particle in the array
   for(let i = 0; i < num; i ++) {
     pp.push(createVector(random(width), random(height)));
    }
  //Draw the background to black
  background(0);
  
  }
  

function draw() {
  //Draw ellipse in center to shower particle system
  fill(0,5);
  noStroke();
  ellipse(0, height/2,500);
  
  
  stroke(255,69,0);
  //Draw points all over the screen that will be placed randomly on the screen.
  for(let i = 0; i < num; i ++) {
    let p = pp[i];
    point(p.x, p.y);
    let n=noise(p.x * noiseScale,p.y*noiseScale);
    //Here using trigonometry we are changing, 
    //angle of perlin noise to x and y position to get the movement
    let a= TAU * n;
    p.x += cos(a) * speed ;
    p.y += sin(a) * speed ;
  }

  //For introducing the cloud of particles
  for (let i = 0; i < 5; i++) {
    let p = new Particle(0,300);
    particles.push(p);
    }

  //Work of one particle starts here
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      // remove this particle
      particles.splice(i, 1);
    }
  }
  
}



//Single particle class
class Particle {

  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.vx = random(2, -2);
    this.vy = random(-2, 2);
    this.alpha = 255;
    
  }
 //Removing the particle from system so that speed does not slows down.
  finished() {
    return this.alpha < 0;
  }
// Adding particles to the system.
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 2;
    
  }
//drawing the particles in canvas
  show() {
    noStroke();
    fill(255,69,0, this.alpha);
    ellipse(this.x,this.y,3);
  }

}


