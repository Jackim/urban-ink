let sketch = function(p) {
    let particles = [];
    let seed;
    let count = 1;
    p.setup = function() {
        p.colorMode(p.HSB, 360, 100, 100, 1);
        p.createCanvas(p.windowWidth, p.windowHeight);
        seed = p.floor(p.random(4000));
        p.randomSeed(seed);
        p.noiseSeed(seed);
        p.background(28, 4, 91);
        p.stroke(28, 50, 12, 0.5);
        p.strokeWeight(0.6);
        let colours = [
            p.color(311, 24, 28, 0.2),
            p.color(244, 38, 51, 0.2),
            p.color(154, 16, 53, 0.2)
        ];
        for (var j = 0; j < 3; j++) {
            for (var i = 0; i < 80; i++) {
                particles.push(new Particle(
                    100 * p.cos(i * 10) + (p.windowWidth / 2),
                    100 * p.sin(i * 10) + 500,
                    p.random(p.TWO_PI),
                    colours[j]
                ));
            }
        }
    }

    p.draw = function() {
        particles.forEach(function(particle) {
            particle.update();
            particle.display();
        });
        //p.noLoop();
    }

    p.keyPressed = function() {
        if (p.keyCode === p.ENTER) {
            p.saveCanvas('sketch_' + seed + '-' + count, 'jpeg');
            count++;
        }
    }

    class Particle {
        constructor(x, y, angle, colour) {
            this.pos = p.createVector(x, y);
            this.angle = angle;
            this.val = 0;
            this.colour = colour
        }

        update() {
            this.pos.x += 1.25 * p.cos(this.angle);
            this.pos.y += 1.25 * p.sin(this.angle);

            let nx = 1.8 * p.map(this.pos.x, 0, p.width, -1, 1);
            let ny = 1.8 * p.map(this.pos.y, 0, p.height, -1, 1);

            let n = p.createVector(nx, ny);

            let nval = (p.noise(n.x + 10, n.y - 10) * p.random()) % 1;
            this.angle += 3 * p.map(nval, 0, 1, -1, 1);
            this.val = nval;
        }

        display() {
            p.push();
            p.stroke(this.colour)
            if (this.val > 0.4 && this.val < 0.6) {
                
            } else {
                //p.stroke(0, 0, 100, 0.5);
            }
            p.translate(this.pos.x, this.pos.y);
            p.rotate(this.angle);
            p.point(0, 0);
            p.pop();
        }
    }
}
new p5(sketch);