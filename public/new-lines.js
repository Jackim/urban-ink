
function setup() {
    createCanvas(windowWidth, windowHeight);
    stroke(255);
    noFill();
    frameRate(30);
    colorMode(HSB, 100);
    randomSeed(1);
    noiseSeed(1);
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
            if (random() > (0.92 - (streak * 0.001))) {
                j++;
                if (j == colors.length) {
                    j = 0;
                }
                streak = 0;
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

function drawBLines(cur) {
    push();
    stroke(0, 0, 100);
    bezier(cur.points[0], cur.points[1], cur.points[2], cur.points[3], cur.points[4], cur.points[5], cur.points[6], cur.points[7]);
    pop();
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
            if (random() > (0.98 - (streak * 0.001))) {
                j++;
                if (j == colors.length) {
                    j = 0;
                }
            } else {
                streak++;
            }
            if (!checkForCircle(newx, newy)) {
                new Dot(newx, newy, colors[j]);
            }
            lastx = newx;
            lasty = newy;
        }
        i = i + 0.001;
    }
}

function createLines() {
    var colorArr = [color(95, 70, 61), color(0, 78, 82), color(11, 77, 92), color(0, 0, 90)];

    var vectors = [];
    
    // generate vector field
    var counter = 0;
    for (var i = 0; i < windowWidth; i++) {
        vectors.push([]);
        for (var j = 0; j < windowHeight; j++) {
            var x = i - 200;
            var y = cos(sin(j - 200));
            var vec = createVector(x, y);
            vec.setMag(15);
            if (i % 15 == 0 && j % 15 == 0) {
                stroke(0, 0, 100, 50);
                line(i, j, (x + i) * 1.05, (y + j) * 1.05);
            }
            
            
            vectors[counter].push(vec);
        }
        counter++;
    }

    var colors = [color(95, 70, 61), color(0, 78, 82), color(11, 77, 92), color(0, 0, 90)];
    var color_counter = 0;

    function drawOnLine(start, end) {
        var distance = sqrt(sq(end.x - start.x) + sq(end.y - start.y));
        if (distance < 20) {
            end.setMag(20);
        }
        var newx, newy;
        var streak = 0;
        color_counter = 0;
        var i = 0.001;
        
        while (i < 1) {
            var newVec = p5.Vector.lerp(start, end, i);
            newVec.set(round(newVec.x), round(newVec.y));
            newx = newVec.x;
            newy = newVec.y;
            if (newx < 0 || newx >= windowWidth || newy < 0 || newy >= windowHeight) {
                return false;
            }
            distance = sqrt(sq(newx - start.x) + sq(newy - start.y));
            if (distance > 12) {
                if (random() > (0.95 - (streak * 0.001))) {
                    color_counter++;
                    if (color_counter == colors.length) {
                        color_counter = 0;
                    }
                    streak = 0;
                } else {
                    streak++;
                }
                if (!checkForCircle(newx, newy)) {
                    new Dot(newx, newy, colors[color_counter]);
                    console.log('dot added at: ' + newx + ', ' + newy);
                }
                start.set(newx, newy);
            }
            i = i + 0.001;
        }

        if (newx < 0 || newx >= windowWidth || newy < 0 || newy >= windowHeight) {
            return false;
        }

        var target = {
            x: vectors[newx][newy].x,
            y: vectors[newx][newy].y
        };
        drawOnLine(createVector(newx, newy), createVector(target.x, target.y));
    }

    function traverseField(x, y) {
        drawOnLine(createVector(x, y), vectors[x][y]);
    }

    // left
    for (var i = 0; i < windowHeight; i++) {
       traverseField(0, i);
    }

    // top
    for (var i = 0; i < windowWidth; i++) {
       traverseField(i, 0);
    }

    // right
    for (var i = 0; i < windowHeight; i++) {
       traverseField(windowWidth - 1, i);
    }

    // bottom
    for (var i = 0; i < windowWidth; i++) {
       traverseField(i, windowHeight - 1);
    }
}

function calcVec(x, y) {
    return new p5.Vector(y - x, -x - y);
}

function calc(x, y, len, angle) {
    var x2 = x + (len * cos(angle));
    var y2 = y + (len * sin(angle));
    return {x: x2, y: y2};
}

function draw() {
    noLoop();
    background(0);
    createLines();
}  