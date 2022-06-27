---
date: 2022-06-27
linktitle: Workshop 3 JL
title: Workshop3JL
---

# **Shaders**

<div style="text-align: justify">

## **Texturing and Coloring**

## **I. Introducción**



## **II. Contextualización**


## **III. Resultados**

La implementación utilizando p5.js y el editor web realizada para los casos anteriores se muestra a continuación:

{{< details title="sketch.js" open=false >}}

```js
let uvShader;

function preload() {
  uvRGShader = readShader('shaders/uv_rg.frag', { matrices: Tree.pmvMatrix, varyings: Tree.texcoords2 });
  uvRBShader = readShader('shaders/uv_rb.frag', { matrices: Tree.pmvMatrix, varyings: Tree.texcoords2 });
  uvGBShader = readShader('shaders/uv_gb.frag', { matrices: Tree.pmvMatrix, varyings: Tree.texcoords2 });
}

function setup() {
  createCanvas(300, 300, WEBGL);
  noStroke();
  textureMode(NORMAL);
}

function draw() {
  background(0);
  shader(uvRGShader);
  quad(-width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2);
  shader(uvRBShader);
  triangle(width / 2, height / 2, -width / 2, height / 2, 0 , 0);
  shader(uvGBShader);
  circle(0, -height / 4, width / 2, height / 2);
}
```

{{< /details >}}

<br/>

{{< details title="uv_gb.frag" open=false >}}

```js
precision mediump float;

varying vec2 texcoords2;

void main() {
  gl_FragColor = vec4(0.0, texcoords2.xy, 1.0);
}
```

{{< /details >}}

{{< details title="uv_rb.frag" open=false >}}

```js
precision mediump float;

varying vec2 texcoords2;

void main() {
  gl_FragColor = vec4(texcoords2.x, 0.0, texcoords2.y, 1.0);
}
```

{{< /details >}}

{{< details title="uv_rg.frag" open=false >}}

```js
precision mediump float;

varying vec2 texcoords2;

void main() {
  gl_FragColor = vec4(texcoords2.yx, 0.0, 1.0);
}
```

{{< /details >}}

<br/>

<div align="center">

<iframe src="https://editor.p5js.org/Gwynnbleid/full/f5EZ-Q4tN" width="350" height="350"></iframe>

</div>

<br/>


## **IV. Conclusiones**

## **Texture Sampling**

## **I. Introducción**



## **II. Contextualización**


## **III. Resultados**

La implementación utilizando p5.js y el editor web realizada para los casos anteriores se muestra a continuación:

{{< details title="sketch.js" open=false >}}

```js
let lumaShader;
let img;
let grey_scale;
let component_average;
let texture_tinting;

function preload() {
  lumaShader = readShader('shaders/luma.frag', { varyings: Tree.texcoords2 });
  img = loadImage('images/fire_breathing.jpg');
}

function setup() {
  createCanvas(700, 500, WEBGL);
  noStroke();
  textureMode(IMAGE);
  shader(lumaShader);
  
  grey_scale = createCheckbox('luma', false);
  grey_scale.position(10, 10);
  grey_scale.style('color', 'white');
  grey_scale.input(() => lumaShader.setUniform('grey_scale', grey_scale.checked()));

  component_average = createCheckbox('component average', false);
  component_average.position(10, 30);
  component_average.style('color', 'white');
  component_average.input(() => lumaShader.setUniform('component_average', component_average.checked()));

  texture_tinting = createCheckbox('texture tinting', false);
  texture_tinting.position(10, 50);
  texture_tinting.style('color', 'white');
  texture_tinting.input(() => lumaShader.setUniform('texture_tinting', texture_tinting.checked()));

  lumaShader.setUniform('texture', img);
}

function draw() {
  background(0);
  quad(-width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2);
}
```

{{< /details >}}

<br/>

{{< details title=".frag" open=false >}}

```js
precision mediump float;

uniform bool grey_scale;
uniform bool component_average;
uniform bool texture_tinting;
uniform sampler2D texture;

varying vec2 texcoords2;

float luma(vec3 texel) {
  return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
}

float componentAverage(vec3 texel) {
  return 0.333 * texel.r + 0.333 * texel.g + 0.333 * texel.b;
}

vec3 textureTinting(vec3 texel, vec2 texcoords2) {
  float cut_point = 0.5;
  float red_modifier = texcoords2.x < cut_point ? texcoords2.x / cut_point : 1.0;
  float green_modifier = texcoords2.y < cut_point ? texcoords2.y / cut_point : 1.0;
  float blue_modifier = texcoords2.x > cut_point ? (texcoords2.x - cut_point) / cut_point : 1.0;
  float all_modifier = texcoords2.y > cut_point ? 1.0 - (texcoords2.y - cut_point) / cut_point : 1.0;
  return vec3(
    all_modifier * red_modifier * texel.r,
    all_modifier * green_modifier * texel.g,
    all_modifier * blue_modifier * texel.b
  );
}

void main() {
  vec4 texel = texture2D(texture, texcoords2);
  if (grey_scale) {
    gl_FragColor = vec4((vec3(luma(texel.rgb))), 1.0);
  } else if (component_average) {
    gl_FragColor = vec4((vec3(componentAverage(texel.rgb))), 1.0);
  } else if (texture_tinting) {
    gl_FragColor = vec4(textureTinting(texel.rgb, texcoords2), 0.3);
  } else {
    gl_FragColor = texel;
  }
}
```

{{< /details >}}

<br/>

<div align="center">

<iframe src="https://editor.p5js.org/Gwynnbleid/full/XwK1n9q9x" width="750" height="550"></iframe>

</div>

<br/>


## **IV. Conclusiones**


## **Image Processing**

## **I. Introducción**

## **II. Contextualización**

## **III. Resultados**


La implementación utilizando p5.js y el editor web realizada para los casos anteriores se muestra a continuación:

{{< details title="sketch.js" open=false >}}

```js
let effectShader;
let img;
let ridges;
let blur;
let sharpen;
let emboss;
let luma;
let hsv;

function preload() {
  effectShader = readShader('shaders/effect.frag', { varyings: Tree.texcoords2 });
  img = loadImage('images/one_piece.jpeg');
}

function setup() {
  createCanvas(900, 450, WEBGL);
  noStroke();
  textureMode(NORMAL);

  ridges = createCheckbox('ridges', false);
  ridges.position(10, 10);
  ridges.style('color', 'white');
  ridges.input(() => effectShader.setUniform('apply_convolution', ridges.checked()));

  blur = createCheckbox('blur', false);
  blur.position(10, 30);
  blur.style('color', 'white');
  blur.input(() => effectShader.setUniform('apply_convolution', blur.checked()));

  sharpen = createCheckbox('sharpen', false);
  sharpen.position(10, 50);
  sharpen.style('color', 'white');
  sharpen.input(() => effectShader.setUniform('apply_convolution', sharpen.checked()));

  emboss = createCheckbox('emboss', false);
  emboss.position(10, 70);
  emboss.style('color', 'white');
  emboss.input(() => effectShader.setUniform('apply_convolution', emboss.checked()));

  luma = createCheckbox('luma', false);
  luma.position(10, 90);
  luma.style('color', 'white');
  luma.input(() => effectShader.setUniform('apply_luma', luma.checked()));

  hsv = createCheckbox('hsv', false);
  hsv.position(10, 110);
  hsv.style('color', 'white');
  hsv.input(() => effectShader.setUniform('apply_hsv', hsv.checked()));

  hsv_v = createCheckbox('hsv_v', false);
  hsv_v.position(10, 130);
  hsv_v.style('color', 'white');
  hsv_v.input(() => effectShader.setUniform('apply_hsv_v', hsv_v.checked()));

  hsl = createCheckbox('hsl', false);
  hsl.position(10, 150);
  hsl.style('color', 'white');
  hsl.input(() => effectShader.setUniform('apply_hsl', hsl.checked()));

  hsl_l = createCheckbox('hsl_l', false);
  hsl_l.position(10, 170);
  hsl_l.style('color', 'white');
  hsl_l.input(() => effectShader.setUniform('apply_hsl_l', hsl_l.checked()));

  shader(effectShader);
  effectShader.setUniform('texture', img);
  emitTexOffset(effectShader, img, 'tex_offset');
}

function draw() {
  background(0);
  if (ridges.checked()) {
    effectShader.setUniform('mask', [-1, -1, -1, -1, 8, -1, -1, -1, -1]);
  } else if (blur.checked()) {
    effectShader.setUniform('mask', [1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9]);
  } else if (sharpen.checked()) {
    effectShader.setUniform('mask', [0, -1, 0, -1, 5, -1, 0, -1, 0]);
  } else if (emboss.checked()) {
    effectShader.setUniform('mask', [-2, -1, 0, -1, 1, 1, 0, 1, 2]);
  } else if (luma.checked() || hsv.checked() || hsv_v.checked() || hsl.checked() || hsl_l.checked()) {
    effectShader.setUniform('mask', [0, 0, 0, 0, 1, 0, 0, 0, 0]);
  } else {
    effectShader.setUniform('mask', [0, 0, 0, 0, 1, 0, 0, 0, 0]);
  }
  const mx = map(mouseX, 0, width, 0.0, 1.0);
  const my = map(mouseY, 0, height, 0.0, 1.0);
  effectShader.setUniform('u_mouse', [mx, my]);
  effectShader.setUniform('u_resolution', [width, height]);

  quad(-width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2);
}
```

{{< /details >}}

<br/>

{{< details title="effect.frag" open=false >}}

```js
precision mediump float;

uniform sampler2D texture;
uniform vec2 tex_offset;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float mask[9];
uniform bool apply_convolution;

uniform bool apply_luma;
uniform bool apply_hsv;
uniform bool apply_hsv_v;
uniform bool apply_hsl;
uniform bool apply_hsl_l;

varying vec2 texcoords2;

const float radius = 1.0;
const float depth = radius / 2.0;

float luma(vec3 texel) {
  return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
}

vec3 hsv(vec3 texel) {
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = mix(vec4(texel.bg, K.wz), vec4(texel.gb, K.xy), step(texel.b, texel.g));
  vec4 q = mix(vec4(p.xyw, texel.r), vec4(texel.r, p.yzx), step(p.x, texel.r));
  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

float hsvV(vec3 texel) {
  return max(max(texel.r, texel.g), texel.b);
}

vec3 hsl(vec3 texel){
  float h = 0.0;
	float s = 0.0;
	float l = 0.0;
	float r = texel.r;
	float g = texel.g;
	float b = texel.b;
	float c_min = min( r, min( g, b ) );
	float c_max = max( r, max( g, b ) );

	l = (c_max + c_min) / 2.0;
	if (c_max > c_min) {
		float c_delta = c_max - c_min;
		s = l < .0 ? c_delta / (c_max + c_min) : c_delta / (2.0 - (c_max + c_min));
        
		if (r == c_max) {
			h = (g - b) / c_delta;
		} else if (g == c_max) {
			h = 2.0 + (b - r) / c_delta;
		} else {
			h = 4.0 + (r - g) / c_delta;
		}

		if (h < 0.0) {
			h += 6.0;
		}
		h = h / 6.0;
	}
	return vec3(h, s, l);
}

float hslL(vec3 texel) {
  return 0.21 * texel.r + 0.72 * texel.g + 0.07 * texel.b;
}

vec4 magnify(vec2 frag_coord) {
  vec2 uv = frag_coord / (u_resolution.xy * radius);
  vec2 center = vec2(u_mouse.x, 1.0 - u_mouse.y);
  float diff_x_sq = (uv.x - center.x) * (uv.x - center.x);
  float diff_y_sq = (uv.y - center.y) * (uv.y - center.y);
  float ax = diff_x_sq / (0.2 * 0.2) + (diff_y_sq / 0.1) * (u_resolution.x / u_resolution.y);
  float ax_sq = ax * ax;
  float radius_sq = radius * radius;
  float dx = (-depth / radius) * ax + (depth / radius_sq) * ax_sq;
  float f = ax + dx;
  if (ax > radius)
    f = ax;
  vec2 magnifier_area = center + (uv - center) * f / ax;
  vec2 magnifier_r = vec2(magnifier_area.x, 1.0 - magnifier_area.y);
  return texture2D(texture, magnifier_r);
}

vec4 convolute() {
  vec2 tc0 = texcoords2 + vec2(-tex_offset.s, -tex_offset.t);
  vec2 tc1 = texcoords2 + vec2(0.0, -tex_offset.t);
  vec2 tc2 = texcoords2 + vec2(tex_offset.s, -tex_offset.t);
  vec2 tc3 = texcoords2 + vec2(-tex_offset.s, 0.0);
  vec2 tc4 = texcoords2 + vec2(0.0, 0.0);
  vec2 tc5 = texcoords2 + vec2(tex_offset.s, 0.0);
  vec2 tc6 = texcoords2 + vec2(-tex_offset.s, +tex_offset.t);
  vec2 tc7 = texcoords2 + vec2(0.0, tex_offset.t);
  vec2 tc8 = texcoords2 + vec2(tex_offset.s, tex_offset.t);

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
  for (int i = 0; i < 9; ++i) {
    convolution += rgba[i] * mask[i];
  }

  return convolution;
}

void main() {
  vec4 texel = texture2D(texture, texcoords2);

  vec2 uv = gl_FragCoord.xy / (u_resolution.xy * radius);
  vec2 center = vec2(u_mouse.x, 1.0 - u_mouse.y);
  float effect_region_normalized_radius = 0.1;
  bool is_in_effect_region = distance(uv, center) < effect_region_normalized_radius;

  if (is_in_effect_region) {
    if (apply_luma) {
      gl_FragColor = vec4(vec3(luma(texel.rgb)), 1.0);
    } else if (apply_hsv) {
      gl_FragColor = vec4(hsv(texel.rgb), 1.0);
    } else if (apply_hsv_v) {
      gl_FragColor = vec4(vec3(hsvV(texel.rgb)), 1.0);
    } else if (apply_hsl) {
      gl_FragColor = vec4(hsl(texel.rgb), 1.0);
    } else if (apply_hsl_l) {
      gl_FragColor = vec4(vec3(hslL(texel.rgb)), 1.0);
    } else if (apply_convolution) {
      vec4 convolution = convolute();
      gl_FragColor = vec4(convolution.rgb, 1.0);
    } else {
      vec4 color = magnify(gl_FragCoord.xy);
      gl_FragColor = vec4(color.rgb, 1.0);
    }
  } else {
    gl_FragColor = vec4(texel.rgb, 1.0);
  }
  
}
```

{{< /details >}}

<br/>

<div align="center">

<iframe src="https://editor.p5js.org/Gwynnbleid/full/MmvEaVeaQ" width="650" height="350"></iframe>

</div>

<br/>

## **IV. Conclusiones**

## **Procedural Texturing**

## **I. Introducción**

## **II. Contextualización**

## **III. Resultados**


La implementación utilizando p5.js y el editor web realizada para los casos anteriores se muestra a continuación:

{{< details title="sketch.js" open=false >}}

```js
let pg;
let proceduralTexturingShader;

function preload() {
  proceduralTexturingShader = readShader('shaders/procedural_tex.frag', { matrices: Tree.NONE, varyings: Tree.NONE });
}

function setup() {
  createCanvas(400, 400, WEBGL);
  pg = createGraphics(400, 400, WEBGL);
  textureMode(NORMAL);
  noStroke();
  pg.noStroke();
  pg.textureMode(NORMAL);
  pg.shader(proceduralTexturingShader);
  pg.emitResolution(proceduralTexturingShader);
  proceduralTexturingShader.setUniform('u_zoom', 3);
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  texture(pg);
}

function draw() {
  background(33);
  orbitControl();
  torus(90, 65, 24, 4);
}

function mouseMoved() {
  proceduralTexturingShader.setUniform('u_zoom', int(map(mouseX, 0, width, 1, 30)));
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  return false;
}
```

{{< /details >}}

<br/>

{{< details title="procedural_tex.frag" open=false >}}

```js
precision mediump float;

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_zoom;

vec2 rotate2D (vec2 _st, float _angle) {
  _st -= 0.5;
  _st = mat2(cos(_angle), -sin(_angle), sin(_angle), cos(_angle)) * _st;
  _st += 0.5;
  return _st;
}

vec2 tile (vec2 _st, float _zoom) {
  _st *= _zoom;
  return fract(_st);
}

vec2 rotateTilePattern(vec2 _st){
  _st *= 2.0;

  float index = 0.0;
  
  index += step(1., mod(_st.x, 2.0));
  index += step(1., mod(_st.y, 2.0)) * 2.0;

  _st = fract(_st);

  // Rotate each cell according to the index
  if(index == 1.0){
    //  Rotate cell 1 by 180 degrees
    _st = rotate2D(_st, PI);
  } else if(index == 2.0){
    //  Rotate cell 2 by 90 degrees
    _st = rotate2D(_st, PI * 0.5);
  } else if(index == 3.0){
    //  Rotate cell 3 by -90 degrees
    _st = rotate2D(_st, PI * -0.5);
  }

  return _st;
}

void main (void) {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;

  st = tile(st, u_zoom);

  st = rotate2D(st, -PI * u_time * 0.25);
  st = rotateTilePattern(st * 2.0);
  st = rotate2D(st, PI * u_time * 0.25);
  st = rotateTilePattern(st);

  gl_FragColor = vec4(vec3(step(st.x, st.y), 0.0, 1.0), 1.0);
}

```

{{< /details >}}

<br/>

<div align="center">

<iframe src="https://editor.p5js.org/Gwynnbleid/full/MFhE1B2DQ" width="450" height="450"></iframe>

</div>

<br/>

{{< details title="sketch.js" open=false >}}

```js
let pg;
let proceduralTexturingShader;

function preload() {
  proceduralTexturingShader = readShader('shaders/procedural_tex.frag', { matrices: Tree.NONE, varyings: Tree.NONE });
}

function setup() {
  createCanvas(400, 400, WEBGL);
  pg = createGraphics(400, 400, WEBGL);
  textureMode(NORMAL);
  noStroke();
  pg.noStroke();
  pg.textureMode(NORMAL);
  pg.shader(proceduralTexturingShader);
  pg.emitResolution(proceduralTexturingShader);
  proceduralTexturingShader.setUniform('u_zoom', 3);
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  texture(pg);
}

function draw() {
  background(33);
  orbitControl();
  cone(120, 250, 24, 24);
}

function mouseMoved() {
  proceduralTexturingShader.setUniform('u_zoom', int(map(mouseX, 0, width, 1, 30)));
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  return false;
}
```

{{< /details >}}

<br/>

{{< details title="procedural_tex.frag" open=false >}}

```js
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_zoom;

float circle(in vec2 _st, in float _radius){
  vec2 l = _st - vec2(0.5);
  return 1. - smoothstep(_radius - _radius * 0.2, _radius + _radius * 0.2, dot(l, l) * 8.0);
}

vec3 hsv(vec3 texel) {
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = mix(vec4(texel.bg, K.wz), vec4(texel.gb, K.xy), step(texel.b, texel.g));
  vec4 q = mix(vec4(p.xyw, texel.r), vec4(texel.r, p.yzx), step(p.x, texel.r));
  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

void main (void) {
  vec2 st = gl_FragCoord.xy / u_resolution;
  vec3 color = vec3(0.0);
  st *= u_zoom;
  st = fract(st);
  color = vec3(st, 1.0);
	gl_FragColor = vec4(hsv(color.rgb), 1.0);
}
```

{{< /details >}}

<br/>

<div align="center">

<iframe src="https://editor.p5js.org/Gwynnbleid/full/xmN1ehUrz" width="450" height="450"></iframe>

</div>

<br/>

{{< details title="sketch.js" open=false >}}

```js
let pg;
let proceduralTexturingShader;

function preload() {
  proceduralTexturingShader = readShader('shaders/procedural_tex.frag', { matrices: Tree.NONE, varyings: Tree.NONE });
}

function setup() {
  createCanvas(400, 400, WEBGL);
  pg = createGraphics(400, 400, WEBGL);
  textureMode(NORMAL);
  noStroke();
  pg.noStroke();
  pg.textureMode(NORMAL);
  pg.shader(proceduralTexturingShader);
  pg.emitResolution(proceduralTexturingShader);
  proceduralTexturingShader.setUniform('u_zoom', 3.0);
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  texture(pg);
}

function draw() {
  background(33);
  orbitControl();
  cylinder(80, 250, 25, 25);
  proceduralTexturingShader.setUniform('u_seconds', millis() / 1000.0);
}

function mouseMoved() {
  proceduralTexturingShader.setUniform('u_zoom', int(map(mouseX, 0, width, 1, 30)));
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  return false;
}
```

{{< /details >}}

<br/>

{{< details title="procedural_tex.frag" open=false >}}

```js
precision mediump float;

uniform vec2 u_resolution;
uniform float u_seconds;
uniform float u_zoom;

vec2 brickTile(vec2 _st, float _zoom){
  _st *= _zoom;
  _st.x += step(1., mod(_st.y, 2.0)) * 0.5;
  return fract(_st);
}

vec3 hsl(vec3 texel){
  float h = 0.0;
	float s = 0.0;
	float l = 0.0;
	float r = texel.r;
	float g = texel.g;
	float b = texel.b;
	float cMin = min( r, min( g, b ) );
	float cMax = max( r, max( g, b ) );

	l = (cMax + cMin) / 2.0;
	if (cMax > cMin) {
		float cDelta = cMax - cMin;
		s = l < .0 ? cDelta / (cMax + cMin) : cDelta / (2.0 - (cMax + cMin));
        
		if (r == cMax) {
			h = (g - b) / cDelta;
		} else if (g == cMax) {
			h = 2.0 + (b - r) / cDelta;
		} else {
			h = 4.0 + (r - g) / cDelta;
		}

		if (h < 0.0) {
			h += 6.0;
		}
		h = h / 6.0;
	}
	return vec3(h, s, l);
}

float hslL(vec3 texel) {
  return 0.21 * texel.r + 0.72 * texel.g + 0.07 * texel.b;
}

float box(vec2 _st, vec2 _size){
  _size = vec2(0.5) - _size * 0.5;
  vec2 uv = smoothstep(_size, _size + vec2(1e-4), _st);
  uv *= smoothstep(_size, _size + vec2(1e-4), vec2(1.0) - _st);
  return uv.x * uv.y;
}

void main(void){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec3 color = vec3(0.0);
  st = brickTile(st, u_zoom);

	float mod3 = u_seconds - (3.0 * floor(u_seconds / 3.0));
	if (floor(mod3) == 0.0) color = vec3(st, 0.3);
	else if (floor(mod3) == 1.0) color = vec3(0.5, st);
	else if (floor(mod3) == 2.0) color = vec3(st, 0.5);

  gl_FragColor = vec4(vec3(hsl(color.rgb)), 1.0);
}

```

{{< /details >}}

<br/>

<div align="center">

<iframe src="https://editor.p5js.org/Gwynnbleid/full/WstmC3mHn" width="450" height="450"></iframe>

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
