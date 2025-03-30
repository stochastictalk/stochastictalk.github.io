let c_w = 400;
let c_h = 400;
let init_x = c_w/2;
let init_y = c_w/2;
let worm;
let n_particles = 5;
let k = 1;
let m = 1;
let dt = .1;
let l = 10;
let c = 1;

class Worm {
    constructor(n_particles, k, m, dt, l, c) {
        this.x = Array(n_particles).fill(0).map((e,i)=>createVector(c_w/2 - (n_particles/2 * 15) + (i * 15), c_h/2)); // Position of each particle
        this.v = Array(n_particles).fill(0).map((e,i)=>createVector(0., 0.)); // Velocity of each particle
        this.k = k;
        this.n = n_particles;
        this.m = m;
        this.dt = dt;
        this.l = l;
        this.c = c;
    }

    update() {
        for (let j = 0; j <  this.n; j++) {
            let f1 = createVector(0, 0);
            let f2 = createVector(0, 0);
            if (j < this.n - 1) {
                f1.add(this.x[j+1]).sub(this.x[j]);
                f1.setMag(this.k*(f1.mag() - this.l));
                f1.add(this.v[j+1].copy().sub(this.v[j]).mult(this.c));
            }
            if (j > 0) {
                f2.add(this.x[j-1]).sub(this.x[j]);
                f2.setMag(this.k*(f2.mag() - this.l));
                f2.add(this.v[j-1].copy().sub(this.v[j].mult(this.c)));
            }
            let f = p5.Vector.add(f1, f2);
            let dv = p5.Vector.mult(f, this.dt/this.m);
            this.v[j].add(dv).mult(0.99); // To stop numerical errors making the worm crazy
            let dx = this.v[j].copy();
            dx.mult(this.dt);
            this.x[j].add(dx);
        }
    }
};

function setup() {
    canvas = createCanvas(c_w, c_h);
    canvas.parent("sketch");
    strokeWeight(5);
    stroke("white");
    worm = new Worm(n_particles, k, m, dt, l, c);
}

function draw() {
    background("black"); // Draw over the last frame

    // Update the particle positions and velocities
    worm.update();

    // Draw the worm
    for (let j = 0; j < worm.n; j++) {

        let x = worm.x[j].x % c_w;
        let y = worm.x[j].y % c_h;
        if (x < 0) {
            x = c_w + x;
        }
        if (y < 0) {
            y = c_h + y;
        }
        point(x, y);
    };
}