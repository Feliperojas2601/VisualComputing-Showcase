## Stroboscopic Artifacts

{{< details title="p5-instance-div markdown" open=false >}}
```js
let angle = 0;
let frames;
let colorp1, colorp2, colorp3;
let rotation_angle;
function setup() {
  createCanvas(500, 500);
  frames_slider = createSlider(5, 120, 60, 5);
  frames_slider.position(180, 40);
  frames_slider.style('width', '80px');
  ellipseMode(CENTER);
  rotation_angle = createP().position(25, 5);
  frames = createP().position(180, 5);
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
  frameRate(frames_slider.value());
  rotation_angle.html('Rotation angle: ' + slider.value());
  frames.html('Frame rate: ' + frames_slider.value());
}
```
{{< /details >}}
{{< p5-iframe sketch="/showcase/sketches/optical_illusions/stroboscopic_artifacts.js" width="500" height="500" >}}