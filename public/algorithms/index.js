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

        static run() {
            stroke(255)
            translate(width / 2, height / 2);
            noFill();
            push();
            g.seed += Math.round(utils.jitter());
            g.seed2 += Math.round(utils.jitter());
            g.points = {
                a: [g.fc/2 * tan(g.fc) + g.seed, g.fc/2 * cos(g.fc) + g.seed],
                b: [g.fc/2 * cos(g.fc) + g.seed, g.fc/2 * sin(g.fc) + g.seed],
                c: [g.fc/2 * tan(g.fc) - g.seed, g.fc/2 * cos(g.fc) - g.seed],
                d: [g.fc/2 * cos(g.fc) - g.seed, g.fc/2 * sin(g.fc) - g.seed]
            };
            sandBezier([g.points.a, g.points.a, g.points.d, g.points.d], 0.01, 80000, true, true);
            sandBezier([g.points.a, g.points.d, g.points.a, g.points.d], 0.01, 80000, true, false);
        }
    }
}