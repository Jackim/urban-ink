const utils = require('../public/utils/index.js');
const prim = require('../public/primitives/index.js');

var xPos;

function setup() {
    createCanvas(640, 480);
    angleMode(DEGREES);
    noLoop();
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
    background(50, 50, 50);
    translate(width / 2, height / 2);
    noFill();
    for (var i = 0; i < 5; i++) {
        stroke(50);
        roads(150);
        push();
        rotate(180);
        roads(150);
        pop();
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
            //curve(anchors[0], anchors[1], 0, 0, end[0], end[1], anchors[2], anchors[3]);
            bezier(0, 0, anchors[0], anchors[1], anchors[2], anchors[3], end[0], end[1]);
            var angle1 = atan(-anchors[1]/anchors[0]);
            var angle2 = atan((anchors[3])-anchors[1]/(anchors[2]-anchors[0]));
            var angle3 = atan((end[1]-anchors[3])/(end[0]-anchors[2]));
            new prim.LineParent([0, 0], [anchors[0], anchors[1]], [255, 255, 255, 20, 205], 1);
            new prim.LineParent([anchors[0], anchors[1]], [anchors[2], anchors[3]], [255, 255, 255, 20, 205], 1);
            new prim.LineParent([anchors[2], anchors[3]] [end[0], end[1]], [255, 255, 255, 20, 205], 1);
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