// TURTLE STUFF:
var x, y; // the current position of the turtle
var currentangle = 0; // which way the turtle is pointing
var step = 40; // how much the turtle moves with each 'F'
var angle = 90; // how much the turtle turns with a '-' or '+'

// LINDENMAYER STUFF (L-SYSTEMS)
var thestring = 'A'; // "axiom" or start of the string
var numloops = 5; // how many iterations to pre-compute
var therules = []; // array for rules
therules[0] = ['A', '-BF+AFA+FB-']; // first rule
therules[1] = ['B', '+AF-BFB-FA+']; // second rule

var whereinstring = 0; // where in the L-system are we?

function setup() {
  createCanvas(710, 400);
  background(255, 100, 100);
  stroke(0, 0, 0, 255);
  
  // start the x and y position at lower-left corner
  x = 0;
  y = height-1;
  
  // COMPUTE THE L-SYSTEM
  for (var i = 0; i < numloops; i++) {
    thestring = lindenmayer(thestring, false);
  }
}

function draw() {
  
  // draw the current character in the string:
  drawIt(thestring[whereinstring], false); 
  //drawIt(thestring[whereinstring], true); 
  whereinstring++;
  // increment the point for where we're reading the string.
  // wrap around at the end.
  
  if (whereinstring > thestring.length-1) whereinstring = 0;

}

// interpret an L-system
function lindenmayer(s, yup) {
  var outputstring = ''; // start a blank output string
  
  // iterate through 'therules' looking for symbol matches:
  for (var i = 0; i < s.length; i++) {
    var ismatch = 0; // by default, no match
    for (var j = 0; j < therules.length; j++) {
      if (s[i] == therules[j][0])  {
        outputstring += therules[j][1]; // write substitution
        ismatch = 1; // we have a match, so don't copy over symbol
        break; // get outta this for() loop
      }
    }
    // if nothing matches, just copy the symbol over.
    if (ismatch == 0) outputstring+= s[i]; 
  }
  
  return outputstring; // send out the modified string
}

// this is a custom function that draws turtle commands
function drawIt(k, yup) {

  if (k=='F') { // draw forward
    // polar to cartesian based on step and currentangle:
    var x1 = x + step*cos(radians(currentangle+0));
    var y1 = y + step*sin(radians(currentangle));
    //line(x, y, x1, y1); // connect the old and the new

    // update the turtle's position:
    x = x1;
    y = y1;
  } else if (k == '+') {
    currentangle += angle; // turn left
  } else if (k == '-') {
    currentangle -= angle; // turn right   
  }

  // give me some random color values:
  var r = random(0, 255);
  var g = random(254, 255);
  var b = random(0, 255);
  var a = random(50, 100);

  // pick a gaussian (D&D) distribution for the radius:
  var radius = 0;
  radius += random(0, 40);
  radius += random(0, 40);
  radius += random(0, 40);
  radius = radius/3;
  
  // draw the stuff:
  push();
  fill(r, g, b, a);
  blendMode(SCREEN);
  stroke(0, random(0, 70));
  //rect(x, y, radius, radius);
  pop();

  if (yup) {
      r = 255;
  }

  push();
  fill(r, g, b, a);
  blendMode(SCREEN);
  stroke(0, 255, 255, random(0, 70));
  //rect(x, y, radius, radius);
  rotate(radians(random(0, 5)));
  line(x, y, x - 50, y - 50);
  pop();
}