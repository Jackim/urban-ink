const utils = require('../public/utils/index.js');
const prim = require('../public/primitives/index.js');
const algos = require('../public/algorithms/index.js');

var g = {
    saved: false
};

const ALGO = "SandSpiral";
const C_WIDTH = 1920 * 4;
const C_HEIGHT = 1080 * 4;

function setup() {
    g.fc = frameCount;
    createCanvas(C_WIDTH, C_HEIGHT);
    angleMode(DEGREES);
    frameRate(120);
    algos[ALGO].init();
}

function examples() {
    for (var i = 0; i < 40; i++) {
        new prim.LineParent([i, 0], [sin(i) * 20, 50], [255, 255, 255, 0, 50], 2);
    }
    for (var i = 0; i < 5; i++) {
        stroke(255, 255, 255, utils.randInt(25, 205));
        strokeWeight(1);
        noFill();
        beginShape();
        vertex(0, 0);
        bezierVertex(utils.randInt(-5,5), utils.randInt(-55,-45),
        utils.randInt(45,550), utils.randInt(450,55), 50, 0);
        endShape();
    }
    for (var i = 0; i < 10; i++) {
        //new LineParent([-i*1.5, -30], [-i*1.5, 30], [utils.randInt(0, 255), utils.randInt(0, 255), utils.randInt(0, 255), 0, 100], 2);
    }

    //drawLines([0, 0], [0, 0], 5, [255, 255, 255, 10, 120]);
    /*
    translate(-20, 0);
    drawLines([0, 0], [0, 0], 5, [255, 255, 255, 10, 120]);
    translate(-20, 0);
    drawLines([0, 0], [0, 0], 5, [255, 255, 255, 10, 120]);
    */
    /*
    for (var i = 0; i < 20; i++) {
        console.log(i * 20 - 240)
        new LineParent([(i * 20) - 240, height / 2], [(i * 20) - 240, height / 2 * -1],
            color(255), 2)
        new LineParent([(i * 20) - 241, height / 2], [(i * 20) - 241, height / 2 * -1],
            color(255), 2)
        new LineParent([(i * 20) - 242, height / 2], [(i * 20) - 242, height / 2 * -1],
            color(255), 2)
    }
    */
}

function draw() {
    g.fc = frameCount;
    algos[ALGO].run();

    if (g.fc > 1500) {
        noLoop();
        if (!g.saved) {
            g.saved = true;
            save('test.png');
        }
    }
}

function bezierLength(bezierCurve) {
    var length = 0;
    for (var i = 0; i < bezierCurve.length - 1; i++) {
        length += Math.hypot(bezierCurve[i][0] - bezierCurve[i+1][0], bezierCurve[i][1] - bezierCurve[i+1][1]);
    }
    return length;
}

function sandBezier(bezierCurve, chance, grains, jitter, useColor) {
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

function curveLength(curveArr) {
    var length = 0;
    for (var i = 0; i < curveArr.length - 1; i++) {
        length += Math.hypot(curveArr[i][0] - curveArr[i+1][0], curveArr[i][1] - curveArr[i+1][1]);
    }
    return length;
}

function sandCurve(curveArr, chance) {
    var steps = curveLength(curveArr);
    for (var i = 0; i < steps; i++) {
        if (Math.random() < chance) {
            var t = i / steps;
            var x = curvePoint(curveArr[0][0], curveArr[1][0], curveArr[2][0], curveArr[3][0], t);
            var y = curvePoint(curveArr[0][1], curveArr[1][1], curveArr[2][1], curveArr[3][1], t);
            // colour
            // stroke(utils.randInt(0, 255 - i / steps * 255), utils.randInt(100, i / steps * 255), 255, utils.randInt(0, 70));
            // black
            stroke(0, utils.randInt(0, 255));
            point(x, y);
        }
    }
}

function roads(length) {
    length *= 0.66;
    if (length > 10) {
        for (var i = 0; i < 2; i++) {
            push();
            var flip = Math.random() > 0.5 ? -1 : 1;
            angle = utils.randInt(30, 60);
            rotate((i == 1 ? angle : -angle));
            var end = [length, 0];
            var anchors = [utils.randInt(0, length / 2), utils.randInt(0, length / 2 * flip),
                utils.randInt(length / 2, length), utils.randInt(-length * flip, 0)];
            bezier(0, 0, anchors[0], anchors[1], anchors[2], anchors[3], end[0], end[1]);
            translate(end[0], 0);
            roads(length);
            pop();
        }
    }
}

function sparkler(start, level) {
    stroke(utils.randInt(0, 255), 255, 255, utils.randInt(20, 205));
    var end = [sin(utils.randInt(80, 400)) * 300, 0];
    line(start[0], start[1], );
    rotate(utils.randInt(0, 360));
    if (level > 1) {
        level--;
        sparkler(level);
    }
}

function drawLines(a, b, level, color) {
    new prim.LineParent(a, b, color, 2);
    if (level > 1) {
        level--;
        var flip = level % 2 ? -1 : 1;
        drawLines(b, [b[0] * flip + utils.randInt(18, 20), b[1] - 60 * flip * -1], level, color);
        drawLines(b, [b[0] * flip * utils.randInt(2, 4), b[1] + 60 * flip * -1], level, color);
        drawLines(b, [b[0] * flip + utils.randInt(18, 20), b[1] + 60 * flip * -1], level, color);
        drawLines(b, [b[0] * flip * utils.randInt(2, 4), b[1] - 60 * flip * -1], level, color);
    }
}