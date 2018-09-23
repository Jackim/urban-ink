const utils = require('../public/utils/index.js');
const prim = require('../public/primitives/index.js');

var xPos = 0;
var a = 0;
var points;
var seed;
var seed2;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    background(20);
    //noLoop();
    frameRate(120);
    points = {
        a: [-width/3, -height/3], // control 1
        b: [-width/2, 0], // anchor 1
        c: [width/2, 0], // anchor 2
        d: [width/3, -height/3] //control 2
    };
    seed = utils.randInt(-height/2,height/2);
    seed = 24;
    seed2 = 2.4;
    console.log(seed);
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
    stroke(255)
    translate(width / 2, height / 2);
    noFill();
    push();
    seed += Math.round(utils.jitter());
    seed2 += Math.round(utils.jitter());
    points = {
        a: [a * tan(a) + seed, a * cos(a) + seed],
        b: [a * cos(a) + seed, a * sin(a) + seed],
        c: [a * tan(a) - seed, a * cos(a) - seed],
        d: [a * cos(a) - seed, a * sin(a) - seed]
    };
    points2 = {
        a: [a * tan(a) + seed2, a * cos(a) + seed2],
        b: [a * cos(a) + seed2, a * sin(a) + seed2],
        c: [a * tan(a) - seed2, a * cos(a) - seed2],
        d: [a * cos(a) - seed2, a * sin(a) - seed2]
    };
    points3 = {
        a: [a * tan(a) / seed2, a * cos(a) / seed2],
        b: [a * cos(a) / seed2, a * sin(a) / seed2],
        c: [a * tan(a) / seed2, a * cos(a) / seed2],
        d: [a * cos(a) / seed2, a * sin(a) / seed2]
    };
    points4 = {
        a: [a * tan(a) / seed, a * cos(a) / seed],
        b: [a * cos(a) / seed, a * sin(a) / seed],
        c: [a * tan(a) / seed, a * cos(a) / seed],
        d: [a * cos(a) / seed, a * sin(a) / seed]
    };
    //sandBezier([points.a, points.b, points.c, points.d], 0.15, 5000, false, false);
    //sandBezier([points.a, points.b, points.c, points.d], 0.15, 2500, false, false);
    
    //sandBezier([points2.a, points2.c, points2.b, points2.d], 0.1, 5000, false, true);
    //sandBezier([points3.a, points3.c, points3.b, points3.d], 0.1, 2500, false, false);
    sandBezier([points4.a, points.b, points.c, points3.d], 0.15, 2500, false, false);
    rotate(180);
    sandBezier([points4.a, points.b, points.c, points3.d], 0.15, 2500, false, false);
    push()
    scale(-1,1);
    //sandBezier([points.a, points.b, points.c, points.d], 0.15, 5000, false, false);
    sandBezier([points4.a, points.b, points.c, points3.d], 0.15, 2500, false, true);
    rotate(180);
    sandBezier([points4.a, points.b, points.c, points3.d], 0.15, 2500, false, true);
    
    //sandBezier([points2.a, points2.c, points2.b, points2.d], 0.1, 5000, false, true);
    //sandBezier([points3.a, points3.c, points3.b, points3.d], 0.1, 2500, false, false);
    pop();
    a++;
    xPos++;
    if (xPos > 1500) {
        noLoop();
    }
}

function bezierLength(bezierCurve) {
    var length = 0;
    for (var i = 0; i < bezierCurve.length - 1; i++) {
        length += Math.hypot(bezierCurve[i][0] - bezierCurve[i+1][0], bezierCurve[i][1] - bezierCurve[i+1][1]);
    }
    console.log(length);
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
            point(x, y);
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