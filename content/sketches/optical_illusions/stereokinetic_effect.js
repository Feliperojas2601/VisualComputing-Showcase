const frame_rate = 60;

let show_crater_cb;
let show_crater = true;
let slider_label;

function setup() {
  createCanvas(500, 500);
  show_crater_cb = createCheckbox('show crater', show_crater);
  show_crater_cb.changed(() => {
    show_crater = show_crater_cb.checked();
  });
  frames_slider = createSlider(0.5, 5, 1, 0.25);
  frames_slider.position(180, 515);
  frames_slider.style('width', '80px');
  slider_label = createSpan('speed');
  slider_label.position(135, 513);
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

  let t, outer_coeff, inner_coef;

  for (let diameter = start, index = 0; diameter >= end; diameter -= difference, index++) {
    fill(index % 2 === 0 ? color('blue') : color('yellow'));
    let orientation = index > 6 && show_crater ? -1 : 1;
    outer_coeff = orientation * index * difference / 2;
    t = frameCount * frames_slider.value() / frame_rate;
    posX = referenceX + outer_coeff * cos(t);
    posY = referenceY + outer_coeff * sin(t);
    if (index == 6 && show_crater) {
      inner_coef = diameter / 2 + difference;
      referenceX = posX + inner_coef * cos(t);
      referenceY = posY + inner_coef * sin(t);
    }
    circle(posX, posY, diameter);
  }
}