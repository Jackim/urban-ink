let sketch = function(p) {
    
    let particles = [];
    let seed = 3023;
    let count = 1;
    let particle_count;
    let grid = [];
    var drawCurve;
    let circleList = [];
    let numColours = 10;

    p.setup = function() {

        p.colorMode(p.HSB, 360, 100, 100, 1);
        p.createCanvas(p.windowWidth, p.windowHeight);

        //seed = p.floor(p.random(4000));
        console.log(seed);

        p.randomSeed(seed);
        p.noiseSeed(seed);
        p.noStroke();

        p.background(28, 4, 91, 1); // background color
        //p.stroke(28, 50, 12, 1); // line/circle color
        //p.blendMode(p.MULTIPLY);

        // make grid
        let left_x = p.int(p.windowWidth * -0.5);
        let right_x = p.int(p.windowWidth * 2);
        let top_y = p.int(p.windowHeight * -0.5);
        let bottom_y = p.int(p.windowHeight * 2);

        let resolution = p.int(p.windowWidth * 0.01);
        console.log(resolution);

        let num_columns = p.int((right_x - left_x) / resolution);
        let num_rows = p.int((bottom_y - top_y) / resolution);

        for (var col = 0; col < num_columns; col++) {
            grid[col] = []
            for (var row = 0; row < num_rows; row++) {
                grid[col][row] = p.map(p.noise(row * 0.01, col * 0.01), 0.0, 1.0, 0.0, p.TWO_PI); // determine angle at grid location
            }
        }

        function drawGrid() {
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

        function createColours(n) {
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

        let colors = createColours(numColours);

        //p.strokeWeight(1);

        //p.stroke(colors[0]);
        p.fill(colors[0]);

        let colorNum = 0;

        function noCollision(x0, y0, di0) {
            x0 = p.int(x0);
            y0 = p.int(y0);
            for (circ in circleList) {
                if (p.collideCircleCircle(x0, y0, di0, circleList[circ].x, circleList[circ].y, circleList[circ].di)) {
                    return false;
                }
            }
            return true;
        }

        drawCurve = function() {
            
            let x = p.int(p.map(p.random(), 0.0, 1.0, 0.0, p.windowWidth));
            let y = p.int(p.map(p.random(), 0.0, 1.0, 0.0, p.windowHeight));

            for (var n = 0; n < 100; n++) {

                if (p.random() < 0.1) {
                    colorNum++;

                    if (colorNum >= colors.length) {
                        colorNum = 0;
                    }

                    //p.stroke(colors[colorNum]);
                    p.fill(colors[colorNum]);
                }

                let x_offset = x - left_x;
                let y_offset = y - top_y;

                column_index = p.int(x_offset / resolution);
                row_index = p.int(y_offset / resolution);

                // drawing as points
                //p.point(x, y); // draw the point

                // darwing as circles
                //console.log(isCollision(x, y));
                if (grid[column_index] && grid[column_index][row_index]) {
                    //colurNum = p.int(p.map(grid[column_index][row_index], 0.0, p.TWO_PI, 0, numColours-1));
                    p.fill(colors[colorNum]);
                    //p.stroke(colors[colorNum]);
                }
                var di = p.randomGaussian(5, 3);
                if (noCollision(x, y, di)) {
                    p.ellipse(x, y, di, di);
                    circleList.push({x: p.int(x), y: p.int(y), di: di});
                }

                if (column_index > -1 && row_index > -1) {
                    grid_angle = grid[column_index][row_index];

                    var step = p.randomGaussian(di, 2);

                    x_step = step * p.cos(grid_angle);
                    y_step = step * p.sin(grid_angle);

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
        if (counter == 1000) {
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

    class Particle {

        constructor(x, y, angle, colour, index) {
        }

        update() {
        }

        display() {
        }
    }
}
new p5(sketch);