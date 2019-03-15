let border = 200;
let number_of_particles = 3000;
let number_of_particle_sets = 8;
let particle_sets = [];
let tick = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    //noLoop();
    colorMode(HSB, 360, 100, 100, 1);
    randomSeed(1);
    noiseSeed(1);
    noFill();
    background('#e7e7db');
    stroke(30, 100, 8, 0.1);
    strokeWeight(0.7);

    for (var i = 0; i < number_of_particle_sets; i++) {
        let ps = [];
        for (var j = 0; j < number_of_particles; j++) {
            ps.push(
                new Particle(
                    randomGaussian(windowWidth / 2, 110),
                    randomGaussian(windowHeight / 2, 110),
                    random(TWO_PI)
                )
            );
        }
        particle_sets.push(ps);
    }
}

function nextFrame() {
    var fc = frameCount;
    loop();
    while (true) {
        if (fc != frameCount) {
            noLoop();
            break;
        }
    }
}

function draw() {
    //background('#e7e7db');
    particle_sets.forEach(function(particles, index) {
        particles.forEach(function(particle) {
            particle.update(index);
            particle.display(index);
        });
    });
}

function keyPressed() {
    if (keyCode == RIGHT_ARROW) {
        nextFrame();
    }
    //return false;
}

class Particle {
    constructor(x, y, angle) {
        this.pos = createVector(x, y);
        this.angle = angle;
        this.val = 0;
    }

    update(index) {
        this.pos.x += cos(this.angle);
        this.pos.y += sin(this.angle);

        let nx = 1.8 * map(this.pos.x, 0, windowWidth, -1, 1);
        let ny = 1.8 * map(this.pos.y, 0, windowHeight, -1, 1);

        let n = createVector(nx, ny);

        let nval = (noise(n.x + 23, n.y - 42) + 0.045 * (index - number_of_particle_sets / 2)) % 1;

        this.angle += 3 * map(nval, 0, 1, -1, 1);
        this.val = nval;
    }

    display(index) {
        if (this.val > 0.482 && this.val < 0.518) {
            push();
            translate(this.pos.x, this.pos.y);
            rotate(this.angle);
            point(0, 0);
            pop();
        }
    }
}