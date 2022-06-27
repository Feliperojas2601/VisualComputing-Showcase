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
let easycam;
let uvShader;

function preload() {
  // Define geometry in world space (i.e., matrices: Tree.pmvMatrix).
  // The projection and modelview matrices may be emitted separately
  // (i.e., matrices: Tree.pMatrix | Tree.mvMatrix), which actually
  // leads to the same gl_Position result.
  // Interpolate only texture coordinates (i.e., varyings: Tree.texcoords2).
  // see: https://github.com/VisualComputing/p5.treegl#handling
  uvShader = readShader("uv.frag", {
    matrices: Tree.pmvMatrix,
    varyings: Tree.texcoords2,
  });
  uvShader2 = readShader("uv2.frag", {
    matrices: Tree.pmvMatrix,
    varyings: Tree.texcoords2,
  });
}

function setup() {
  createCanvas(500, 500, WEBGL);
  textureMode(NORMAL);
}

function draw() {
  background(0);
  orbitControl();
  shader(uvShader2);
  noStroke();
  quad(
    -width / 2,
    -height / 2,
    width / 2,
    -height / 2,
    width / 2,
    height / 2,
    -width / 2,
    height / 2
  );
  shader(uvShader);
  triangle(-width / 2, height / 2, width / 2, height / 2, 0, -height / 2);
}

function mouseWheel(event) {
  //comment to enable page scrolling
  return false;
}
```

{{< /details >}}

<br/>

{{< details title=".frag" open=false >}}

```js
precision mediump float;

// the texture coordinates varying was defined in
// the vertex shader by treegl readShader()
// open your console and & see!
varying vec2 texcoords2;

void main() {

 gl_FragColor = vec4(texcoords2.x, 0, texcoords2.y, 1.0);

// if (texcoords2.y > 0.25 && texcoords2.y < 0.50){
//   gl_FragColor = vec4(texcoords2.x, 0,  texcoords2.y, 1.0);
// }else if (texcoords2.y > 0.50 && texcoords2.x > 0.50 && texcoords2.x < 0.75){
//   gl_FragColor = vec4(texcoords2.x, 1,  texcoords2.y, 1.0);
// }else if (texcoords2.y > 0.75 && texcoords2.x < 0.25 ){
//   gl_FragColor = vec4(texcoords2.y, 1,  texcoords2.x, 1.0);
// }else if (texcoords2.y < 0.75 && texcoords2.x > 0.25 && texcoords2.x < 0.50){
//   gl_FragColor = vec4(texcoords2.x, 0, 1, 1.0);
// }else if (texcoords2.y < 0.25 && texcoords2.x < 0.50){
//   gl_FragColor = vec4(texcoords2.x, 1, 0, 1.0);
// }else if (texcoords2.x > 0.75){
//   gl_FragColor = vec4(texcoords2.x, 0, texcoords2.y, 1.0);
// }else{
//     gl_FragColor = vec4(texcoords2.xy, 0, 1.0);
// }
}

```

{{< /details >}}

{{< details title=".frag" open=false >}}

```js
precision mediump float;

// the texture coordinates varying was defined in
// the vertex shader by treegl readShader()
// open your console and & see!
varying vec2 texcoords2;

void main() {

 gl_FragColor = vec4(0.5, texcoords2.x, texcoords2.y, 1.0);

// if (texcoords2.y > 0.25 && texcoords2.y < 0.50){
//   gl_FragColor = vec4(texcoords2.x, 0,  texcoords2.y, 1.0);
// }else if (texcoords2.y > 0.50 && texcoords2.x > 0.50 && texcoords2.x < 0.75){
//   gl_FragColor = vec4(texcoords2.x, 1,  texcoords2.y, 1.0);
// }else if (texcoords2.y > 0.75 && texcoords2.x < 0.25 ){
//   gl_FragColor = vec4(texcoords2.y, 1,  texcoords2.x, 1.0);
// }else if (texcoords2.y < 0.75 && texcoords2.x > 0.25 && texcoords2.x < 0.50){
//   gl_FragColor = vec4(texcoords2.x, 0, 1, 1.0);
// }else if (texcoords2.y < 0.25 && texcoords2.x < 0.50){
//   gl_FragColor = vec4(texcoords2.x, 1, 0, 1.0);
// }else if (texcoords2.x > 0.75){
//   gl_FragColor = vec4(texcoords2.x, 0, texcoords2.y, 1.0);
// }else{
//     gl_FragColor = vec4(texcoords2.xy, 0, 1.0);
// }
}
```

{{< /details >}}

<br/>

<div align="center">

<iframe src="https://editor.p5js.org/wnarevalor/full/z3Qh5H9Sc" width="500" height="550"></iframe>

</div>

<br/>

{{< details title=".js" open=false >}}

```js
let lumaShader;
let img;
let grey_scale;
let rslider;
let gslider;
let easycam;
let bslider;

function preload() {
  lumaShader = readShader("luma.frag", { varyings: Tree.texcoords2 });
  // image source: https://images.unsplash.com/photo-1610683468005-79e792efddd9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGdsYXNzJTIwcGFuZWx8ZW58MHx8MHx8&w=1000&q=80
  img = loadImage("images/colors.jpg");
}

function setup() {
  createCanvas(600, 800, WEBGL);
  rslider = createSlider(0, 1, 0, 0.01);
  rslider.position(10, 10);
  rslider.style("width", "80px");
  gslider = createSlider(0, 1, 0, 0.01);
  gslider.position(10, 40);
  gslider.style("width", "80px");
  bslider = createSlider(0, 1, 0, 0.01);
  bslider.position(10, 70);
  bslider.style("width", "80px");
  noStroke();
  textureMode(IMAGE);
  shader(lumaShader);
  inverted = createCheckbox("inverse", false);
  inverted.position(width - 100, 10);
  inverted.style("color", "white");
  inverted.input(() => lumaShader.setUniform("inverted", inverted.checked()));
  hsv = createCheckbox("hsv", false);
  hsv.position(width - 100, 30);
  hsv.style("color", "white");
  hsv.input(() => lumaShader.setUniform("hsv", hsv.checked()));
  hsl = createCheckbox("hsl", false);
  hsl.position(width - 100, 50);
  hsl.style("color", "white");
  hsl.input(() => lumaShader.setUniform("hsl", hsl.checked()));
  luma = createCheckbox("luma", false);
  luma.position(width - 100, 70);
  luma.style("color", "white");
  luma.input(() => lumaShader.setUniform("luma", luma.checked()));
  rslider.changed(() => {
    lumaShader.setUniform("r_scale", rslider.value());
  });
  gslider.changed(() => {
    lumaShader.setUniform("g_scale", gslider.value());
  });
  bslider.changed(() => {
    lumaShader.setUniform("b_scale", bslider.value());
  });
  lumaShader.setUniform("texture", img);
}

function draw() {
  background(0);
  quad(
    -width / 2,
    -height / 2,
    width / 2,
    -height / 2,
    width / 2,
    height / 2,
    -width / 2,
    height / 2
  );
}
```

{{< /details >}}

<br/>

{{< details title=".frag" open=false >}}

```js

precision mediump float;

// uniforms are defined and sent by the sketch
uniform bool inverted;
uniform bool hsv;
uniform bool luma;
uniform bool hsl;
uniform float r_scale;
uniform float g_scale;
uniform float b_scale;
uniform sampler2D texture;

// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;

// returns luma of given texel
float lum(vec3 texel) {
  return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
}

float hsvV(vec3 texel){
  return max(max(texel.r, texel.g), texel.b);
}

float hslL(vec3 texel){
  float max = hsvV(texel);
  float min = min(min(texel.r, texel.g), texel.b);
  return (max + min)/2.0;
}

void main() {
  // texture2D(texture, texcoords2) samples texture at texcoords2
  // and returns the normalized texel color
  vec4 texel = texture2D(texture, texcoords2);
  gl_FragColor = inverted ? vec4((vec3(1.0, 1.0, 1.0) - texel.rgb), 1.0) :
   hsv ? vec4(vec3(hsvV(texel.rgb)), 1.0) :
   hsl ? vec4(vec3(hslL(texel.rgb)), 1.0) :
   luma ? vec4(vec3(lum(texel.rgb)), 1.0) :
   vec4(vec3(texel.r - r_scale, texel.g - g_scale, texel.b - b_scale), 1.0);
}

```

{{< /details >}}

<br/>

<div align="center">

<iframe src="https://editor.p5js.org/wnarevalor/full/_d3UIbEF4" width="600" height="800"></iframe>

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
let maskShader;
let img;
let luma;
let video_src;
let video_on;
let mask;

function preload() {
  maskShader = readShader("mask.frag", {
    varyings: Tree.texcoords2,
  });

  //source: https://kushfineart.com/artworks/categories/8/9501-metamorphosis-ii/
  img = loadImage("images/metamorphosis.jpg");
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(650, 550, WEBGL);
  noStroke();
  textureMode(NORMAL);
  mask = createCheckbox("magnifier", false);
  mask.position(10, 10);
  mask.style("color", "white");
  shader(maskShader);
  maskShader.setUniform("texture", img);
  emitTexOffset(maskShader, img, "texOffset");
}

function draw() {
  background(0);
  if (mask.checked()) {
    maskShader.setUniform("magnifier", mask.checked());
    const mx = map(mouseX, 0, width, 0.0, 1.0);
    const my = map(mouseY, 0, height, 0.0, 1.0);
    maskShader.setUniform("uResolution", [width, height]);
    maskShader.setUniform("uMouse", [mx, my]);
  } else {
    maskShader.setUniform("magnifier", mask.checked());
  }

  quad(
    -width / 2,
    -height / 2,
    width / 2,
    -height / 2,
    width / 2,
    height / 2,
    -width / 2,
    height / 2
  );
}
```

{{< /details >}}

<br/>

{{< details title=".frag" open=false >}}

```js
//adapted from https://www.shadertoy.com/view/llsSz7 by wawan60
precision mediump float;

uniform sampler2D texture;
uniform vec2 texOffset;
uniform vec2 uMouse;
uniform bool magnifier;
uniform vec2 uResolution;

// we need our interpolated tex coord
varying vec2 texcoords2;

const float radius=.5;
const float depth=radius/1.8;

void main() {

  vec4 texel = texture2D(texture, texcoords2);
  vec2 uv = gl_FragCoord.xy/(uResolution.xy);
	vec2 center = vec2(uMouse.x, 1.0 - uMouse.y);
	float ax = ((uv.x - center.x)* (uv.x - center.x)) / (0.2 * 0.2) + ((uv.y - center.y) * (uv.y - center.y)) / (0.1/ (  uResolution.x / uResolution.y )) ;
	float dx = (-depth/radius)*ax + (depth/(radius*radius))*ax*ax;
  float f =  (ax + dx);
	if (ax > radius) f = ax;
  vec2 magnifierArea = center + (uv-center)*f/ax;
  vec2 magnifier_r = vec2(magnifierArea.x, 1.0 - magnifierArea.y);
  vec4 color = texture2D(texture, magnifier_r);

  gl_FragColor = magnifier ? vec4(color.rgb, 1.0) : vec4(texel.rgb, 1.0);
}
```

{{< /details >}}

<br/>

<div align="center">

<iframe src="https://editor.p5js.org/wnarevalor/full/Frzgf12RT" width="650" height="550"></iframe>

</div>

<br/>

{{< details title=".js" open=false >}}

```js
let maskShader;
let img;
let luma;
let video_src;
let video_on;
let mask;

function preload() {
  maskShader = readShader("mask.frag", { varyings: Tree.texcoords2 });
  //source: https://images.unsplash.com/photo-1610683468005-79e792efddd9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGdsYXNzJTIwcGFuZWx8ZW58MHx8MHx8&w=1000&q=80
  img = loadImage("images/colors.jpg");
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(600, 800, WEBGL);
  noStroke();
  textureMode(NORMAL);
  other = createCheckbox("region", false);
  other.position(10, 10);
  other.style("color", "white");
  other.input(() => maskShader.setUniform("region", other.checked()));
  luma = createCheckbox("luma", false);
  luma.position(10, 30);
  luma.style("color", "white");
  luma.input(() => maskShader.setUniform("luma", luma.checked()));
  hsv = createCheckbox("hsv", false);
  hsv.position(10, 50);
  hsv.style("color", "white");
  hsv.input(() => maskShader.setUniform("hsv", hsv.checked()));
  sobel = createCheckbox("sobel", false);
  sobel.position(10, 70);
  sobel.style("color", "white");
  emboss = createCheckbox("emboss", false);
  emboss.position(10, 90);
  emboss.style("color", "white");
  shader(maskShader);
  maskShader.setUniform("texture", img);
  emitTexOffset(maskShader, img, "texOffset");
}

function draw() {
  background(0);
  maskShader.setUniform("mask", [0, 0, 0, 0, 1, 0, 0, 0, 0]);
  const mx = map(mouseX, 0, width, 0.0, 1.0);
  const my = map(mouseY, 0, height, 0.0, 1.0);
  maskShader.setUniform("uResolution", [width, height]);
  maskShader.setUniform("uMouse", [mx, my]);

  //kernels taken from https://webglfundamentals.org/webgl/lessons/webgl-image-processing.html
  if (other.checked()) {
    maskShader.setUniform("mask", [-1, -1, -1, -1, 8, -1, -1, -1, -1]);
  } else if (sobel.checked()) {
    maskShader.setUniform("mask", [1, 2, 1, 0, 0, 0, -1, -2, -1]);
  } else if (emboss.checked()) {
    maskShader.setUniform("mask", [-2, -1, 0, -1, 1, 1, 0, 1, 2]);
  } else {
    maskShader.setUniform("mask", [0, 0, 0, 0, 1, 0, 0, 0, 0]);
  }

  quad(
    -width / 2,
    -height / 2,
    width / 2,
    -height / 2,
    width / 2,
    height / 2,
    -width / 2,
    height / 2
  );
}
```

{{< /details >}}

<br/>

{{< details title=".frag" open=false >}}

```js
#ifdef GL_ES
precision mediump float;
#endif

precision mediump float;

uniform sampler2D texture;
uniform vec2 texOffset;
uniform vec2 uMouse;
uniform bool region;
uniform bool luma;
uniform bool hsv;
uniform vec2 uResolution;

// holds the 3x3 kernel
uniform float mask[9];

// we need our interpolated tex coord
varying vec2 texcoords2;

const float radius=0.2;
const float depth=radius/2.;

float lum(vec3 texel) {
  return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
}

float hsvV(vec3 texel){
  return max(max(texel.r, texel.g), texel.b);
}


void main() {
  // 1. Use offset to move along texture space.
  // In this case to find the texcoords of the texel neighbours.
  vec2 tc0 = texcoords2 + vec2(-texOffset.s, -texOffset.t);
  vec2 tc1 = texcoords2 + vec2(         0.0, -texOffset.t);
  vec2 tc2 = texcoords2 + vec2(+texOffset.s, -texOffset.t);
  vec2 tc3 = texcoords2 + vec2(-texOffset.s,          0.0);
  // origin (current fragment texcoords)
  vec2 tc4 = texcoords2 + vec2(         0.0,          0.0);
  vec2 tc5 = texcoords2 + vec2(+texOffset.s,          0.0);
  vec2 tc6 = texcoords2 + vec2(-texOffset.s, +texOffset.t);
  vec2 tc7 = texcoords2 + vec2(         0.0, +texOffset.t);
  vec2 tc8 = texcoords2 + vec2(+texOffset.s, +texOffset.t);

  // 2. Sample texel neighbours within the rgba array
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

  // 3. Apply convolution kernel


  vec4 color = texture2D(texture, texcoords2);
  vec2 uv = gl_FragCoord.xy/(uResolution.xy);
	vec2 center = vec2(uMouse.x, 1.0 - uMouse.y);

  if(distance(uv, center) < radius){
    vec4 convolution;
    for (int i = 0; i < 9; i++) {
      convolution += rgba[i]*mask[i];
    }

    if (region){
    gl_FragColor = vec4(vec3(convolution.r+convolution.g+convolution.b)/3.0, 1.0);
    }else if (luma){
      gl_FragColor = vec4(vec3(lum(color.rgb)), 1.0);
    }else if(hsv){
      gl_FragColor = vec4(vec3(hsvV(color.rgb)), 1.0);
    }else{
     gl_FragColor = vec4(convolution.rgb, 1.0);
    }
  }else{
     gl_FragColor = vec4(color.rgb, 1.0);
  }
}


```

{{< /details >}}

<br/>

<div align="center">

<iframe src="https://editor.p5js.org/wnarevalor/full/c-HU5MlXB" width="600" height="800"></iframe>

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
let truchetShader;
let x = 0;

function preload() {
  // shader adapted from here: https://thebookofshaders.com/09/
  truchetShader = readShader("truchet.frag", {
    matrices: Tree.NONE,
    varyings: Tree.NONE,
  });
}

function setup() {
  createCanvas(700, 700, WEBGL);
  // create frame buffer object to render the procedural texture
  pg = createGraphics(700, 700, WEBGL);
  // textureMode(NORMAL);
  // noStroke();
  noStroke();
  textureMode(NORMAL);
  pg.noStroke();
  pg.shader(truchetShader);
  pg.emitResolution(truchetShader);
  truchetShader.setUniform("u_zoom", 3);
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);

  texture(pg);
}

function draw() {
  background(33);
  orbitControl();
  // rotateX(millis() / 1000);
  // rotateY(millis() / 1000);
  emitMousePosition(truchetShader, "mouse");
  truchetShader.setUniform("u_time", float(millis() / 50.0));
  box(300, 300);
}

function mouseMoved() {
  //manual time update on mouse moved
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
}
```

{{< /details >}}

<br/>

{{< details title=".frag" open=false >}}

```js
//taken from https://www.shadertoy.com/view/lsl3RH
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform float u_time;
// uniform float u_zoom;

const mat2 m = mat2( 0.80,  0.60, -0.60,  0.80 );
float noise( in vec2 p )
{
	return sin(p.x)*sin(p.y);
}

float fbm4( vec2 p )
{
    float f = 0.0;
    f += 0.5000*noise( p ); p = m*p*2.02;
    f += 0.2500*noise( p ); p = m*p*2.03;
    f += 0.1250*noise( p ); p = m*p*2.01;
    f += 0.0625*noise( p );
    return f/0.9375;
}

float fbm6( vec2 p )
{
    float f = 0.0;
    f += 0.500000*(0.5+0.5*noise( p )); p = m*p*2.02;
    f += 0.250000*(0.5+0.5*noise( p )); p = m*p*2.03;
    f += 0.125000*(0.5+0.5*noise( p )); p = m*p*2.01;
    f += 0.062500*(0.5+0.5*noise( p )); p = m*p*2.04;
    f += 0.031250*(0.5+0.5*noise( p )); p = m*p*2.01;
    f += 0.015625*(0.5+0.5*noise( p ));
    return f/0.96875;
}

vec2 fbm4_2( vec2 p )
{
    return vec2(fbm4(p), fbm4(p+vec2(7.8)));
}

vec2 fbm6_2( vec2 p )
{
    return vec2(fbm6(p+vec2(16.8)), fbm6(p+vec2(11.5)));
}

//====================================================================

float fck( vec2 q, out vec4 ron )
{
    q += 0.03*sin( vec2(0.27,0.23)*u_time + length(q)*vec2(4.1,4.3));

	vec2 o = fbm4_2( 0.9*q );

    o += 0.04*sin( vec2(0.12,0.14)*u_time + length(o));

    vec2 n = fbm6_2( 3.0*o );

	ron = vec4( o, n );

    float f = 0.5 + 0.5*fbm4( 1.8*q + 6.0*n );

    return mix( f, f*f*f*3.5, f*abs(n.x) );
}

void main(void )
{
    vec2 p = (2.0*gl_FragCoord.xy-u_resolution.xy)/u_resolution.y;
    float e = 2.0/u_resolution.y;
    vec4 on = vec4(0.0);
    float f = fck(p, on);

	vec3 col = vec3(0.0);
    col = mix( vec3(0.2,0.1,0.4), vec3(0.3,0.05,0.05), f );
    col = mix( col, vec3(0.9,0.9,0.9), dot(on.zw,on.zw) );
    col = mix( col, vec3(0.4,0.3,0.3), 0.2 + 0.5*on.y*on.y );
    col = mix( col, vec3(0.0,0.2,0.4), 0.5*smoothstep(1.2,1.3,abs(on.z)+abs(on.w)) );
    col = clamp( col*f*2.0, 0.0, 1.0 );

#if 0
    // gpu derivatives - bad quality, but fast
	vec3 nor = normalize( vec3( dFdx(f)*u_resolution.x, 6.0, dFdy(f)*u_resolution.y ) );
#else
    // manual derivatives - better quality, but slower
    vec4 kk;
 	vec3 nor = normalize( vec3( fck(p+vec2(e,0.0),kk)-f,
                                2.0*e,
                                fck(p+vec2(0.0,e),kk)-f ) );
#endif

    vec3 lig = normalize( vec3( 0.9, 0.2, -0.4 ) );
    float dif = clamp( 0.3+0.7*dot( nor, lig ), 0.0, 1.0 );
    vec3 lin = vec3(0.90,0.90,0.40)*(nor.y*0.5+0.5) + vec3(0.15,0.10,0.05)*dif;
    col *= 1.2*lin;
	col = 1.0 - col;
	col = 1.1*col*col*col;

    gl_FragColor = vec4( col, 1.0 );
}

```

{{< /details >}}

<br/>

<div align="center">

<iframe src="https://editor.p5js.org/wnarevalor/full/swcDtHReC" width="700" height="700"></iframe>

</div>

<br/>

{{< details title=".frag" open=false >}}

```js
//taken from https://www.shadertoy.com/view/4s23zz
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform float u_time;

#define AA 1


float hash(vec2 p)  // replace this by something better
{
    p  = fract( p*0.6180339887 );
    p *= 25.0;
    return fract( p.x*p.y*(p.x+p.y) );
}

// consider replacing this by a proper noise function
float noise( in vec2 x )
{
    vec2 p = floor(x);
    vec2 f = fract(x);
    f = f*f*(3.0-2.0*f);
    float a = hash(p+vec2(0,0));
	float b = hash(p+vec2(1,0));
	float c = hash(p+vec2(0,1));
	float d = hash(p+vec2(1,1));
    return mix(mix( a, b,f.x), mix( c, d,f.x),f.y);
}

const mat2 mtx = mat2( 0.80,  0.60, -0.60,  0.80 );

float fbm4( vec2 p )
{
    float f = 0.0;
    f += 0.5000*(-1.0+2.0*noise( p )); p = mtx*p*2.02;
    f += 0.2500*(-1.0+2.0*noise( p )); p = mtx*p*2.03;
    f += 0.1250*(-1.0+2.0*noise( p )); p = mtx*p*2.01;
    f += 0.0625*(-1.0+2.0*noise( p ));
    return f/0.9375;
}

float fbm6( vec2 p )
{
    float f = 0.0;
    f += 0.500000*noise( p ); p = mtx*p*2.02;
    f += 0.250000*noise( p ); p = mtx*p*2.03;
    f += 0.125000*noise( p ); p = mtx*p*2.01;
    f += 0.062500*noise( p ); p = mtx*p*2.04;
    f += 0.031250*noise( p ); p = mtx*p*2.01;
    f += 0.015625*noise( p );
    return f/0.96875;
}

vec2 fbm4_2( vec2 p )
{
    return vec2( fbm4(p+vec2(1.0)), fbm4(p+vec2(6.2)) );
}

vec2 fbm6_2( vec2 p )
{
    return vec2( fbm6(p+vec2(9.2)), fbm6(p+vec2(5.7)) );
}

float func( vec2 q, out vec2 o, out vec2 n )
{
    q += 0.05*sin(vec2(0.11,0.13)*u_time + length( q )*4.0);

    q *= 0.7 + 0.2*cos(0.05*u_time);

    o = 0.5 + 0.5*fbm4_2( q );

    o += 0.02*sin(vec2(0.13,0.11)*u_time*length( o ));

    n = fbm6_2( 4.0*o );

    vec2 p = q + 2.0*n + 1.0;

    float f = 0.5 + 0.5*fbm4( 2.0*p );

    f = mix( f, f*f*f*3.5, f*abs(n.x) );

    f *= 1.0-0.5*pow( 0.5+0.5*sin(8.0*p.x)*sin(8.0*p.y), 8.0 );

    return f;
}

float funcs( in vec2 q )
{
    vec2 t1, t2;
    return func(q,t1,t2);
}

void main(void )
{
    vec3 tot = vec3(0.0);
#if AA>1
    for( int mi=0; mi<AA; mi++ )
    for( int ni=0; ni<AA; ni++ )
    {
        // pixel coordinates
        vec2 of = vec2(float(mi),float(ni)) / float(AA) - 0.5;
        vec2 q = (2.0*(gl_FragCoord+of)-u_resolution.xy)/u_resolution.y;
#else
        vec2 q = (2.0*gl_FragCoord.xy-u_resolution.xy)/u_resolution.y;
#endif

        vec2 o, n;
        float f = func(q, o, n);

        vec3 col = vec3(0.2,0.1,0.4);
        col = mix( col, vec3(0.3,0.05,0.05), f );
        col = mix( col, vec3(0.9,0.9,0.9), dot(n,n) );
        col = mix( col, vec3(0.5,0.2,0.2), 0.5*o.y*o.y );
        col = mix( col, vec3(0.0,0.2,0.4), 0.5*smoothstep(1.2,1.3,abs(n.y)+abs(n.x)) );
        col *= f*2.0;

        vec2 ex = vec2( 1.0 / u_resolution.x, 0.0 );
        vec2 ey = vec2( 0.0, 1.0 / u_resolution.y );
        #if AA>1
        ex /= float(AA);
        ey /= float(AA);
        #endif
        vec3 nor = normalize( vec3( funcs(q+ex) - f, ex.x, funcs(q+ey) - f ) );

        vec3 lig = normalize( vec3( 0.9, -0.2, -0.4 ) );
        float dif = clamp( 0.3+0.7*dot( nor, lig ), 0.0, 1.0 );

        vec3 lin  = vec3(0.85,0.90,0.95)*(nor.y*0.5+0.5);
             lin += vec3(0.15,0.10,0.05)*dif;

        col *= lin;
        col = vec3(1.0)-col;
        col = col*col;
        col *= vec3(1.2,1.25,1.2);

        tot += col;
#if AA>1
    }
    tot /= float(AA*AA);
#endif

	vec2 p = gl_FragCoord.xy / u_resolution.xy;
	tot *= 0.5 + 0.5 * sqrt(16.0*p.x*p.y*(1.0-p.x)*(1.0-p.y));

	gl_FragColor = vec4( tot, 1.0 );
}

```

{{< /details >}}

<br/>

<div align="center">

<iframe src="https://editor.p5js.org/wnarevalor/full/1QGOKGsSI" width="700" height="700"></iframe>

</div>

<br/>

## **IV. Conclusiones**

## **V. Referencias**

- Wikipedia contributors. (2022, 22 abril). Texture mapping. Wikipedia. https://en.wikipedia.org/wiki/Texture_mapping. [Wikipedia](https://en.wikipedia.org/wiki/Texture_mapping)
