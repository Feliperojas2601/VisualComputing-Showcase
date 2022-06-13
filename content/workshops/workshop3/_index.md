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
  uvShader = readShader('/showcase/sketches/shaders/uv.frag', { matrices: Tree.pmvMatrix, varyings: Tree.texcoords2 });
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


{{< p5-iframe 
  sketch="/sketches/shaders/uv_world.js"
  lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js"
  lib2="https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam@1.2.1/p5.easycam.js"
  width="520" height="530"
>}}