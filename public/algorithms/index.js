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
            stroke(255);
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

        static sandBezier(bezierCurve, chance, grains, jitter, useColor) {
            var steps = grains ? grains : bezierLength(bezierCurve);
            for (var i = 0; i < steps; i++) {
                if (Math.random() < chance) {
                    var t = i / steps;
                    var x = bezierPoint(bezierCurve[0][0], bezierCurve[1][0], bezierCurve[2][0], bezierCurve[3][0], t);
                    var y = bezierPoint(bezierCurve[0][1], bezierCurve[1][1], bezierCurve[2][1], bezierCurve[3][1], t);
                    x = jitter ? x + utils.jitter(x) : x;
                    if (useColor) {
                        stroke(utils.randInt(0, 255 - i / steps * 255), utils.randInt(100, i / steps * 255), 255, utils.randInt(0, 70));
                    } else {
                        stroke(255, 255, 255, utils.randInt(0, 70));
                    }
                    if (x < width / 2) {
                        if (x > -width / 2) {
                            if (y < height / 2) {
                                if (y > -height / 2) {
                                    point(x, y);
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    Sprawl: class {
        constructor() {
            this.thestring = 'A'; // "axiom" or start of the string
            this.numloops = 5; // how many iterations to pre-compute
            this.therules = []; // array for rules
            this.therules[0] = ['A', '-BF+AFA+FB-']; // first rule
            this.therules[1] = ['B', '+AF-BFB-FA+']; // second rule
            this.whereinstring = 0; // where in the L-system are we?
            init();
        }

        static init() {
            background(20);
        }

        static run() {
            stroke(255);
            translate(width / 2, height / 2);
            push();
        }

        static lBranch(tree, part) {
            if (part > 25) {

            }
        }
    }
}