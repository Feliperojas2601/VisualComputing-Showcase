## Stereokinetic Effect

{{< details title="p5-instance-div markdown" open=false >}}
```js
  const frame_rate = 60;

  function setup() {
    createCanvas(500, 500);
    frameRate(frame_rate);
  }

  function draw() {
    background(220);
    
    let difference = 40;
    let inner_diameter = 40;
    
    const outer_circles = 11;
    const start = inner_diameter + outer_circles * difference;
    const end = inner_diameter;
    
    noStroke();
    
    let posX = 0, posY = 0;
    let referenceX = width / 2;
    let referenceY = height / 2;
    
    for (let diameter = start, index = 0; diameter >= end; diameter -= difference, index++) {
      fill(index % 2 === 0 ? color('blue') : color('yellow'));
      let orientation = index > 6 ? -1 : 1;
      posX = referenceX + orientation * index * difference / 2 * cos(frameCount / frame_rate);
      posY = referenceY + orientation * index * difference / 2 * sin(frameCount / frame_rate);
      if (index == 6) {
        referenceX = posX + (diameter / 2 + difference) * cos(frameCount / frame_rate);
        referenceY = posY + (diameter / 2 + difference) * sin(frameCount / frame_rate);
      }
      circle(posX, posY, diameter);
    }
  }
```
{{< /details >}}
{{< p5-iframe sketch="/showcase/sketches/optical_illusions/stereokinetic_effect.js" width="520" height="520" >}}