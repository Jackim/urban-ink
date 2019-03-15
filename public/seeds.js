function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 100);
    noLoop();
    randomSeed(1);
    noiseSeed(1);
}

function seeds(seedCount) {

    function expandSeed(num) {
        var seed = seedLocations[num];
        var collide = false;
        var coords = {
            x1: seed.x1 - 1,
            y1: seed.y1 - 1,
            x4: seed.x4 + 1,
            y4: seed.y4 + 1
        };
        for (var i in seedLocations) {
            var comp = seedLocations[i];
            if (seedLocations[i] != seed && seedLocations[i].expand) {
                if ((coords.x1 <= comp.x1 && coords.y1 <= comp.y1) || (coords.x4 >= comp.x4 && coords.y4 >= comp.y4)) {
                    if ((coords.x1 <= 0 && coords.y1) <= 0 || (coords.x4 >= windowWidth || coords.y4 >= windowHeight)) {
                        push();
                        stroke(50, 50, 50, 75);
                        fill(50, 50, 50, 75);
                        line(coords.x1, coords.y1, coords.x4, coords.y4);
                        pop();
                        seedLocations[num].expand = false;
                        break;
                    }
                }
            }
        }
        if (!collide) {
            seedLocations[num].x1 = coords.x1;
            seedLocations[num].y1 = coords.y1;
            seedLocations[num].x4 = coords.x4;
            seedLocations[num].y4 = coords.y4;
        }
    }

    push();
    stroke(0, 0, 0);
    noFill();
    var seedLocations = [];
    for (var i = 0; i < seedCount; i++) {
        var x = round(random(0, windowWidth));
        var y = round(random(0, windowHeight));
        seedLocations.push({x1: x, y1: y, x2: x, y2: x, x3: x, y3: y, x4: x, y4: y, expand: true});
        ellipse(x, y, 5, 5);
    }
    pop();

    for (var j = 0; j < 100; j++) {
        for (var i in seedLocations) {
            expandSeed(i);
        }
    }

    for (var i in seedLocations) {
        push();
        fill(0, 0, 0, 50);
        rect(seedLocations[i].x1, seedLocations[i].y1, seedLocations[i].x4, seedLocations[i].y4);
        pop();
    }
}

function draw() {
    background(0, 0, 100);
    stroke(0, 0, 0);
    seeds(5);
}