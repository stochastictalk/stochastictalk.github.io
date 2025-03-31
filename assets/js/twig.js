let c_w = 700;
let c_h = 400;
let canvas;
let dl = 1.;
let l_mat = 1000;
let p = 0.016; 
let th = Math.PI/8;
let max_trunk_l = 3*c_h/4;
let NOISE_SCALE = 0.5;

class Twig {

    // Twig's just a collection of limbs
    constructor(x, y, th, dl, l_mat, p) {
        this.limbs = [[x, y, 0., dl]]; // Each limb has an origin, an orientation, and a length
        this.dl = dl;
        this.l_mat = l_mat;
        this.p = p;
        this.th = th;
    }

    update() {
        // Extend each limb, sample new limbs if it's not yet reached maturity
        for (let j = 0; j < this.limbs.length; j++) {
            this.limbs[j][3] += this.dl*random();
            let maturity = this.limbs[j][3]/max_trunk_l;  
            
            if (this.p*(1 - maturity) >= Math.random()) {
                // Origin of new limb is tip of current limb
                let [x, y, th, l] = this.limbs[j];
                let x_tip = x + Math.sin(th)*l;
                let y_tip = y + Math.cos(th)*l;
                let sign = (Math.random() > 0.5) ? 1 : -1;  
                th = th + sign*this.th + NOISE_SCALE*(random() - 0.5);
                this.limbs.push([x_tip, y_tip, th, 0.]);
            }
        }

    }

    draw() {
        for (let j = 0; j < this.limbs.length; j++) {
            let [x, y, th, l] = this.limbs[j];
            let x_tip = x + Math.sin(th)*l;
            let y_tip = y + Math.cos(th)*l;
            strokeWeight(l/100);
            line(x, c_h-y, x_tip, c_h-y_tip);
        }
    }

    trunkLength() {
        return this.limbs[0][3];
    }
}

function setup() {
    canvas = createCanvas(c_w, c_h);
    canvas.parent("sketch");
    frameRate(60);
    stroke("black");
    strokeWeight(2);
    fill("black");
    twig = new Twig(c_w/2, c_h/6, th, dl, l_mat, p);
}


function draw() {
    background("white");
    if (twig.trunkLength() < max_trunk_l) {
        twig.update();
    }
    twig.draw();
    rect(0, 5*c_h/6, c_w, c_h/6);
}