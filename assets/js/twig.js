let c_w = 700;
let c_h = 400;
let canvas;
let dl = 1.;
let p = 0.018; 
let th = Math.PI/8;
let max_trunk_l = 3*c_h/4;
let NOISE_SCALE = 0.5;
let max_n_limbs = 10000;
let prune = true;
let prune_height = c_h/8;

class Twig {

    constructor(x, y, th, dl, p, max_n_limbs, prune) {
        this.limbs = [[x, y, 0., dl]]; // Each limb has an origin, an orientation, and a length
        this.dl = dl;
        this.p = p;
        this.th = th;
        this.max_n_limbs = max_n_limbs;
        this.prune = prune; // Whether to prune lower branches during growth
    }

    update() {
        // Extend each limb, sample new limbs if it's not yet reached maturity
        for (let j = 0; j < this.limbs.length; j++) {
            this.limbs[j][3] += this.dl*random();
            
            if (this.prune && (this.limbs[0][3] < prune_height)) {
                continue;
            }

            if (this.limbs.length < this.max_n_limbs) {

                if (this.p >= Math.random()) {
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

    }

    draw() {
        for (let j = 0; j < this.limbs.length; j++) {
            let [x, y, th, l] = this.limbs[j];
            let x_tip = x + Math.sin(th)*l;
            let y_tip = y + Math.cos(th)*l
            let r = max(.1, 5*((l/max_trunk_l)**2));
            strokeWeight(0);
            // line(x, c_h-y, x_tip, c_h-y_tip);
            let x1 = x + Math.sin(th + Math.PI/2)*r;
            let y1 = y + Math.cos(th + Math.PI/2)*r;
            let x2 = x - Math.sin(th + Math.PI/2)*r;
            let y2 = y - Math.cos(th + Math.PI/2)*r;
            let x3 = x_tip;
            let y3 = y_tip;
            triangle(x1, c_h - y1, x2, c_h - y2, x3, c_h - y3);
        }
    }

    trunkLength() {
        return this.limbs[0][3];
    }
}

function setup() {
    canvas = createCanvas(c_w, c_h);
    canvas.parent("sketch");
    frameRate(120);
    fill("black");
    twig = new Twig(c_w/2, c_h/6, th, dl, p, max_n_limbs, prune);
}


function draw() {
    background("white");
    if (twig.trunkLength() < max_trunk_l) {
        twig.update();
    }
    twig.draw();
    rect(0, 5*c_h/6, c_w, c_h/6);
}