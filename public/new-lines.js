function setup() {
    createCanvas(720, 400);
    stroke(255);
    noFill();
    frameRate(30);
    colorMode(HSB, 100);
}

function Curve(points) {
    this.points = points;
    this.dots = [];
}

function BCurve(points) {
    this.points = points;
    this.dots = [];
}

function getLengthOfCurve(cur) {
    var points = cur.points;
    var length = 0;
    for (var i = 0; i < 1; i = i + 0.05) {
        var x1 = curvePoint(points[0], points[2], points[4], points[6], i);
        var y1 = curvePoint(points[1], points[3], points[5], points[7], i);
        var x2 = curvePoint(points[0], points[2], points[4], points[6], i + 0.05);
        var y2 = curvePoint(points[1], points[3], points[5], points[7], i + 0.05);
        var segment = sqrt(sq(x2 - x1) + sq(y2 - y1));
        length = length + segment;
    }
    return round(length);
}

function checkForCircle(x, y) {
    for (var i = 0; i < 360; i = i + 45) {
        var cx = x + 4.25 * cos(i);
        var cy = y + 4.25 * sin(i);
        var pixel = get(cx, cy);
        if (pixel[0] != 0 || pixel[1] != 0 || pixel[2] != 0) {
            return true;
        }
    }
    return false;
}

function polygon(x, y, radius, npoints, jitter, c) {
    let angle = TWO_PI / npoints;
    push()
    noStroke();
    fill(c);
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius + (jitter * random());
      let sy = y + sin(a) * radius + (jitter * random());
      vertex(sx, sy);
    }
    endShape(CLOSE);
    pop();
  }
  

function Dot(x, y, c) {
    this.x = x;
    this.y = y;
    this.color = c;
    polygon(x, y, 5, 11, 1, this.color);
}

function drawBDots(bcur, colors) {
    // evenly space dots along a curve
    var points = bcur.points;
    var i = 0;
    var lastx = bezierPoint(points[0], points[2], points[4], points[6], 0);
    var lasty = bezierPoint(points[1], points[3], points[5], points[7], 0);
    var j = 0;
    var streak = 0;
    while (i < 1) {
        var newx = bezierPoint(points[0], points[2], points[4], points[6], i);
        var newy = bezierPoint(points[1], points[3], points[5], points[7], i);
        var distance = sqrt(sq(newx - lastx) + sq(newy - lasty));
        if (distance > 11) {
            if (random() > (0.9 - (streak * 0.001))) {
                j++;
                if (j == colors.length) {
                    j = 0;
                }
            } else {
                streak++;
            }
            if (!checkForCircle(newx, newy)) {
                new Dot(newx, newy, colors[j]);
            } else {
                i = i + 0.001;
                continue;
            }
            lastx = newx;
            lasty = newy;
        }
        i = i + 0.001;
    }
}

function drawDots(cur, colors) {
    // evenly space dots along a curve
    var points = cur.points;
    var i = 0;
    var lastx = curvePoint(points[0], points[2], points[4], points[6], 0);
    var lasty = curvePoint(points[1], points[3], points[5], points[7], 0);
    var j = 0;
    var streak = 0;
    while (i < 1) {
        var newx = curvePoint(points[0], points[2], points[4], points[6], i);
        var newy = curvePoint(points[1], points[3], points[5], points[7], i);
        var distance = sqrt(sq(newx - lastx) + sq(newy - lasty));
        if (distance > 12) {
            if (random() > (0.9 - (streak * 0.001))) {
                j++;
                if (j == colors.length) {
                    j = 0;
                }
            } else {
                streak++;
            }
            //if (!checkForCircle(newx, newy)) {
                new Dot(newx, newy, colors[j]);
            //}
            lastx = newx;
            lasty = newy;
        }
        i = i + 0.001;
    }
}

function createLines() {
    var colorArr = [color(95, 70, 61), color(0, 78, 82), color(11, 77, 92), color(0, 0, 90)];
    var curves = [];
    var bcurves = [];
    // curve: x control 1, y control 1, x1, y1, x2, y2, x control 2, y control 2
    //curves.push(new Curve([100, 400, 100, 100, 500, 100, 400, 400]));
    //curves.push(new Curve([100, 400, 100, 115, 500, 100, 415, 300]));
    
    //bcurves.push(new BCurve([100, 100, 100, 0, 400, 0, 400, 100]));
    for (var i = 0; i < 20; i++) {
        bcurves.push(new BCurve([100, 100 + (i * 10), 100, 100, 400, 0, 600, 100 + (i * 15)]))
    }
    
    for (var i = 0; i < bcurves.length; i++) {
        //drawDots(curves[i], colorArr);
        drawBDots(bcurves[i], colorArr);
    }
}
function draw() {
    noLoop();
    background(0);
    
    createLines();
}  