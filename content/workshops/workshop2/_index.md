---
date: 2022-04-02
linktitle: Workshop 2
title: Workshop2
---

# **Texture Mapping and Finger Tracking with ML5 MediaPipe Hands**
<div style="text-align: justify">

## **Texture Mapping**

## **I. Introducción** 

El mapeo de texturas es el método con el cual se realiza el detallado de color a un objeto 3D. Actualmente, se han desarrollado mapeos más complejos implicando diferentes tipos de transformaciones y polígonos como el mapeo de reflexión, relieve, entre otros.  
El proceso consiste en la obtención de una imagen mediante fotografía digital o escaneo y su manipulación mediante software para ser utilizada. Posteriormente, la aplicación es el mapeo de vértices del polígono a una coordenada de textura. 
El mapeado UV consiste en el mapeado de un plano 2D a un tríangulo, ubicando los tres vertices del tríangulo en la imagen, con coordenadas normalizadas en la imagen y calculando los puntos interiores utilizando coordenadas báricentricas, se presentará su correspondiente implementación bajo nivel junto con mapeos de medio y alto nivel en JavaScript utilizando la biblioteca de p5.js y WEBGL.     

## **II. Contextualización**  

### **Mapeo de Alto Nivel**
El primer mapeo de textura consiste en una esfera (sólido de revolución y no polígono) y una imagen de la tierra [figura 1] a alto nivel mediante el uso de las funciones ```texture()``` y ```sphere()```. 

<div align="center"> 

![Tierra](https://lh6.googleusercontent.com/IwEkyWS6TCXKxJWlsIaylCZT53k3i6nhXs2xo6Fduap28MgLZMyypiK9KHvJDi7APkDkzh5-80y3i1PdPL_XeCn72HspV9z_jTThXpG3VCee0NUoJ_RBezRKSBWXn6YtgbBKPhL23x1ruQImzQ)  

*Figura 1. Plano 2D de la tierra. Tomado de : [Planet Texture Maps](http://planetpixelemporium.com/planets.html)* 

</div>

### **Mapeo de Medio Nivel**
El segundo mapeo de textura consiste en una esfera (sólido de revolución y no polígono) y una imagen de la tierra [figura 1] a medio nivel mediante el uso de las funciones ```texture()```, ```beginShape()``` y ```endShape()```.  

Para realizar la esfera, utilizamos los conceptos de mapeo entre longitud/latitud en un plano 2D a la esfera utilizando ángulos.  
Los valores de longitud y latitud estarán:  

- Longitud entre 0 y 360 grados.
- Latitud entre 0 y 180 grados.   
  
Buscamos mapear los valores de (r,lat,long) a  (x,y,z). 
- x = r sin(lat) cos(long)
- y = r sin(lat) sin(long)
- z = r cos(lat)

{{< details title="p5-instance-div markdown" open=false >}}
```js
  const globe = [];
  const r = 200;
  const total = 25;
  let angleX = 0;
  let angleY = 0;

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

    for (let i = 0; i < total; i++) {
      beginShape(TRIANGLE_STRIP);
      for (let j = 0; j < total + 1; j++) {
        const v1 = globe[i][j];
        vertex(v1.x, v1.y, v1.z);
        const v2 = globe[i + 1][j];
        vertex(v2.x, v2.y, v2.z);
      }
      endShape();
    }

    angleX += 0.005;
    angleY += 0.006;
  }
```
{{< /details >}}

<br/>

<div align="center"> 

{{< p5-global-iframe id="sphere" width="520" height="530" >}}
  const globe = [];
  const r = 200;
  const total = 25;
  let angleX = 0;
  let angleY = 0;

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

    for (let i = 0; i < total; i++) {
      beginShape(TRIANGLE_STRIP);
      for (let j = 0; j < total + 1; j++) {
        const v1 = globe[i][j];
        vertex(v1.x, v1.y, v1.z);
        const v2 = globe[i + 1][j];
        vertex(v2.x, v2.y, v2.z);
      }
      endShape();
    }

    angleX += 0.005;
    angleY += 0.006;
  }
{{< /p5-global-iframe >}} 

*Figura 2. Esfera construida a bajo nivel.* 

</div>

Por último, es necesario establecer el modo de textura normalizado y dividir nuestros valores de longitud (coordenada x) y latitud (coordenada y) entre el número total de vértices para darles un valor entre 0 y 1. 

### **Mapeo de Bajo Nivel**
El tercer mapeo de textura consiste en interpolar a bajo nivel los pixeles de una imagen de la tierra [figura 1] en un plano 2D con los triángulos que conforman el *mesh* de la esfera mediante el uso de las coordenadas baricéntricas, donde a partir de los *(x, y)* de tres vértices adyacentes, se calculan las coordenadas baricéntricas para los triángulos que conforman, y se interpola el valor RGBA de cada pixel. De esta manera se comprende mejor como las proporciones de la textura original se modifican de acuerdo a la superficie que se busca texturizar.

## **III. Resultados**

La implementación utilizando p5.js realizada para los casos anteriores se muestra a continuación: 

{{< details title="p5-instance-div markdown" open=false >}}
```js
  let angleX = 0;
  let angleY = 0;

  function preload() {
      earth = loadImage('https://lh6.googleusercontent.com/MKWuIXLwcIXgwmrKrnjgCFEjna_8kFePKfWJlhOQLpBZ3pagPVPjxyHxZPHs2CTGMm1sdKLx_WGkjVhnDF_L9EQbata6o2Cw0dtIvNYz-yQG_YJXNfpWff_HbdsNtqkWAia6jwG7aLWDbJbn6w');
  }

  function setup() {
      createCanvas(500, 500, WEBGL);
      noStroke();
  }

  function draw() {
      background(51);
      rotateX(angleX);
      rotateY(angleY);

      textureMode(NORMAL);
      texture(earth);

      sphere(200);

      angleX += 0.005;
      angleY += 0.006;
  }
```
{{< /details >}}

<br/>

<div align="center"> 

{{< p5-global-iframe id="sphereSun" width="520" height="530" >}}
  let angleX = 0;
  let angleY = 0;

  function preload() {
      earth = loadImage('https://lh6.googleusercontent.com/MKWuIXLwcIXgwmrKrnjgCFEjna_8kFePKfWJlhOQLpBZ3pagPVPjxyHxZPHs2CTGMm1sdKLx_WGkjVhnDF_L9EQbata6o2Cw0dtIvNYz-yQG_YJXNfpWff_HbdsNtqkWAia6jwG7aLWDbJbn6w');
  }

  function setup() {
      createCanvas(500, 500, WEBGL);
      noStroke();
  }

  function draw() {
      background(51);
      rotateX(angleX);
      rotateY(angleY);

      textureMode(NORMAL);
      texture(earth);

      sphere(200);

      angleX += 0.005;
      angleY += 0.006;
  }  
{{< /p5-global-iframe >}} 

*Figura 3. Esfera mapeada con la imagen de la tierra a alto nivel.* 

</div>

<br/>

{{< details title="p5-instance-div markdown" open=false >}}
```js
  const globe = [];
  const r = 200;
  const total = 50;
  let angleX = 0;
  let angleY = 0;

  function preload() {
      earth = loadImage('https://lh6.googleusercontent.com/IwEkyWS6TCXKxJWlsIaylCZT53k3i6nhXs2xo6Fduap28MgLZMyypiK9KHvJDi7APkDkzh5-80y3i1PdPL_XeCn72HspV9z_jTThXpG3VCee0NUoJ_RBezRKSBWXn6YtgbBKPhL23x1ruQImzQ');
  }

  function setup() {
      createCanvas(500, 500, WEBGL);
      noFill();
      noStroke();

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

      textureMode(NORMAL);
      texture(earth);
      scale(-1,1);

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
```
{{< /details >}}

<br/>

<div align="center"> 

{{< p5-global-iframe id="sphereEarth" width="520" height="530" >}}
  const globe = [];
  const r = 200;
  const total = 50;
  let angleX = 0;
  let angleY = 0;

  function preload() {
      earth = loadImage('https://lh6.googleusercontent.com/IwEkyWS6TCXKxJWlsIaylCZT53k3i6nhXs2xo6Fduap28MgLZMyypiK9KHvJDi7APkDkzh5-80y3i1PdPL_XeCn72HspV9z_jTThXpG3VCee0NUoJ_RBezRKSBWXn6YtgbBKPhL23x1ruQImzQ');
  }

  function setup() {
      createCanvas(500, 500, WEBGL);
      noFill();
      noStroke();

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

      textureMode(NORMAL);
      texture(earth);
      scale(-1,1);

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
{{< /p5-global-iframe >}} 

*Figura 4. Esfera mapeada con la imagen de la tierra a medio nivel.* 

</div>

<br/>


<br/>

{{< details title="p5-instance-div markdown" open=false >}}
```js
  const globe = [];
  const r = 20;
  const COLORS = 4;
  const ROWS = 400;
  const COLS = 400;
  let earth;
  let triangleWidth;
  let triangleHeight;
  let matrix = [];

  let pg;

    function preload() {
      earth = loadImage('https://lh6.googleusercontent.com/MKWuIXLwcIXgwmrKrnjgCFEjna_8kFePKfWJlhOQLpBZ3pagPVPjxyHxZPHs2CTGMm1sdKLx_WGkjVhnDF_L9EQbata6o2Cw0dtIvNYz-yQG_YJXNfpWff_HbdsNtqkWAia6jwG7aLWDbJbn6w');
    }

    function setup() {
      earth.loadPixels();
      createCanvas(COLS * earth.width / earth.height, ROWS * earth.width / earth.height);
      pixelDensity(1);
      pg = createGraphics(earth.width, earth.height);
      pg.pixelDensity(1);

      noLoop(); 
      noFill();
      strokeWeight(2);
      stroke(200);

      triangleWidth = earth.width / COLS;
      triangleHeight = earth.height / ROWS;
      
      for (let i = 0; i < earth.height; i++) {
        matrix.push([]);
        for (let j = 0; j < earth.width; j++) {
          matrix[i].push([]);
          for (let c = 0; c < COLORS; c++) {
            matrix[i][j][c] = c;
          }
        }
      }
      let index = 0, row = 0, col = 0;
      while (index < earth.pixels.length && row < earth.height && col < earth.width) {
        matrix[row][col][index % COLORS] = earth.pixels[index];
        if ((col + 1) >= earth.width) {
          row++;
          col = 0;
        } else if (index % COLORS == 0) {
          col = (col + 1) % earth.width;
        }
        index++;
      }
      pg.loadPixels();
      triangles();
      pg.updatePixels();
      
    }

    function draw() {
      background(51);
      image(pg, 0, 0, width, height);
    }

  function triangles() {
    for (let i = 0; i < ROWS - 1; i++) {
        for (let j = 0; j < COLS - 1; j++) {
          interpolateTrianglePixels(i, j);
        }
    }
  }

  function interpolateTrianglePixels(row, col) {
    const row0 = row,     col0 = col;
    const row1 = row + 1, col1 = col;
    const row2 = row,     col2 = col + 1;
    const row3 = row + 1, col3 = col + 1;
    const row0Pix = floor(row0 * triangleHeight), col0Pix = floor(col0 * triangleWidth);
    const row1Pix = floor(row1 * triangleHeight), col1Pix = floor(col1 * triangleWidth);
    const row2Pix = floor(row2 * triangleHeight), col2Pix = floor(col2 * triangleWidth);
    const row3Pix = floor(row3 * triangleHeight), col3Pix = floor(col3 * triangleWidth);
    const r = 0, g = 1, b = 2, a = 3;
    const color0 = color(
      matrix[row0Pix][col0Pix][r],
      matrix[row0Pix][col0Pix][g],
      matrix[row0Pix][col0Pix][b],
      matrix[row0Pix][col0Pix][a]
    );
    const color1 = color(
      matrix[row1Pix][col1Pix][r],
      matrix[row1Pix][col1Pix][g],
      matrix[row1Pix][col1Pix][b],
      matrix[row1Pix][col1Pix][a]
    );
    const color2 = color(
      matrix[row2Pix][col2Pix][r],
      matrix[row2Pix][col2Pix][g],
      matrix[row2Pix][col2Pix][b],
      matrix[row2Pix][col2Pix][a]
    );
    const color3 = color(
      matrix[row3Pix][col3Pix][r],
      matrix[row3Pix][col3Pix][g],
      matrix[row3Pix][col3Pix][b],
      matrix[row3Pix][col3Pix][a]
    );
    for (let i = row0Pix; i < row3Pix; i++) {
      for (let j = col0Pix; j < col3Pix; j++) {
        let coordsT1 = barycentric_coords(i, j, row0Pix, col0Pix, row1Pix, col1Pix, row2Pix, col2Pix);
        let coordsT2 = barycentric_coords(i, j, row1Pix, col1Pix, row2Pix, col2Pix, row3Pix, col3Pix);
        setPixelColorValues(coordsT1, {
          color0: color1,
          color1: color2,
          color2: color0,
        }, { i, j });
        setPixelColorValues(coordsT2, {
          color0: color1,
          color1: color2,
          color2: color3,
        }, { i, j });
      }
    }
  }

  function setPixelColorValues(coords, colors, pixelIndexes) {
    const { i, j } = pixelIndexes;
    const { color0, color1, color2 } = colors;
    const r = 0, g = 1, b = 2, a = 3;
    if (coords.w0 >= 0 && coords.w1 >= 0 && coords.w2 >= 0) {
      redVal = red(color0) + coords.w1 * (red(color1) - red(color0))
              + coords.w2 * (red(color2) - red(color1));
      greenVal = green(color0) + coords.w1 * (green(color1) - green(color0))
                + coords.w2 * (green(color2) - green(color1));
      blueVal = blue(color0) + coords.w1 * (blue(color1) - blue(color0))
                + coords.w2 * (blue(color2) - blue(color1));
      alphaVal = alpha(color0) + coords.w1 * (alpha(color1) - alpha(color0))
                + coords.w2  * (alpha(color2) - alpha(color1));
      pgIndex = (i * earth.width + j) * COLORS;
      pg.pixels[pgIndex + r] = redVal;
      pg.pixels[pgIndex + g] = greenVal;
      pg.pixels[pgIndex + b] = blueVal;
      pg.pixels[pgIndex + a] = alphaVal;
    }
  }

  function barycentric_coords(row, col, row0, col0, row1, col1, row2, col2) {
    let edges = edge_functions(row, col, row0, col0, row1, col1, row2, col2);
    let area = parallelogram_area(row0, col0, row1, col1, row2, col2);
    return { w0: edges.e12 / area, w1: edges.e20 / area, w2: edges.e01 / area };
  }

  function parallelogram_area(row0, col0, row1, col1, row2, col2) {
    return (col1 - col0) * (row2 - row0) - (col2 - col0) * (row1 - row0);
  }

  function edge_functions(row, col, row0, col0, row1, col1, row2, col2) {
    let e01 = (row0 - row1) * col + (col1 - col0) * row + (col0 * row1 - row0 * col1);
    let e12 = (row1 - row2) * col + (col2 - col1) * row + (col1 * row2 - row1 * col2);
    let e20 = (row2 - row0) * col + (col0 - col2) * row + (col2 * row0 - row2 * col0);
    return { e01, e12, e20 };
  }
```
{{< /details >}}

<br/>

<div align="center"> 

{{< p5-global-iframe id="sphereEarth" width="600" height="600" >}}
  const globe = [];
  const r = 20;
  const COLORS = 4;
  const ROWS = 400;
  const COLS = 400;
  let earth;
  let triangleWidth;
  let triangleHeight;
  let matrix = [];

  let pg;

    function preload() {
      earth = loadImage('https://lh6.googleusercontent.com/MKWuIXLwcIXgwmrKrnjgCFEjna_8kFePKfWJlhOQLpBZ3pagPVPjxyHxZPHs2CTGMm1sdKLx_WGkjVhnDF_L9EQbata6o2Cw0dtIvNYz-yQG_YJXNfpWff_HbdsNtqkWAia6jwG7aLWDbJbn6w');
    }

    function setup() {
      earth.loadPixels();
      createCanvas(COLS * earth.width / earth.height, ROWS * earth.width / earth.height);
      pixelDensity(1);
      pg = createGraphics(earth.width, earth.height);
      pg.pixelDensity(1);

      noLoop(); 
      noFill();
      strokeWeight(2);
      stroke(200);

      triangleWidth = earth.width / COLS;
      triangleHeight = earth.height / ROWS;
      
      for (let i = 0; i < earth.height; i++) {
        matrix.push([]);
        for (let j = 0; j < earth.width; j++) {
          matrix[i].push([]);
          for (let c = 0; c < COLORS; c++) {
            matrix[i][j][c] = c;
          }
        }
      }
      let index = 0, row = 0, col = 0;
      while (index < earth.pixels.length && row < earth.height && col < earth.width) {
        matrix[row][col][index % COLORS] = earth.pixels[index];
        if ((col + 1) >= earth.width) {
          row++;
          col = 0;
        } else if (index % COLORS == 0) {
          col = (col + 1) % earth.width;
        }
        index++;
      }
      pg.loadPixels();
      triangles();
      pg.updatePixels();
      
    }

    function draw() {
      background(51);
      image(pg, 0, 0, width, height);
    }

  function triangles() {
    for (let i = 0; i < ROWS - 1; i++) {
        for (let j = 0; j < COLS - 1; j++) {
          interpolateTrianglePixels(i, j);
        }
    }
  }

  function interpolateTrianglePixels(row, col) {
    const row0 = row,     col0 = col;
    const row1 = row + 1, col1 = col;
    const row2 = row,     col2 = col + 1;
    const row3 = row + 1, col3 = col + 1;
    const row0Pix = floor(row0 * triangleHeight), col0Pix = floor(col0 * triangleWidth);
    const row1Pix = floor(row1 * triangleHeight), col1Pix = floor(col1 * triangleWidth);
    const row2Pix = floor(row2 * triangleHeight), col2Pix = floor(col2 * triangleWidth);
    const row3Pix = floor(row3 * triangleHeight), col3Pix = floor(col3 * triangleWidth);
    const r = 0, g = 1, b = 2, a = 3;
    const color0 = color(
      matrix[row0Pix][col0Pix][r],
      matrix[row0Pix][col0Pix][g],
      matrix[row0Pix][col0Pix][b],
      matrix[row0Pix][col0Pix][a]
    );
    const color1 = color(
      matrix[row1Pix][col1Pix][r],
      matrix[row1Pix][col1Pix][g],
      matrix[row1Pix][col1Pix][b],
      matrix[row1Pix][col1Pix][a]
    );
    const color2 = color(
      matrix[row2Pix][col2Pix][r],
      matrix[row2Pix][col2Pix][g],
      matrix[row2Pix][col2Pix][b],
      matrix[row2Pix][col2Pix][a]
    );
    const color3 = color(
      matrix[row3Pix][col3Pix][r],
      matrix[row3Pix][col3Pix][g],
      matrix[row3Pix][col3Pix][b],
      matrix[row3Pix][col3Pix][a]
    );
    for (let i = row0Pix; i < row3Pix; i++) {
      for (let j = col0Pix; j < col3Pix; j++) {
        let coordsT1 = barycentric_coords(i, j, row0Pix, col0Pix, row1Pix, col1Pix, row2Pix, col2Pix);
        let coordsT2 = barycentric_coords(i, j, row1Pix, col1Pix, row2Pix, col2Pix, row3Pix, col3Pix);
        setPixelColorValues(coordsT1, {
          color0: color1,
          color1: color2,
          color2: color0,
        }, { i, j });
        setPixelColorValues(coordsT2, {
          color0: color1,
          color1: color2,
          color2: color3,
        }, { i, j });
      }
    }
  }

  function setPixelColorValues(coords, colors, pixelIndexes) {
    const { i, j } = pixelIndexes;
    const { color0, color1, color2 } = colors;
    const r = 0, g = 1, b = 2, a = 3;
    if (coords.w0 >= 0 && coords.w1 >= 0 && coords.w2 >= 0) {
      redVal = red(color0) + coords.w1 * (red(color1) - red(color0))
              + coords.w2 * (red(color2) - red(color1));
      greenVal = green(color0) + coords.w1 * (green(color1) - green(color0))
                + coords.w2 * (green(color2) - green(color1));
      blueVal = blue(color0) + coords.w1 * (blue(color1) - blue(color0))
                + coords.w2 * (blue(color2) - blue(color1));
      alphaVal = alpha(color0) + coords.w1 * (alpha(color1) - alpha(color0))
                + coords.w2  * (alpha(color2) - alpha(color1));
      pgIndex = (i * earth.width + j) * COLORS;
      pg.pixels[pgIndex + r] = redVal;
      pg.pixels[pgIndex + g] = greenVal;
      pg.pixels[pgIndex + b] = blueVal;
      pg.pixels[pgIndex + a] = alphaVal;
    }
  }

  function barycentric_coords(row, col, row0, col0, row1, col1, row2, col2) {
    let edges = edge_functions(row, col, row0, col0, row1, col1, row2, col2);
    let area = parallelogram_area(row0, col0, row1, col1, row2, col2);
    return { w0: edges.e12 / area, w1: edges.e20 / area, w2: edges.e01 / area };
  }

  function parallelogram_area(row0, col0, row1, col1, row2, col2) {
    return (col1 - col0) * (row2 - row0) - (col2 - col0) * (row1 - row0);
  }

  function edge_functions(row, col, row0, col0, row1, col1, row2, col2) {
    let e01 = (row0 - row1) * col + (col1 - col0) * row + (col0 * row1 - row0 * col1);
    let e12 = (row1 - row2) * col + (col2 - col1) * row + (col1 * row2 - row1 * col2);
    let e20 = (row2 - row0) * col + (col0 - col2) * row + (col2 * row0 - row2 * col0);
    return { e01, e12, e20 };
  }
{{< /p5-global-iframe >}} 

*Figura 5. Mapeo de la textura al conjunto "aplanado" de triángulos que conforman la esfera* 

</div>

<br/>


<!-- ---
bookCollapseSection: true
--- -->
<!-- {{<section>}} -->

## **IV. Conclusiones**

Para concluir, podemos resaltar en nuestras investigaciones que el campo de mapeo de texturas ha sido apropiado para investigaciones y desarrollos más complejos, para entender este proceso es necesario entender las bases y el bajo nivel de los gráficos, ádemas de conceptos matemáticos claves como sistemas de coordenadas, geometría y otros involucrados en rasterización. Como trabajo futuro se puede proponer el mapeo de texturas de medio y bajo nivel a súper geometrías y el desarrollo de estas a nivel matemático debido al alto nivel de complejidad de estas figuras. Esta investigación se ha realizado de manera transversal por los distintos niveles de mapeo, afianzando los conocimientos y conceptos, convirtiéndose así en una buena ejemplificación práctica del mapeo de texturas.  

## **Finger Tracking with MediaPipe Hands**

## **I. Introducción** 

[MediaPipe](https://google.github.io/mediapipe/) es un framework gratis y de código abierto desarrollado por Google que tiene como objetivo la construcción de pipelines utilizando modelos de Inteligencia Artifical y Machine Learning listos para su uso, optimizados y para múltiples plataformas, fue presentado en el 2019 y a día de hoy sigue siendo mantenido y renovando por Google. Este Framework se basa en TensorFlow y TensorFlow Lite, que también son propiedad de Google, para el desarrollo de Machine Learning, redes neuronales y que cuentan con un alto prestigio en este sector. Actualmente MediaPipe es multiplataforma, ya que a pesar de ser desarollado en C++ cuenta con un API para python, Javascript y móviles. MediaPipe está fuertemente ligada al Processing y las soluciones gráficas ya que trabaja con procesos optimizados en la GPU y cuenta con distintos modelos previamente entrenados para la detección de caras, manos, objetos, poses en imágenes y videos, Box Tracking, Motion Tracking,entre otros, que son capaces de ejecutarse mediante p5.js.    
En esta investigación se abarcará uno de los modelos en el campo del Finger Tracking denominado ```MediaPipe Hands```, este se encuentra relacionado a gráficos, imagen y vídeo. También, se presentarán detalles del estado del arte e historia del campo del Finger Tracking, su funcionamiento, recolección de datos, cómo funciona a nivel teórico y cómo utilizar ```MediaPipe Hands``` en una aplicación de este modelo utilizando p5.js para generar un brush tridimensional. 

## **II. Contextualización** 

El Finger Tracking [Figura 5] es uno de los campos correspondientes al sector de interacción humano - máquina en 3 dimensiones, se empezó a estudiar en 1969 con los primeros reconocimientos de gestos en el procesamiento de imágenes. En este sector, una de las claves y el primer paso a seguir es la captura de datos del usuario, en el Finger Tracking como tal es posible capturar los datos utilizando o no una interfaz o hardware como lo son los guantes de captura, utilizar seguimientos de posición y reconstrucción espacial vía mandos, entre otros, estos métodos son conocidos como seguimientos de captura inercial y sus grandes desventajas son la interferencia magnética en los procesos y la dependencia del funcionamiento adecuado de los sensores.  
El otro sistema es el basado en captura de la observación o movimiento óptico, este sistema utiliza marcadores que son puntos de interacción configurados previamente en los modelos con el fin de dar seguimiento a puntos estratégicos y la realización de cálculos espaciales necesarios en situaciones de óptica con condiciones adversas como el desenfoque, esto con el fin de mantener una congruencia espacial en la posición de los marcadores sin importar que se tengan algunas posiciones erradas o desconocidas. Támbien se utilizan patrones 3D entrenados previamente en los modelos para representar computacionalmente las coordenadas (incluyendo la profundidad) de los marcadores.

<div align="center"> 

![Finger Tracking](https://docs.microsoft.com/es-es/windows/mixed-reality/develop/unreal/images/hand-tracking-img-02.png)  

*Figura 5. Finger tracking y sus seguimientos. Tomado de : [Microsoft](https://docs.microsoft.com/es-es/windows/mixed-reality/develop/unreal/unreal-hand-tracking?tabs=426)* 

</div>

Para el modelo utilizado en ```MediaPipe Hands``` de M5l.js, se utiliza un seguimiento sin interfaz. Estos seguimientos están construidos con base en estimaciones de secuencias y un modelo de cambio con grados de libertad en las articulaciones conectadas como un cuerpo rígido. Se establece un espacio o grafo de estados con atributos de posición y ángulos para cada dedo funcional, esto con el fin de realizar una estimación. Los procesos comunes en este seguimiento son: 

  - Substracción del fondo en la imagen. 
  - Convolución de la imagen a una máscara de binarios para segmentar la mano del fondo. 
  - Reconocimiento de regiones mediante la mano izquierda y derecha. 
  - Identificación de picos y valles de la mano, yemas de los dedos y transformación de estos datos a coordenadas 3D. 
  - Estimación de posición mediante el uso del modelo y el grafo de estados. 
  - Opcional: Reconocimiento de gestos. 

El modelo de estimación etiqueta cada articulación de los dedos, genera un sistema de ejes en cada articulación (21 en total) y proyecta un rayo utilizando la bisectriz. Con cada uno de estos rayos de proyección se estima a un punto en las 3 dimensiones y con estas correspondencias se estima la pose actual de la mano. El siguiente es un pseudocódigo que tiene en cuenta la oclusión de ciertas articulaciones:  
``` 
(a) Reconstruya los rayos de proyección a partir de los puntos de la imagen.  
(b) Para cada rayo de proyección R:
(c) Para cada contorno 3D:
      (c1) Estime el punto P1 más cercano del rayo R a un punto en el contorno
      (c2) si (n == 1) elige P1 como P real para la correspondencia punto-línea
      (c3) si no, compare P1 con P:
                si dist(P1, R) es menor que dist(P, R) entonces
                    elegir P1 como nuevo P
(d) Utilice (P, R) como conjunto de correspondencia.
(e) Estimar pose con este conjunto de correspondencia
(f) Transformar contornos, ir a (b) 
```

En este campo también es posible resaltar la extracción de datos utilizando sistemas láser como el Smart Scanner Laser que es independiente de modelos para la conversión y estimación de 2D a 3D, ya que estos son capaces de obtener las coordenadas tridimensionales sin utilizar procesamiento de imágenes peor con un campo de visión más restringido.  

Con respecto a las aplicaciones actuales y desarrollos futuros se pueden resaltar:  

- Realidad virtual.
- Realidad aumentada. 
- Modelados 3D. 
- Animación y Motion Capture.
- Simplificación de tareas computacionales vía gestos interactivos.  

Esta última aplicación junto con la realidad aumentada son con posibilidad las más amplias y ambiciosas pues pretenden facilitar en términos de usabilidad distintos sistemas computacionales mediante la interacción de gestos como el lenguaje de señas, esto sin perder precisión y rendimiento junto con la creación y masificación de experiencias con mayor inmersividad en sistemas que van desde sistemas de información y manejo de datos hasta juegos y filtros de la cámara. Empresas como Google [Figura 6], Apple, Microsoft trabajan diariamente en la mejora de precisión y rendimiento en sus sensores y modelos. 

<div align="center"> 

![Google](https://lh5.googleusercontent.com/W_b7o3WODGVY-5pa5JA_QUiFm250Dzs_QlrjpeYR5hNWWrWwcXtLTs9ijCzRB3Tle4MCrDzBMzPrPsasUUzYZ6_Q6DhyWL8zWAJTDzrvvItvTdwVePmcUV9ERNAQaccl44G67MPBYo30SwkeNQ)

*Figura 6. Lanzamiento del API de Google MediaPipe. Tomado de : [Twitter](https://twitter.com/GoogleAI/status/1163537878942547968?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1163537878942547968%7Ctwgr%5E%7Ctwcon%5Es1_&ref_url=https%3A%2F%2Femiliusvgs.com%2Fgoogle-ai-realidad-aumentada-hand-finger-tracking%2F)* 

</div>

``` MediaPipe Hands ``` utiliza este modelo de TensorFlow lanzado por Google en 2019 que le permite reconocer varias manos y 21 puntos de interacción en cada una sin utilizar entornos potentes de computación ya que, hasta un Smartphone puede ejecutarlo de manera adecuada. Utiliza un modelo de detección de palmas, basado en picos y valles junto con un modelo de detección de puntos de interacción sobre los resultados del modelo anterior, esto con el fin de proporcionar menos carga al segundo modelo y aumentar la precisión en la estimación de pose o coordenadas.  
El API de Javascript cuenta con configuraciones opcionales como el número máximo de manos ``` maxNumHands ```, la complejidad del modelo y los valores mínimos de confianza para las predicciones. La mejor manera de entender su uso es con un ejemplo práctico tridimensional, en este caso es la implementación de un brush. 

## **III. Resultados**

## **IV. Conclusiones**

Para concluir, podemos resaltar en nuestras investigaciones que el sector de la interacción tridimensional entre usuario y máquina es rotundamente interesante desde la extracción de los datos hasta la manipulación y múltiples resultados posibles con estos. Con respecto al Finger Tracking, encontramos que es un campo que sigue en crecimiento y desarrollo a día hoy y su propuesta en términos de interacción vía gestos es ambiciosa, voraz y el camino a seguir. Por último, resaltar iniciativas como MediaPipe y M5l.js que buscan masificar el uso de Inteligencia Artificial y Machine Learning mediante un API sencilla y fácil de implementar en relación a la computación gráfica.  
Es importante que sigan surgiendo estas iniciativas de código abierto con el fin de educar y avanzar la tecnología para todos.   

## **V. Referencias**

- Wikipedia contributors. (2022, 22 abril). Texture mapping. Wikipedia. https://en.wikipedia.org/wiki/Texture_mapping. [Wikipedia](https://en.wikipedia.org/wiki/Texture_mapping)
- Wikipedia contributors. (2022, mayo 16). Spherical coordinate system. Wikipedia. https://en.wikipedia.org/wiki/Spherical_coordinate_system [Wikipedia](https://en.wikipedia.org/wiki/Spherical_coordinate_system)
- Hands. (2022). Mediapipe. https://google.github.io/mediapipe/solutions/hands. [MediaPipe Hands](https://google.github.io/mediapipe/solutions/hands)
- Wikipedia contributors. (2021, 29 agosto). Finger tracking. Wikipedia. https://en.wikipedia.org/wiki/Finger_tracking [Wikipedia](https://en.wikipedia.org/wiki/Finger_tracking)
- Wikipedia contributors. (2022, marzo 19). 3D pose estimation. Wikipedia. https://en.wikipedia.org/wiki/3D_pose_estimation [Wikipedia](https://en.wikipedia.org/wiki/3D_pose_estimation)