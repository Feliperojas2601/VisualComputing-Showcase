---
date: 2022-04-02
linktitle: Workshop 3
title: Workshop3
---

# **Shaders**

<div style="text-align: justify">

{{< details title="p5-instance-div markdown" open=false >}}

```js
let easycam;
let uvShader;

function preload() {
  uvShader = readShader('/sketches/shaders/uv.frag', { matrices: Tree.pmvMatrix, varyings: Tree.texcoords2 });
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
```

{{< /details >}}


{{< p5-global-iframe id="sphere" width="520" height="530" >}}
let easycam;
let uvShader;

function preload() {
  uvShader = readShader('/sketches/shaders/uv.frag', { matrices: Tree.pmvMatrix, varyings: Tree.texcoords2 });
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
{{< /p5-global-iframe >}}