module.exports = {
    Shape: class {
        constructor(points, color, fill, stroke) {
            this.points = points;
            this.color = color;
            this.fill = fill;
            this.stroke = stroke;
            this.makeShape();
        }

        makeShape() {
            push();
            this.fill ? fill(this.color) : noFill();
            this.stroke ? stroke(this.color) : noStroke();
            beginShape();
            for (var i = 0; i < this.points.length; i++) {
                if (this.points[i].curve) {
                    curveVertex(this.points[i].x, this.points[i].y);
                } else {
                    vertex(this.points[i].x, this.points[i].y);
                }
            }
            endShape();
            pop();
        }
    },
    LineSegment: class {
        constructor(x, y, color, angle, parent) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.angle = angle;
            this.parent = parent;
            this.drawLine();
        }
    
        drawLine() {
            push();
            translate(this.x, this.y)
            this.angle += utils.jitter();
            rotate(this.angle);
            stroke(this.color);
            line(0, 0, this.parent.segmentSize, 0);
            pop();
        }
    },
    AngleLineSegment: class {
        constructor(start, color, angle, parent) {
            this.start = start;
            this.color = color;
            this.angle = angle;
            this.drawLine();
        }
    
        drawLine() {
            push();
            translate(this.start[0], this.start[y]);
            this.angle += utils.jitter();
            rotate(this.angle)
            stroke(this.color);
            line(0, 0, this.parent.segmentSize, 0);
            pop();
        }
    },  
    AngleParent: class {
        constructor(start, angle, length, color, segmentSize) {
            this.start = start;
            this.angle = angle;
            this.length = length;
            this.color = color;
            this.segmentSize = segmentSize;
            this.segments = [];
            this.makeLines();
        }
    
        makeLines() {
            var numSegments = this.length / this.segmentSize;
            var start = this.start;
            for (var i = 0; i < numSegments; i++) {
                this.segments.push(new module.exports.AngleLineSegment(start, this.color, this.angle, this));
                start = [this.segmentSize / length * delta]
            }
        }
    },
    LineParent: class {
        constructor(a, b, color, segmentSize) {
            this.a = a;
            this.b = b;
            this.color = color;
            this.segmentSize = segmentSize;
            this.segments = [];
            this.makeLines();
        }
    
        makeLines() {
            var deltaX = this.b[0] - this.a[0];
            var deltaY = this.b[1] - this.a[1];
            var theta = atan2(deltaY, deltaX);
            var length = Math.hypot(deltaX, deltaY);
            var numSegments = length / this.segmentSize;
            var start = this.a;
            for (var i = 0; i < numSegments + 1; i++) {
                this.segments.push(new module.exports.LineSegment(start[0], start[1],
                    color(this.color[0], this.color[1], this.color[2],
                        utils.randInt(this.color[3], this.color[4])), theta, this));
                start = [this.segmentSize / length * deltaX + start[0],
                this.segmentSize / length * deltaY + start[1]];
            }
        }
    }
}