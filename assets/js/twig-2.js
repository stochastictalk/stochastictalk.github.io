let c_w = 600;
let c_h = 600;
let canvas;
let L = .5; // Scale
let sw = .5; // Stroke weight
let fr = 60; // Frame rate
let max_n_cells = 50000;
let APEX_AUXIN_VOLUME = 1.;
let SLEEPER_AUXIN_VOLUME = 0.;
let AUXIN_DECAY_FACTOR = 0.005; // Rate at which auxin tails to zero, linear decay
let SLEEPER_PROBABILITY = .02; // Probability an apex specialises to a sleeper
let GRAVITROPISM_SF = 2e-5;
let MAX_BUD_AGE = 50;

// Three cell types:
// * Apexes
// * Anglers
// * Sleepers
// We start with one (1) spurter, oriented straight up.
// The apexes and sleepers are auxin sources. We first compute the auxin concentration at each cell. 
// For apexes, we:
// * Flip a coin to see if it has a child spurter - the probability depends on the auxin concentration
// * Flip a coin to determine whether the spurter becomes a birther or an angler - the probability depends on the auxin concentration
// For sleepers, we:
// * Flip a coin on whether it forms a new apex - the probability depends on the auxin concentration
// For anglers, we:
// * Update its angle based on its auxin gradient, which is figured out from its orientation, the auxin concentration, and the direction of gravity
// Apexes, anglers, and sleepers are all types of cell. Sleepers are a specialist type of angler.

// Possible things to incorporate next:
// * Gravity
// * Light
// * Small branches
// * Leaves
// * Flowers 
// * Roots
// Each segment behaves like a spring
// Stiffness and mass can vary with the branch's girth
// At each time step, need to 

// Later can incorporate light exposure, and adjust the sleeper and apex probabilities

const CellType = Object.freeze({
    APEX: "apex",
    SLEEPER: "sleeper",
    ANGLER: "angler"
})

const ALL_CELL_TYPES = [CellType.APEX, CellType.SLEEPER, CellType.ANGLER];

class Tree {

    constructor() {
        this.stem_cell = new Cell(0., null); // Parent of all cells
        this.stem_cell.x_o = 0.;
        this.stem_cell.y_o = 0.;
        this.stem_cell.x_e = this.stem_cell.x_o + Math.sin(this.stem_cell.th);
        this.stem_cell.y_e = this.stem_cell.y_o + Math.cos(this.stem_cell.th);
    }

    _extract_cells_of_type(cell, cell_collection, cell_types) { // Extract all descendent cells of a given type
        // Parents are pushed before children
        if (cell_types.includes(cell.type)) {
            cell_collection.push(cell);
        }
        
        for (const child_cell of cell.c) {
            this._extract_cells_of_type(child_cell, cell_collection, cell_types);
        }
    }

    // Returns all cells in tree of given types in a topologically sorted order
    cells(cell_types) {
        let cell_collection = [];
        this._extract_cells_of_type(this.stem_cell, cell_collection, cell_types);
        return cell_collection
    }

    // Evolve the tree by one step
    update() {
        // All the growth steps - replication, specialisation, budding, and angling - depend on auxin concentration.
        // So we broadcast the auxin concentration from the stem tips and leaves, then run the individual grow steps.

        // Clear the cell auxin concentrations 
        for (const cell of this.cells(ALL_CELL_TYPES)) {
            cell.clear(); // Clear cell auxin volume
        }

        // Update auxin concentrations
        for (const cell of this.cells([CellType.APEX, CellType.SLEEPER])) {
            cell.broadcast(); // Transmits its auxin concentration up to n steps in all directions
        }

        // Compute locations and orientations of cells
        for (const cell of this.cells(ALL_CELL_TYPES)) {
            if (!(cell.p == null)) { // If not stem cell
                cell.x_o = cell.p.x_e;
                cell.y_o = cell.p.y_e;
                cell.g_th = (cell.p.g_th + cell.th);
            }
            else {
                cell.g_th = cell.th;
            }
            cell.x_e = cell.x_o + Math.sin(cell.g_th);
            cell.y_e = cell.y_o + Math.cos(cell.g_th); 
        }

        // Grow
        for (const cell of this.cells(ALL_CELL_TYPES)) {
            cell.age += 1.;
            cell.replicate(); // Branch apex cells replicate
            cell.specialise(); // Apex cells specialise
            cell.bud(); // Sleepers may bud to new branches
            cell.orient(); // Anglers and sleepers orient themselves w.r.t. gravity
        }
    }

    draw(o_x, o_y, L) {
        // We draw the tree by figuring out the position of all the branches from the position of the stem cell
        for (const cell of this.cells(ALL_CELL_TYPES)) {
            if (cell.type == CellType.SLEEPER) {
                //stroke(255, 0, 0);
            } else {
                //stroke(0, 255*Math.min(cell.a, 1.), 0); // Colour with auxin concentration so tracking growth is easier
            }
            strokeWeight(L*(cell.age/100)**1.6);
            line(o_x + L*cell.x_o, c_h - L*cell.y_o - o_y, o_x + L*cell.x_e, c_h - L*cell.y_e - o_y);
        }
    }
}

class Cell {

    constructor(th=0., p) {
        this.th = th; // orientation relative to parent if it has one or global vertical if not, positive clockwise
        this.p = p; // parent cell
        this.c = []; // list of children cells
        this.a = 0.; // auxin concentration 
        this.age = 0.; // age
        this.type = CellType.APEX // _always_ an apex cell on construction

        // Global coordinates
        this.g_th = null;
        this.x_o = null;
        this.y_o = null;
        this.x_e = null;
        this.y_e = null;
    }

    clear() {
        this.a = 0.;
    }

    get replicate_probability() {
        return 1.; // TODO: should be a function of auxin concentration!
    }

    get bud_probability() {
        return (1. - this.a); // TODO: should be a function of auxin concentration!
    };

    get sleeper_probability() { // Probability of an apex specialising to a sleeper (i.e. a leaf)
        return SLEEPER_PROBABILITY;
    };

    get bud_angle() {
        return Math.sign(Math.random()-0.5)*(Math.PI/4 + Math.random() - 0.5);
    }

    get gravitropism_angle() { // returns angle delta based on auxin concentration, cell orientation, and direction of gravity
        // Branch angle is angle relative to vertical, measured clockwise
        // subtract if less than pi, add if more than pi
        let sign = -Math.sign(Math.PI - this.g_th);
        let mag = GRAVITROPISM_SF*this.a*(this.g_th % 2*Math.PI)/Math.PI // Diminishes as th approaches 0 or 2pi
        return sign*mag;
    }

    // Apex methods
    replicate() { // if apex type, may extend existing branch
        if ((Math.random() <= this.replicate_probability) && (this.type == CellType.APEX)) {
            let c = new Cell(0., this);
            this.c.push(c);
        }
    }

    specialise() { // if apex type, specialises to a sleeper or an angler
        if (this.type == CellType.APEX) {
            if (Math.random() <= this.sleeper_probability) {
                this.type = CellType.SLEEPER;
            } else {
                this.type = CellType.ANGLER;
            }
        }
    }

    _broadcast(cell, source_auxin_volume, distance, visited_cells) {
        // Increments the auxin concentration of the cell, 
        // then increments concentration of unvisited parents and children.
        let auxin_increment = source_auxin_volume - distance*AUXIN_DECAY_FACTOR;

        if (auxin_increment <= 0) {
            return 
        } else if (visited_cells.has(cell)) {
            return
        } else {
            cell.a = Math.min(cell.a + auxin_increment, 1.);
            visited_cells.add(cell);
            if (cell.p != null) { 
                this._broadcast(cell.p, source_auxin_volume, distance + 1, visited_cells);
            }
            for (const child_cell of cell.c) {
                this._broadcast(child_cell, source_auxin_volume, distance + 1, visited_cells);
            }
        }
    }

    broadcast() { // If apex type or sleeper type, broadcasts auxin source value to neighbours
        
        let source_auxin_volume; 
        if (this.type == CellType.APEX) {
            source_auxin_volume = APEX_AUXIN_VOLUME;
        } else if (this.type == CellType.SLEEPER) {
            source_auxin_volume = SLEEPER_AUXIN_VOLUME;
        } else {
            return
        }
        
        this._broadcast(this, source_auxin_volume, 0., new Set([]));
    }

    // Sleeper methods
    bud() { // if sleeper type, may form a new branch and turn into an angler
        if ((Math.random() <= this.bud_probability) && (this.type == CellType.SLEEPER) && (this.age < MAX_BUD_AGE)) {
            this.type = CellType.ANGLER;
            let c = new Cell(this.bud_angle, this);
            this.c.push(c);
        }
    }

    // Angling methods
    orient() { // Updates orientation relative to parent
        this.th += this.gravitropism_angle;
    }

}

function setup() {
    canvas = createCanvas(c_w, c_h);
    canvas.parent("sketch");
    tree = new Tree();
    frameRate(fr);
    strokeWeight(sw);
};

function draw() {
    if (tree.cells(ALL_CELL_TYPES).length < max_n_cells) {
        background("white");
        fill("black");
        rect(0, c_h - 100, c_w, 100);
        tree.update();
        tree.draw(c_w/2, 100, L);
    }
}