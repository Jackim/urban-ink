const Quadtree = require('@timohausmann/quadtree-js');

let sketch = function(p) {
    
    let particles = [];
    let seed = 2946;
    let count = 1;
    let particle_count;
    let grid = [];
    var drawCurve;
    let circleList = [];
    let numColours = 10;
    let colors;

    let tree;

    let colorFunc;

    let gridFunc;

    p.setup = function() {

        colorFunc = function(n, black) {
            let colours = [];

            let initialColour = [
                p.random(0, 360) + p.randomGaussian(30, 30) % 360,
                p.randomGaussian(20, 25),
                //p.randomGaussian(60, 25),
                90,
                1
            ];

            for (var i = 0; i < n; i++) {
                let multiplier = p.random() > 0.5 ? 1 : -1;
                initialColour[0] += p.randomGaussian(10, 10) * multiplier % 360;
                
                // saturation
                if (initialColour[1] > 40) {
                    initialColour[1] -= 10;
                } else if (initialColour[1] < 10) {
                    initialColour[1] += 10;
                } else {
                    initialColour[1] += p.randomGaussian(15, 10) * multiplier % 100;
                }

                if (black) {
                    initialColour[1] = 0;
                }
                
                // brightness
                if (initialColour[2] > 50) {
                    initialColour[2] -= 10;
                } else if (initialColour[2] < 30) {
                    initialColour[2] += 10;
                } else {
                    initialColour[2] += p.randomGaussian(15, 10) * multiplier % 100;
                }

                //initialColour[3] += p.random(0, 0.25) % 1;
                
                colours.push(
                    p.color(initialColour[0], initialColour[1], initialColour[2], initialColour[3])
                );
            }
            return colours;
        }

        tree = new Quadtree({
            x: 0,
            y: 0,
            width: p.windowWidth,
            height: p.windowHeight
        }, 10, 4);

        p.frameRate(500);

        p.colorMode(p.HSB, 360, 100, 100, 1);
        p.createCanvas(p.windowWidth, p.windowHeight);

        //seed = p.floor(p.random(4000));
        console.log(seed);

        p.randomSeed(seed);
        p.noiseSeed(seed);
        p.noStroke();

        p.background(28, 4, 91, 1); // background color

        // make grid
        let left_x = p.int(p.windowWidth * -0.5);
        let right_x = p.int(p.windowWidth * 1.5) + 100;
        let top_y = p.int(p.windowHeight * -0.5);
        let bottom_y = p.int(p.windowHeight * 1.5) + 100;

        let resolution = p.int(p.windowWidth * 0.01);

        let num_columns = p.int((right_x - left_x) / resolution);
        let num_rows = p.int((bottom_y - top_y) / resolution);

        gridFunc = function(round) {
            for (var col = 0; col < num_columns; col++) {
                grid[col] = []
                for (var row = 0; row < num_rows; row++) {
                    var val = p.map(p.noise(row * 0.01, col * 0.01), 0.0, 1.0, 0.0, p.TWO_PI); // determine angle at grid location
                    if (round) {
                        val = p.round(val, round);
                    }
                    grid[col][row] = val; 
                }
            }
        }

        gridFunc();

        function drawGrid() {
            // visualize the grid
            for (var col = 0; col < grid.length; col++) {
                for (var row = 0; row < grid[col].length; row++) {
                    p.line(
                        row * 10, // x1
                        col * 10, // y1
                        row * 10 + 10 * p.cos(grid[col][row]), // x2
                        col * 10 + 10 * p.sin(grid[col][row]) // y2
                    );
                }
            }
        }

        colors = colorFunc(numColours, true);

        p.fill(colors[0]);

        let colorNum = 0;

        function noCollision(x0, y0, di0, collisions) {
            x0 = p.int(x0);
            y0 = p.int(y0);
            for (circ in collisions) {
                if (p.collideCircleCircle(x0, y0, di0, collisions[circ].x, collisions[circ].y, collisions[circ].width)) {
                    return false;
                }
            }
            return true;
        }

        drawCurve = function() {
            
            // start x and y of each curve
            let x = p.int(p.map(p.random(), 0.0, 1.0, 0.0, p.windowWidth));
            let y = p.int(p.map(p.random(), 0.0, 1.0, 0.0, p.windowHeight));

            for (var n = 0; n < 200; n++) {

                let x_offset = x - left_x;
                let y_offset = y - top_y;

                column_index = p.int(x_offset / resolution);
                row_index = p.int(y_offset / resolution);

                // drawing as circles
                if (grid[column_index] && grid[column_index][row_index]) {
                    colorNum = p.int(p.map(grid[column_index][row_index] + p.randomGaussian(0, 0.2), 0.0, p.TWO_PI, 0, numColours - 1), true);
                    p.fill(colors[colorNum]);
                }

                var di = p.randomGaussian(8, 5); // diamater
                if (di > 9) {
                    di = 9; // diameter cap
                }

                var collisions = tree.retrieve({
                    x: x,
                    y: y,
                    width: di,
                    height: di
                }); // add to quadtree


                // collision checking
                if (collisions.length > 0) {
                    if (noCollision(x, y, di, collisions)) {
                        p.ellipse(x, y, di, di);
                        tree.insert({
                            x: x, 
                            y: y,
                            width: di,
                            height: di
                        });
                    }
                } else {
                    p.ellipse(x, y, di, di);
                    tree.insert({
                        x: x, 
                        y: y,
                        width: di,
                        height: di
                    });
                }

                // continue moving if still in bounds, else stop the line
                if (column_index > -1 && row_index > -1) {
                    grid_angle = grid[column_index][row_index];

                    var step = p.randomGaussian(di, 2);

                    x_step = (step + 2) * p.cos(grid_angle);
                    y_step = (step + 2) * p.sin(grid_angle);

                    x = x + x_step;
                    y = y + y_step;
                } else {
                    break;
                }
            }
        }
    }

    let counter = 0;

    p.draw = function() {
        drawCurve();
        counter++;
        if (counter == 250) {
            console.log("done");
            p.noLoop();
        }
    }

    p.keyPressed = function() {
        if (p.keyCode === p.ENTER) {
            p.saveCanvas('sketch_' + seed + '-' + count, 'jpeg');
            count++;
        } else if (p.keyCode === p.LEFT_ARROW) {
            p.noLoop();
        } else if (p.keyCode === p.RIGHT_ARROW) {
            p.loop();
        }
    }
}
new p5(sketch);