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
    },
    TempSandSpiral: class {
        constructor(radius, time, start) {
            self.radius = radius;
            self.time = time;
            self.start = start;
            self.coords = {
                a: 0,
                b: 0,
                c: 0,
                d: 0
            };
            self.points = [];
            this.run();
        }

        run(curvePoints) {
            var steps = 500;
            translate(windowWidth / 2, windowHeight / 2);
            curvePoints = {
                a: [g.fc/2 * tan(g.fc), g.fc/2 * cos(g.fc)],
                b: [g.fc/2 * cos(g.fc), g.fc/2 * sin(g.fc)],
                c: [g.fc/2 * tan(g.fc), g.fc/2 * cos(g.fc)],
                d: [g.fc/2 * cos(g.fc), g.fc/2 * sin(g.fc)]
            };
            for (var i = 0; i < steps; i++) {
                if (Math.random() < 0.1) {
                    var t = i / steps;
                    var x = bezierPoint(curvePoints.a[0], curvePoints.b[0], curvePoints.c[0], curvePoints.d[0], t);
                    var y = bezierPoint(curvePoints.a[1], curvePoints.b[1], curvePoints.c[1], curvePoints.d[1], t);
                    if (x < self.radius / 2 && x > -self.radius / 2 && y < self.radius / 2 && y > -self.radius / 2) {
                        self.points.push({x: x, y: y, color: color});
                        push()
                        stroke(255, utils.randInt(0, 70));
                        point(x, y);
                        pop();
                    }
                }
            }
        }

        init() {
            translate(start[0], start[1]);
        }
    }
}