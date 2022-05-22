---
date: 2022-04-02
linktitle: Workshop 2
title: Workshop2
---

# **Texture Mapping and ...**
<div style="text-align: justify">

## **I. Introducción** 

El mapeo de texturas es el método con el cual se realiza el detallado de color a un objeto 3D. Actualmente, se han desarrollado mapeos más complejos implicando diferentes tipos de transformaciones y polígonos como el mapeo de reflexión, relieve, entre otros.  
El proceso consiste en la obtención de una imagen mediante fotografía digital o escaneo y su manipulación mediante software para ser utilizada. Posteriormente, la aplicación es el mapeo de vértices del polígono a una coordenada de textura. 
El mapeado UV consiste en el mapeado de un plano 2D a un tríangulo, ubicando los tres vertices del tríangulo en la imagen, con coordenadas normalizadas en la imagen y calculando los puntos interiores utilizando coordenadas báricentricas, se presentará su correspondiente implementación bajo nivel junto con mapeos de medio y alto nivel en JavaScript utilizando la biblioteca de p5.js y WEBGL.

## **II. Contextualización**  

### **Mapeo de Alto Nivel**
El primer mapeo de textura consiste en una esfera (sólido de revolución y no polígono) y una imagen de la tierra [figura 1] a alto nivel mediante el uso de las funciones ```texture()``` y ```sphere()```. 

<div align="center"> 

![Tierra](https://lh6.googleusercontent.com/IwEkyWS6TCXKxJWlsIaylCZT53k3i6nhXs2xo6Fduap28MgLZMyypiK9KHvJDi7APkDkzh5-80y3i1PdPL_XeCn72HspV9z_jTThXpG3VCee0NUoJ_RBezRKSBWXn6YtgbBKPhL23x1ruQImzQ)  

*Figura 1. Plano 2D de la tierra.* 

</div>

### **Mapeo de Medio Nivel**
El segundo mapeo de textura consiste en una esfera (sólido de revolución y no polígono) y una imagen de la tierra [figura 1] a medio nivel mediante el uso de las funciones ```texture()```, ```beginShape()``` y ```endShape()```.  

Para realizar la esfera, utilizamos los conceptos de mapeo entre longitud/latitud en un plano 2D a la esfera utilizando ángulos.  
Los valores de longitud y latitud estarán:  

- $Long \in [0^o, 360^o].$
- $Lat \in [0^o, 180^o].$  
  
Buscamos mapear los valores de $(r,lat,long) \arrow (x,y,z)$. 
- $x = r sin(lat) cos(long)$
- $y = r sin(lat) sin(long)$
- $z = r cos(lat)$

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
El tercer mapeo de textura consiste en un plano 2D y una imagen de la tierra [figura 1] a bajo nivel mediante el uso de las funciones ```beginShape()``` y ```endShape()``` y la librería de cuadrícula ```p5.quadrille.js```.  

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

<!-- ---
bookCollapseSection: true
--- -->
<!-- {{<section>}} -->

## **IV. Conclusiones**

Para concluir, podemos resaltar en nuestras investigaciones que el campo de mapeo de texturas ha sido apropiado para investigaciones y desarrollos más complejos, para entender este proceso es necesario entender las bases y el bajo nivel de los gráficos, ádemas de conceptos matemáticos claves como sistemas de coordenadas, geoetría y otros involucrados en rasterización. Como trabajo futuro se puede proponer el mapeo de texturas de medio y bajo nivel a súper geometrías y el desarrollo de estas a nivel matemático debido al alto nivel de complejidad de estas figuras. Esta investigación se ha realizado de manera transversal por los distintos niveles de mapeo, afianzando los conocimientos y conceptos, convirtiéndose así en una buena ejemplificación práctica del mapeo de texturas.  

## **IV. Referencias**

- Wikipedia contributors. (2022, 22 abril). Texture mapping. Wikipedia. https://en.wikipedia.org/wiki/Texture_mapping. [Wikipedia](https://en.wikipedia.org/wiki/Texture_mapping)
- Wikipedia contributors. (2022b, mayo 16). Spherical coordinate system. Wikipedia. https://en.wikipedia.org/wiki/Spherical_coordinate_system [Wikipedia](https://en.wikipedia.org/wiki/Spherical_coordinate_system)