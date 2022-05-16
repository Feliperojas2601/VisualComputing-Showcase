const globe = [];
const r = 200;
const total = 20;
let angleX = 0;
let angleY = 0;

function preload() {
    earth = loadImage('https://lh6.googleusercontent.com/MKWuIXLwcIXgwmrKrnjgCFEjna_8kFePKfWJlhOQLpBZ3pagPVPjxyHxZPHs2CTGMm1sdKLx_WGkjVhnDF_L9EQbata6o2Cw0dtIvNYz-yQG_YJXNfpWff_HbdsNtqkWAia6jwG7aLWDbJbn6w');
}

function setup() {
    createCanvas(500, 500, WEBGL);
    noFill();
    strokeWeight(2);
    stroke(200);

    for (let i = 0; i < total + 1; i++) {
        globe[i] = [];
        const lat = map(i, 0, total, 0, PI);
        for (let j = 0; j < total + 1; j++) {
            const lon = map(j, 0, total, 0, TWO_PI);
            const x = r * sin(lat) * cos(lon);
            const y = r * sin(lat) * sin(lon);
            const z = r * cos(lat);
            globe[i][j] = createVector(x, y, z);
        }
    }
}

function draw() {
    background(51);
    rotateX(angleX);
    rotateY(angleY);

    textureMode(NORMAL)
    texture(earth);

    for (let i = 0; i < total; i++) {
        beginShape(TRIANGLE_STRIP);
        for (let j = 0; j < total + 1; j++) {
            const v1 = globe[i][j];
            vertex(v1.x, v1.y, v1.z, j / total, i / total);
            const v2 = globe[i + 1][j];
            vertex(v2.x, v2.y, v2.z, j / total, (i + 1) / total);
        }
        endShape();
    }

    angleX += 0.005;
    angleY += 0.006;
}