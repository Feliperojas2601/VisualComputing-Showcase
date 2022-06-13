let easycam;
let uvShader;

function preload() {
  uvShader = readShader('/content/sketches/shaders/uv.frag', { matrices: Tree.pmvMatrix, varyings: Tree.texcoords2 });
}

function setup() {
  createCanvas(300, 300, WEBGL);
  textureMode(NORMAL);
  shader(uvShader);
}

function draw() {
  background(200);
  orbitControl();
  axes();
  push();
  noStroke();
  quad(-width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2);
  pop();
}

function mouseWheel(event) {
  return false;
}