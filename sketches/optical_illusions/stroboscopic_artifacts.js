
let angle = 0;
let colorp1, colorp2, colorp3;
let rotation_angle;
function setup() {
  createCanvas(500, 500);
  frameRate(60);
  ellipseMode(CENTER);
  rotation_angle = createP().position(25, 5);
  slider = createSlider(0, 360, 0, 5);
  slider.position(20, 40);
  slider.style('width', '80px');
  createP('Colors:').position(25, 55).style('font-size: 15px');
  colorp1 = createColorPicker([0, 255, 0]).position(20, 95);
  colorp2 = createColorPicker([0, 0, 255]).position(20, 135);
  colorp3 = createColorPicker([255, 0, 0]).position(20, 175);
}


function draw() {
  background(200);
  noStroke();
  translate(width/2, height/2);
  rotate(angle);
  fill(colorp1.color());
  arc(0, 0, width/2, height/2, 0, 2*PI/3);    
  fill(colorp2.color());
  arc(0, 0, width/2, height/2, 2*PI/3, 4*PI/3); 
  fill(colorp3.color());
  arc(0, 0, width/2, height/2, 4*PI/3, 2*PI);

  angle += radians(slider.value());
  rotation_angle.html('Rotation angle: ' + slider.value());
}