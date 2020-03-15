let sketch = function(p) {
    
    let particles = [];
    let seed = 1;
    let count = 1;
    let particle_count;
    let grid = [];

    p.setup = function() {

        p.colorMode(p.HSB, 360, 100, 100, 1);
        p.createCanvas(p.windowWidth, p.windowHeight);

        //seed = p.floor(p.random(4000));
        console.log(seed);

        p.randomSeed(seed);
        p.noiseSeed(seed);

        p.background(28, 4, 91); // background color
        p.stroke(28, 50, 12, 1); // line/circle color

        p.noLoop();

        // make grid
        let left_x = p.int(p.windowWidth * -0.5);
        let right_x = p.int(p.windowWidth * 1.5);
        let top_y = p.int(p.windowHeight * -0.5);
        let bottom_y = p.int(p.windowHeight * 1.5);

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
            let initialColour = [p.random(0, 360) + p.randomGaussian(30, 30) % 360, p.randomGaussian(20, 25), p.randomGaussian(40, 25), p.randomGaussian(0.25, 0.25)];
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
                initialColour[3] += p.random(0, 0.25) % 1;
                colours.push(p.color(initialColour[0], initialColour[1], initialColour[2], initialColour[3]));
            }
            return colours;
        }

        let colors = createColours(10);

        p.strokeWeight(1);

        console.log(grid.length);
        console.log(grid[0].length);

        p.stroke(colors[0]);

        let colorNum = 0;

        function drawCurve() {
            
            let x = p.int(p.map(p.random(), 0.0, 1.0, 0.0, 1400.0));
            let y = p.int(p.map(p.random(), 0.0, 1.0, 0.0, 120.0 * 7));

            for (var n = 0; n < 1000; n++) {
                if (p.random() < 0.1) {
                    colorNum++;
                    if (colorNum >= colors.length) {
                        colorNum = 0;
                    }
                    p.stroke(colors[colorNum]);
                }
                p.point(x, y); // draw the point

                let x_offset = x - left_x;
                let y_offset = y - top_y;

                column_index = p.int(x_offset / resolution);
                row_index = p.int(y_offset / resolution);

                if (column_index > -1 && row_index > -1) {
                    grid_angle = grid[column_index][row_index];

                    x_step = 0.2 * p.cos(grid_angle);
                    y_step = 0.2 * p.sin(grid_angle);

                    x = x + x_step;
                    y = y + y_step;
                } else {
                    break;
                }
            }
        }

        for (var i = 0; i < 1000; i++) {
            drawCurve();
        }
        
    }

    p.draw = function() {

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