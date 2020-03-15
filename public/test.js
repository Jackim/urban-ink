let sketch = function(p) {
    
    let particles = [];
    let seed;
    let count = 1;
    let particle_count;

    function createColours(n) {
        let colours = [];
        let initialColour = [p.random(0, 360) + p.randomGaussian(30, 30) % 360, p.randomGaussian(20, 25), p.randomGaussian(40, 25), p.randomGaussian(0.25, 0.25)];
        for (var i = 0; i < n; i++) {
            let multiplier = p.random() > 0.5 ? 1 : -1;
            initialColour[0] += p.randomGaussian(10, 10) * multiplier % 360;
            // saturation
            if (initialColour[1] > 40) {
                initialColour[1] -= 10;
            } else if (initialColour[1] < 10) {
                initialColour[1] += 10;
            } else {
                initialColour[1] += p.randomGaussian(15, 10) * multiplier % 100;
            }
            // brightness
            if (initialColour[2] > 50) {
                initialColour[2] -= 10;
            } else if (initialColour[2] < 30) {
                initialColour[2] += 10;
            } else {
                initialColour[2] += p.randomGaussian(15, 10) * multiplier % 100;
            }
            initialColour[3] += p.random(0, 0.25) % 1;
            colours.push(p.color(initialColour[0], initialColour[1], initialColour[2], initialColour[3]));
        }
        return colours;
    }

    p.setup = function() {
        let numColours = 30;
        let numCols = 30;

        p.colorMode(p.HSB, 360, 100, 100, 1);
        p.createCanvas(p.windowWidth, p.windowHeight);
        seed = p.floor(p.random(4000));
        console.log(seed);
        p.randomSeed(seed);
        p.noiseSeed(seed);
        p.background(28, 4, 91);
        p.stroke(28, 50, 12, 0.5);
        p.strokeWeight(0.6);
        let colours = createColours(numColours);
        // plot points
        let counter = 0;
        for (var j = 0; j < numColours; j++) {
            for (var i = 0; i < numCols; i++) {
                particles.push(new Particle(
                    p.map(i, 0, numCols, 0, p.windowWidth),
                    p.map(j, 0, numColours, 0, p.windowHeight),
                    p.random(p.TWO_PI),
                    colours[j],
                    counter
                ));
                counter++;
            }
        }
        particle_count = counter;
    }

    p.draw = function() {
        particles.forEach(function(particle) {
            particle.update();
            particle.display();
        });
    }

    p.keyPressed = function() {
        if (p.keyCode === p.ENTER) {
            p.saveCanvas('sketch_' + seed + '-' + count, 'jpeg');
            count++;
        } else if (p.keyCode === p.LEFT_ARROW) {
            p.noLoop();
        } else if (p.keyCode === p.RIGHT_ARROW) {
            p.loop();
        }
    }

    class Particle {

        constructor(x, y, angle, colour, index) {
            this.pos = p.createVector(x, y);
            this.angle = angle;
            this.val = 0;
            this.colour = colour;
            this.index = index;
        }

        update() {
            this.pos.x += 1.25 * p.cos(this.angle);
            this.pos.y += 1.25 * p.sin(this.angle);

            let nx = 1.8 * p.map(this.pos.x, 0, p.width, -1, 1);
            let ny = 1.8 * p.map(this.pos.y, 0, p.height, -1, 1);

            let n = p.createVector(nx, ny);

            let nval = (p.noise(n.x + 10, n.y - 10) * p.map(this.index + p.noise(nx) - p.noise(ny) % 80, 0, 80, 0, 1)) % 1;
            this.angle += 3 * p.map(nval, 0, 1, -1, 1) + p.random(0,0.25);
            this.val = nval;
        }

        display() {
            p.push();
            p.strokeWeight(3);
            this.colour.setAlpha(p.random(0.05, 0.2));
            p.stroke(this.colour);
            p.translate(this.pos.x + p.randomGaussian(0.25, 0.25), this.pos.y + p.randomGaussian(0.25, 0.25));
            p.rotate(this.angle);
            p.point(0, 0);
            p.pop();
        }
    }
}
new p5(sketch);