function setup() {
    createCanvas(720, 400);
    randomSeed(1);
    noiseSeed(1);
    noLoop();
    colorMode(HSB, 100);
    stroke(0, 0, 2, 25);
}

function createVectorField() {
    var vectorField = [];
    for (var i = 0; i < 30; i++) {
        vectorField.push([]);
        for (var j = 0; j < 30; j++) {
            //var x = - lerp(random(0, i), cos(i) * 2, random() + i);
            // var y = lerp(cos(j) * sin(j), j * 2, cos(j));
            var x = i + cos(i);
            var y = j + (min(cos(i), cos(i)));
            vectorField[i].push(createVector(x, y));
            line(i * 15, j * 15, x * 15, y * 15);
        }
    }
    return vectorField;
}

function draw() {
    background(0, 0, 98, 100);
    var vectorField = createVectorField();
    
}
  