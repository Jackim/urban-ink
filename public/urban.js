function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 100);
    noLoop();
    randomSeed(1);
    noiseSeed(1);
}

function gaussianRand() {
    var rand = 0;
    var factor = 6;
  
    for (var i = 0; i < factor; i++) {
      rand += Math.random();
    }
  
    return rand / factor;
}

function jitter() {
    return (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.5;
}

function sandLine(x1, y1, x2, y2, steps, chance, colorArr) {
    for (var i = 0; i < steps; i++) {
        if (random() < chance) {
            var t  = i / steps;
            var x = lerp(x1, x2, t) + jitter();
            var y = lerp(y1, y2, t) + jitter();
            var v = i - (steps / 2);
            stroke(colorArr[0], colorArr[1], colorArr[2], random(0, (0.5 * tan(i * 4) * i / steps) * 70));
            //stroke(0, 0, 5, random(0, sq(i - (steps / 2)) / steps * 2));
            point(x, y);
        }
    }
}

function sandRect(x, y, width, height, colorArr) {
    for (var i = x; i < x + width; i++) {
        sandLine(i, y, i, y + height, height * 5, 0.6, colorArr);
    }
}

function sandTri(x, y, width, height, xpoint, colorArr) {
    for (var i = x; i < x + width; i++) {
        sandLine(i, y, xpoint, y - height, height * 5, 0.6, colorArr);
    }
} 

function createBuilding(startx, starty) {
    var currentHeight = 0;

    function spire(x, y, height) {
        push();
        fill(0, 0, 5);
        var width = height / 10;
        sandTri(x, y, width, height, random() < 0.5 ? x : x + width);
        pop();
    }

    function grid(x, y, height, width, cols, rows, thickness) {
        var colorArr = [0, 50, 55];
        push()
        // draw columns
        for (var i = 0; i < cols + 1; i++) {
            var interval = width / cols;
            
            fill(0, 0, 5);
            sandRect(x + (i * interval), y - height, thickness, height + thickness, colorArr);
        }
        // draw rows
        for (var i = 0; i < rows + 1; i++) {
            var interval = height / rows;
            fill(0, 0, 5);
            sandRect(x, y - (i * interval), width, thickness, colorArr);
        }
        pop();
    }

    function tower(x, y, width, height) {
        push();
        fill(0, 0, 95);
        sandRect(x, y - height, width, height, [90, 45, 95]);
        sandRect(x, y - height, width, height, [0, 40, 95]);
        sandRect(x, y - height, width, height, [10, 35, 95]);
        sandRect(x, y - height, width, height, [20, 30, 95]);
        sandRect(x, y - height, width, height, [0, 0, 15]);
        //sandTri(x, y - height, width, height / 7, random() < 0.5 ? x : x + width);
        pop();
    }

    tower(startx-100, 0, 200, 200);
}

function draw() {
    translate(windowWidth / 2, windowHeight);
    //scale(2);
    background(0, 0, 5);
    createBuilding(0, 0);
    stroke(0, 0, 0);
}