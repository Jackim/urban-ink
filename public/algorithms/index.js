module.exports = {
    SandSpiral: class {
        static init() {
            g.points = {
                a: [-width/3, -height/3], // control 1
                b: [-width/2, 0], // anchor 1
                c: [width/2, 0], // anchor 2
                d: [width/3, -height/3] //control 2
            };
            g.seed = utils.randInt(-height/2,height/2);
            g.seed = 2;
            g.seed2 = 0.024;
            background(20);
        }

        static run(x, y, factor, rand) {
            stroke(255)
            //translate(width / 2, height / 2);
            noFill();
            push();
            g.seed += Math.round(utils.jitter());
            g.seed2 += Math.round(utils.jitter());
            g.points = {
                a: [(x + (factor * sin(rand + y)) * 15) + y, g.fc + (2 * factor * tan(factor + x) + g.fc) * 15],
                //b: [g.fc, 10],
                //c: [g.fc, g.fc/2 * g.fc - g.seed],
                d: [x + (cos(factor + y) * 2) * 15 + g.fc, y + (tan(sin(y + g.fc)) * 15)]
            };
            sandBezier([g.points.a, g.points.d, g.points.d, g.points.d], 0.01, 80000, true, false);
            sandBezier([g.points.a, g.points.a, g.points.a, g.points.d], 0.01, 80000, true, false);
        }
    }
}