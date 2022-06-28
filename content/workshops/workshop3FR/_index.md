---
date: 2022-04-02
linktitle: Workshop 3 FR
title: Workshop3FR
---

# **Shaders**

<div style="text-align: justify">

## **Texturing and Coloring**

## **I. Introducción**

Las texturas y su respectivo mapeo en diferentes objetos dan la posibilidad de entender mejor la realidad de estos y modelarlos a nivel de proceso. En esta sección, encontraremos una explicación simple a este proceso y cuáles son los posibles factores, conceptos o parámetros que se deben tener en cuenta cuando se habla de textura, color, formas y mapeo.

## **II. Contextualización**

En primer lugar, el mapeo UV de una textura a un objeto o forma es el proceso de transformación que afrontan las coordenadas de la textura. Las coordenadas UV como las coordenadas de la imagen o gráfico de textura en dos dimensiones deben mapearse a las coordenadas y, z y x si es el caso de un objeto tridimensional. Para este proceso, los shaders construidos y presentados en este informe utilizan la librería de ``p5.treegl`` para la ubicación de las coordenadas ``Tree.texcoords2``.  

En cuanto al color y cómo se ve este representado a niveles de programación, este se obtiene en el shader desde la textura y utilizando las coordenadas del vertice o de la librería (como en este caso) se obtiene un vector con los valores de color RGB junto con el alpha. En el primer ejemplo construido, realizamos un gradiente utilizando canales de color con una intensidad acorde a las coordenadas y mapeando a un conjunto de elipses en dos dimensiones.
En el segundo ejemplo construido, utilizamos una imagen como textura y obtenemos el vector de color o texel para la creación de filtros acordes a la luminosidad. El filtro Luma sirve como una referencia a la luminosidad y su implementación está inspirada en la sección de texturing de Visual Computing. El filtro HSV valor V es un ejemplo sencillo ya que toma el mayor valor en los canales de color, mientras que el filtro de interpolado utiliza tanto color como las coordenadas UV para determinar el resultado final del píxel.      

## **III. Resultados**

La implementación utilizando p5.js y el editor web realizada para los casos anteriores se muestra a continuación:

{{< details title=".js" open=false >}}

```js
let uvShader;
let selection_box;

function preload() {
  uvShader = readShader('shaders/uv.frag', { matrices: Tree.pmvMatrix, varyings: Tree.texcoords2 });
}

function setup() {
  createCanvas(300, 300, WEBGL);
  noStroke();
  textureMode(NORMAL);
  selection_box = createSelect();
  selection_box.position(10, 10);
  selection_box.style('color', 'black');
  selection_box.option('None');
  selection_box.option('RG');
  selection_box.option('GB');
  selection_box.option('RB');
  selection_box.changed(changeSelection);
}

function draw() {
  background(1);
  shader(uvShader);
  quad(-width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2);
  noStroke();
  for (let i = 0; i < 10; i ++) {
    shader(uvShader);
    ellipse(0, 0, 20, 80, 1000);
    rotate(PI/5);
  }
}

function changeSelection() {
    let val = selection_box.value();
    if (val == 'RG') {
        uvShader.setUniform('GB', false);
        uvShader.setUniform('RB', false);
        uvShader.setUniform('RG', true);
    } else if (val == 'GB') {
        uvShader.setUniform('RG', false);
        uvShader.setUniform('RB', false);
        uvShader.setUniform('GB', true);
    } else if (val == 'RB') {
        uvShader.setUniform('RG', false);
        uvShader.setUniform('GB', false);
        uvShader.setUniform('RB', true);
    } else {
        uvShader.setUniform('RG', false);
        uvShader.setUniform('GB', false);
        uvShader.setUniform('RB', false);
    }
}
```

{{< /details >}}

<br/>

{{< details title=".frag" open=false >}}

```js
precision mediump float;

varying vec2 texcoords2;
uniform bool RG;
uniform bool GB; 
uniform bool RB; 

void main() {
  if(RG) {
    gl_FragColor = vec4(texcoords2.yx, 0.0, 1.0);
  } else if (GB) {
    gl_FragColor = vec4(0.0, texcoords2.xy, 1.0);
  } else if (RB) {
    gl_FragColor = vec4(texcoords2.x, 0.0, texcoords2.y, 1.0);
  } 
}
```

{{< /details >}}

<br/>

<div align="center">

<iframe src="https://editor.p5js.org/jrojasce/full/4IdUKC96t" width="310" height="350"></iframe>

</div>

<br/>

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

## **Image Processing**

## **I. Introducción**

El procesamiento de imágenes es una actividad en donde se aplican variedades de procesos a imágenes digitales para obtener o generar efectos e información. Esta actividad se realiza a nivel de píxeles y por tanto es computacionalmente costosa dependiendo de la resolución de la imagen.  
Por tanto, las tarjetas gráficas son el dispositivo ideal para realizar estos procesamientos debido a su capacidad de cómputo y los programas o softwares dedicados deben ser idealmente construidos para que se adapten a este dispositivo y generar así un mejor rendimiento como es el caso de los shaders.     

## **II. Contextualización**

En primer lugar, se generó un efecto BLUR o de desefonque utilizando como guía la convolución presentada en la sección de Image Processing - Visual Computing que utilizaba los 'vecinos' o píxeles alrededor del actual para calcular un resultado dada una máscara o kernel de cierto filtro. La máscara utilizada en BLUR es una específica para generar este efecto: [1 / 16, 1 / 8, 1 / 16, 1 / 8, 1 / 4, 1 / 8, 1 / 16, 1 / 8, 1 / 16]. Es importante notar que la obtención de los vecinos está considerando que para aquellos píxeles en el borde no se obtendrá un resultado distinto en el cálculo de color si el píxel vecino no es encontrado.  

También fue implementado un magnifier o un efecto de lupa, inspirado en un shader de ShaderToy que utiliza un efecto de círculo para el ampliamiento de una región de píxeles sin perder la completitud de la imagen utilizando un parámetro de profundidad y un radio de la región amplificada.  

Por último, utilizamos un cálculo de distancias en el shader mediante la función ``distance()`` para generar un círculo con el aplicado de un filtro y/o máscara de detección de bordes a una región de interés limitada en la imagen que es variable y dependiente de la posición actual del mouse en el programa.  

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

## **Procedural Texturing**

## **I. Introducción**

Las texturas son comúnmente identificadas como simples imágenes precargadas y sin embargo, es posible generar una textura a partir de un patrón algorítmico y posteriormente realizar el mapeo de este a un objeto o forma. Es necesario utilizar un espacio fuera de pantalla para renderizar y generar la textura y el espacio de pantalla donde se presetarán los resultados del mapeo.    

## **II. Contextualización**

En esta sección fue creada una textura inspirada en un patrón hexagonal tomado de Shadertoy y mapeada a una esfera. Es importante resaltar que el patrón original utiliza el tiempo del programa en segundos como parámetro para la visualización de un fenómeno o ilusión óptica que involucra los colores blanco y negro junto con una percepción de relieve y completitud. Sin embargo, esta adaptación utiliza la posición del mouse en el programa para mapear a valores del 1 a 10 y utilizar una función sinusiodal que reproduce resultados entre 0 y 1 para generar los valores negros y blancos en repetidas ocasiones durante una única interacción completa del mouse en el programa.  

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

Para concluir, este informe puede resaltar la importancia y motivación en cuando a renderización en los shaders ya que estos ejercicios son reproducibles de una manera oportuna y eficiente debido al uso del tipo de hardware adecuado. También, es posible resaltar que librerías como p5.js y Treegl son realmente útiles y dan soluciones muy simples a problemáticas complejas como lo es computación visual, es por esto que la reproducción de códigos y creación de shaders es obsoleta si no se tienen unas bases claras en cuanto al medio/bajo nivel de conceptos como la rasterización. 


## **V. Referencias**

- Treegl | Visual Computing. (2022). GitHub - VisualComputing/p5.treegl. GitHub. https://github.com/VisualComputing/p5.treegl [Visual Computing](https://github.com/VisualComputing/p5.treegl)
- Texturing | Visual Computing. (2022, 7 junio). Visual Computing. https://visualcomputing.github.io/docs/shaders/texturing/ [Visual Computing](https://visualcomputing.github.io/docs/shaders/texturing/)
- Wikipedia contributors. (2022, 26 abril). Gaussian blur. Wikipedia. https://en.wikipedia.org/wiki/Gaussian_blur [Wikipedia](https://en.wikipedia.org/wiki/Gaussian_blur)
- Image Processing | Visual Computing. (2022, 6 junio). Visual Computing. https://visualcomputing.github.io/docs/shaders/image_processing/ [Visual Computing](https://visualcomputing.github.io/docs/shaders/image_processing/)
- Shadertoy. (2022). Magnifier. https://www.shadertoy.com/view/llsSz7 [Shadertoy](https://www.shadertoy.com/view/llsSz7)
- Shadertoy. (2022). Hexagonal. https://www.shadertoy.com/view/Wstfzj [Shadertoy](https://www.shadertoy.com/view/Wstfzj)