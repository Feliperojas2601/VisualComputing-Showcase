---
date: 2022-04-02
linktitle: Workshop 3 FR
title: Workshop3FR
---

# **Shaders**

<div style="text-align: justify">

## **Texturing and Coloring**

## **I. Introducción**



## **II. Contextualización**


## **III. Resultados**

La implementación utilizando p5.js y el editor web realizada para los casos anteriores se muestra a continuación:

{{< details title=".js" open=false >}}

```js
let coloringShader;
let image;
let selection_box;

function preload() {
    coloringShader = readShader('shaders/coloring.frag', { varyings: Tree.texcoords2 });
    // image source: https://en.wikipedia.org/wiki/HSL_and_HSV#/media/File:Fire_breathing_2_Luc_Viatour.jpg
    image = loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Fire_breathing_2_Luc_Viatour.jpg/1280px-Fire_breathing_2_Luc_Viatour.jpg');
}

function setup() {
    createCanvas(700, 500, WEBGL);
    noStroke();
    textureMode(IMAGE);
    shader(coloringShader);
    selection_box = createSelect();
    selection_box.position(10, 10);
    selection_box.style('color', 'black');
    selection_box.option('None');
    selection_box.option('Luma');
    selection_box.option('HSV V');
    selection_box.option('Interpolated');
    selection_box.changed(changeSelection);
    coloringShader.setUniform('texture', image);
}

function draw() {
    background(0);
    quad(-width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2);
}

function changeSelection() {
    let val = selection_box.value();
    if (val == 'Luma') {
        coloringShader.setUniform('hsv', false);
        coloringShader.setUniform('interpolated', false);
        coloringShader.setUniform('luma', true);
    } else if (val == 'HSV V') {
        coloringShader.setUniform('luma', false);
        coloringShader.setUniform('interpolated', false);
        coloringShader.setUniform('hsv', true);
    } else if (val == 'Interpolated') {
        coloringShader.setUniform('luma', false);
        coloringShader.setUniform('hsv', false);
        coloringShader.setUniform('interpolated', true);
    } else {
        coloringShader.setUniform('luma', false);
        coloringShader.setUniform('hsv', false);
        coloringShader.setUniform('interpolated', false);
    }
}
```

{{< /details >}}

<br/>

{{< details title=".frag" open=false >}}

```js
precision mediump float;

uniform bool luma;
uniform bool hsv; 
uniform bool interpolated; 
uniform sampler2D texture;

varying vec2 texcoords2;

float luma_function(vec3 texel) {
  return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
}

float hsv_function(vec3 texel) {
  return max(max(texel.r, texel.b), max(texel.r,texel.g));
}

float interpolated_function(vec4 texel, vec2 texcoords2) {
  if (abs(texcoords2.x - texcoords2.y) < 0.2) {
    return texel.r; 
  } else if (abs(texcoords2.x - texcoords2.y) < 0.5) {
    return texel.g; 
  } else {
    return texel.b; 
  }
}

void main() {
  vec4 texel = texture2D(texture, texcoords2);
  if (luma) {
    gl_FragColor = vec4((vec3(luma_function(texel.rgb))), 1.0);
  } else if (hsv) {
    gl_FragColor = vec4((vec3(hsv_function(texel.rgb))), 1.0);
  } else if (interpolated) {
    gl_FragColor = vec4((vec3(interpolated_function(texel, texcoords2))), 1.0);
  } else {
    gl_FragColor = texel; 
  }
}
```

{{< /details >}}

<br/>

<div align="center">

<iframe src="https://editor.p5js.org/jrojasce/full/0AvVUaItv" width="725" height="550"></iframe>

</div>

<br/>


## **IV. Conclusiones**


## **Image Processing**

## **I. Introducción**

## **II. Contextualización**

## **III. Resultados**


La implementación utilizando p5.js y el editor web realizada para los casos anteriores se muestra a continuación:

{{< details title=".js" open=false >}}

```js
let filterShader;
let image;
let video;
let video_on;
let selection_box;
let magnifier;
let region;

function preload() {
    video = createVideo(['./images/earth.webm']);
    video.hide();
    filterShader = readShader('./shaders/filter.frag', { varyings: Tree.texcoords2 });
    image = loadImage('./images/vangogh.jpg');
}

function setup() {
    createCanvas(650, 500, WEBGL);
    noStroke();
    textureMode(NORMAL);
    video_on = createCheckbox('Video', false);
    video_on.style('color', 'white');
    video_on.changed(() => {
        if (video_on.checked()) {
            filterShader.setUniform('texture', video);
            video.loop();
        } else {
            filterShader.setUniform('texture', image);
            video.pause();
        }
    });
    video_on.position(10, 30);
    selection_box = createSelect();
    selection_box.position(10, 10);
    selection_box.style('color', 'black');
    selection_box.option('None');
    selection_box.option('BLUR');
    selection_box.option('Luma');
    selection_box.option('HSV V');
    selection_box.changed(changeSelection);
    magnifier = createCheckbox('Magnifier', false);
    magnifier.position(10, 50);
    magnifier.style('color', 'white');
    region = createCheckbox('Region', false);
    region.position(10, 70);
    region.style('color', 'white');
    shader(filterShader);
    filterShader.setUniform('texture', image);
    filterShader.setUniform('mask', [0, 0, 0, 0, 1, 0, 0, 0, 0]);
    emitTexOffset(filterShader, image, 'texOffset');
}

function draw() {
    background(0);
    if (magnifier.checked()) {
        let mouse_x = map(mouseX, 0, width, 0.0, 1.0);
        let mouse_y = map(mouseY, 0, height, 0.0, 1.0);
        filterShader.setUniform('u_Resolution', [width, height]);
        filterShader.setUniform('u_Mouse', [mouse_x, mouse_y]);
        filterShader.setUniform('region', false);
        filterShader.setUniform('magnifier', true);
    } else if (region.checked()) {
        let mouse_x = map(mouseX, 0, width, 0.0, 1.0);
        let mouse_y = map(mouseY, 0, height, 0.0, 1.0);
        filterShader.setUniform('mask_sobel', [-1, -1, -1, -1, 8, -1, -1, -1, -1]);
        filterShader.setUniform('u_Resolution', [width, height]);
        filterShader.setUniform('u_Mouse', [mouse_x, mouse_y]);
        filterShader.setUniform('magnifier', false);
        filterShader.setUniform('region', true);
    } else {
        filterShader.setUniform('region', false);
        filterShader.setUniform('magnifier', false);
    }
    quad(-width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2);
}

function changeSelection() {
    let val = selection_box.value();
    if (val == 'Luma') {
        filterShader.setUniform('hsv', false);
        filterShader.setUniform('mask', [0, 0, 0, 0, 1, 0, 0, 0, 0]);
        filterShader.setUniform('luma', true);
    } else if (val == 'HSV V') {
        filterShader.setUniform('luma', false);
        filterShader.setUniform('mask', [0, 0, 0, 0, 1, 0, 0, 0, 0]);
        filterShader.setUniform('hsv', true);
    } else if (val == 'BLUR') {
        filterShader.setUniform('luma', false);
        filterShader.setUniform('hsv', false);
        filterShader.setUniform('mask', [1 / 16, 1 / 8, 1 / 16, 1 / 8, 1 / 4, 1 / 8, 1 / 16, 1 / 8, 1 / 16]);
    } else {
        filterShader.setUniform('luma', false);
        filterShader.setUniform('hsv', false);
        filterShader.setUniform('mask', [0, 0, 0, 0, 1, 0, 0, 0, 0]);
    }
}
```

{{< /details >}}

<br/>

{{< details title=".frag" open=false >}}

```js
precision mediump float;

const float radius = 2.;
const float depth = radius / 2.;
const float radius_region = 0.2;

uniform sampler2D texture;
uniform vec2 texOffset;
uniform float mask[9];
uniform bool luma;
uniform bool hsv; 
uniform bool magnifier; 
uniform vec2 u_Resolution;
uniform vec2 u_Mouse;
uniform bool region; 
uniform float mask_sobel[9];

varying vec2 texcoords2;

float luma_function(vec3 texel) {
  return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
}

float hsv_function(vec3 texel) {
  return max(max(texel.r, texel.b), max(texel.r,texel.g));
}

float sobel_function(vec3 texel) {
  return 0.0; 
}

void main() {

  vec2 tc0 = texcoords2 + vec2(-texOffset.s, -texOffset.t);
  vec2 tc1 = texcoords2 + vec2(         0.0, -texOffset.t);
  vec2 tc2 = texcoords2 + vec2(+texOffset.s, -texOffset.t);
  vec2 tc3 = texcoords2 + vec2(-texOffset.s,          0.0);
  vec2 tc4 = texcoords2 + vec2(         0.0,          0.0);
  vec2 tc5 = texcoords2 + vec2(+texOffset.s,          0.0);
  vec2 tc6 = texcoords2 + vec2(-texOffset.s, +texOffset.t);
  vec2 tc7 = texcoords2 + vec2(         0.0, +texOffset.t);
  vec2 tc8 = texcoords2 + vec2(+texOffset.s, +texOffset.t);

  vec4 rgba[9];
  rgba[0] = texture2D(texture, tc0);
  rgba[1] = texture2D(texture, tc1);
  rgba[2] = texture2D(texture, tc2);
  rgba[3] = texture2D(texture, tc3);
  rgba[4] = texture2D(texture, tc4);
  rgba[5] = texture2D(texture, tc5);
  rgba[6] = texture2D(texture, tc6);
  rgba[7] = texture2D(texture, tc7);
  rgba[8] = texture2D(texture, tc8);

  vec4 convolution;
  for (int i = 0; i < 9; i++) {
    convolution += rgba[i] * mask[i];
  }

  if (luma) {
    gl_FragColor = vec4((vec3(luma_function(convolution.rgb))), 1.0);
  } else if (hsv) {
    gl_FragColor = vec4((vec3(hsv_function(convolution.rgb))), 1.0);
  } else {
    gl_FragColor = vec4(convolution.rgb, 1.0);  
  }

  if (magnifier) {
    vec2 uv = gl_FragCoord.xy/(u_Resolution.xy * 2.0);
    vec2 center = vec2(u_Mouse.x, 1.0 - u_Mouse.y);
    float ax = ((uv.x - center.x) * (uv.x - center.x)) / (0.2 * 0.2) + ((uv.y - center.y) * (uv.y - center.y)) / (0.1 / (u_Resolution.x / u_Resolution.y));
    float dx = 0.0 + (-depth / radius) * ax + (depth / (radius * radius)) * ax * ax;
    float f = (ax + dx);
    if (ax > radius) {
      f = ax;
    } 
    vec2 magnifierArea = center + (uv - center) * f / ax;
    vec2 magnifier_r = vec2(magnifierArea.x, 1.0 - magnifierArea.y);
    vec4 color = texture2D(texture, magnifier_r);
    gl_FragColor = vec4(color.rgb, 1.0);
  } else if (region) {
    vec2 uv = gl_FragCoord.xy / (u_Resolution.xy * 2.0);
    vec2 center = vec2(u_Mouse.x, 1.0 - u_Mouse.y);
    if (distance(center, uv) < radius_region ) {
      vec4 convolution_sobel;
      for (int i = 0; i < 9; i++) {
        convolution_sobel += rgba[i] * mask_sobel[i];
      }
      gl_FragColor = vec4(vec3(convolution_sobel.rgb), 1.0);
    }
  }
}
```

{{< /details >}}

<br/>

<div align="center">

<iframe src="https://editor.p5js.org/jrojasce/full/VLOFfEn1g" width="690" height="550"></iframe>

</div>

<br/>

## **IV. Conclusiones**

## **Procedural Texturing**

## **I. Introducción**

## **II. Contextualización**

## **III. Resultados**


La implementación utilizando p5.js y el editor web realizada para los casos anteriores se muestra a continuación:

{{< details title=".js" open=false >}}

```js
let pg;
let textureShader;

function preload() {
    textureShader = readShader('./shaders/texture.frag', { matrices: Tree.NONE, varyings: Tree.NONE });
}

function setup() {
    createCanvas(400, 400, WEBGL);
    pg = createGraphics(400, 400, WEBGL);
    textureMode(NORMAL);
    noStroke();
    pg.noStroke();
    pg.textureMode(NORMAL);
    pg.shader(textureShader);
    pg.emitResolution(textureShader);
    pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
    deltaTime = 0;
    texture(pg);
}

function draw() {
    background(0);
    rotateY(millis() / 10000);
    sphere(100);
}

function mouseMoved() {
    textureShader.setUniform('u_Mouse', float(map(mouseX, 0, width, 0, 10)));
    map();
    pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
}
```

{{< /details >}}

<br/>

{{< details title=".frag" open=false >}}

```js
precision mediump float;

uniform vec2 u_resolution;
uniform float u_Mouse;

float facetHexPattern(vec2 u) {
  vec2 s = vec2(1., 1.732);
  vec2 a = s-2.*mod(u,s);
  vec2 b = s-2.*mod(u+s*vec2(0.5,0.5),s);
  return(0.7+0.2*sin(u_Mouse*1.1)-0.5*min(dot(a,a),dot(b,b)));
}
    
void main(void) {
  vec2 u = 22.*gl_FragCoord.xy/u_resolution.xy;
  gl_FragColor = vec4(vec3(facetHexPattern(u)), 1.0);
}
```

{{< /details >}}

<br/>

<div align="center">

<iframe src="https://editor.p5js.org/jrojasce/full/dS8l00t4O" width="410" height="450"></iframe>

</div>

<br/>

## **IV. Conclusiones**

## **V. Referencias**

- Wikipedia contributors. (2022, 22 abril). Texture mapping. Wikipedia. https://en.wikipedia.org/wiki/Texture_mapping. [Wikipedia](https://en.wikipedia.org/wiki/Texture_mapping)
- Wikipedia contributors. (2022, mayo 16). Spherical coordinate system. Wikipedia. https://en.wikipedia.org/wiki/Spherical_coordinate_system [Wikipedia](https://en.wikipedia.org/wiki/Spherical_coordinate_system)
- Hands. (2022). Mediapipe. https://google.github.io/mediapipe/solutions/hands. [MediaPipe Hands](https://google.github.io/mediapipe/solutions/hands)
- Handpose. (2022). ml5.js. https://learn.ml5js.org/#/reference/handpose. [Ml5.js handpose](https://learn.ml5js.org/#/reference/handpose)
- Wikipedia contributors. (2021, 29 agosto). Finger tracking. Wikipedia. https://en.wikipedia.org/wiki/Finger_tracking [Wikipedia](https://en.wikipedia.org/wiki/Finger_tracking)
- Wikipedia contributors. (2022, marzo 19). 3D pose estimation. Wikipedia. https://en.wikipedia.org/wiki/3D_pose_estimation [Wikipedia](https://en.wikipedia.org/wiki/3D_pose_estimation)
