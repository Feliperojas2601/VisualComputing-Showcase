let x = 0;
let colorp1, colorp2;
let increase = 0;

function setup() {

    createCanvas(500, 500);
    rectMode(CENTER);
    colorp1 = createColorPicker([32, 162, 32]).position(20, 25);
    colorp2 = createColorPicker([0, 0, 255]).position(75, 25);
    slider = createSlider(0, 2, 0, 0.25);
    slider.position(150, 25);
    slider.style('width', '80px');

}

function draw() {

    background(220);

    increase = slider.value();

    for (let i = 0; i < 400; i += 20) {

        stroke(colorp2.color());
        strokeWeight(4);
        ellipse(x, 250, i - 380, i - 380);

        noFill();
        stroke(colorp1.color());
        strokeWeight(4);
        ellipse(250, 250, i, i);

    }
    if (x > width) {

        x = 0;

    } else {

        x = x + increase;
    }
}