---
date: 2022-04-02
linktitle: Workshop 2
title: Workshop2
---

# **Texture Mapping and Finger Tracking with ML5 Handpose**
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

## **Finger Tracking with ML5 Handpose**

## **I. Introducción** 

[Ml5.js](https://ml5js.org/) es una librería de Javascript que tiene como objetivo fomentar el uso del Machine Learning de manera más amigable y para un público más amplio, es un proyecto de código abierto originario de Nueva York por el grupo Interactive Telecommunications/Interactive Media Art quienes manteniendo el API a día de hoy. Esta librería se basa en TensorFlow.js, otra librería de Google para el desarrollo de Machine Learning, redes neuronales y que cuenta con un alto prestigio en este sector. Ml5.js está fuertemente ligada al Processing y a p5.js, trabaja con procesos optimizados en la GPU y cuenta con distintos modelos previamente entrenados para la detección de imágenes, generación de texto, relaciones de palabras, composición musical, entre otros, que son capaces de ejecutarse mediante p5.js.    
En esta investigación se abarcará uno de los modelos en el campo del Finger Tracking denominado ```Handpose```, este se encuentra relacionado a gráficos, imagen y vídeo. También, se presentarán detalles del estado del arte e historia del campo del Finger Tracking, su funcionamiento, recolección de datos, cómo funciona a nivel teórico y cómo utilizar ```Handpose``` y una aplicación de este modelo utilizando p5.js. 

## **II. Contextualización** 

El finger tracking [Figura 5] es uno de los campos correspondientes al sector de interacción humano - máquina en 3 dimensiones, se empezó a estudiar en 1969 con los primeros reconocimientos de gestos en el procesamiento de imágenes. En este sector, una de las claves y el primer paso a seguir es la captura de datos del usuario, en el Finger Tracking como tal es posible capturar los datos utilizando o no una interfaz o hardware como lo son los guantes de captura, utilizar seguimientos de posición y reconstrucción espacial vía mandos, entre otros, estos métodos son conocidos como seguimientos de captura inercial y sus grandes desventajas son la interferencia magnética en los procesos y la dependencia del funcionamiento adecuado de los sensores.  
El otro sistema es el basado en captura de la observación o movimiento óptico, este sistema utiliza marcadores que son puntos de interacción configurados previamente en los modelos con el fin de dar seguimiento a puntos estratégicos y la realización de cálculos espaciales necesarios en situaciones de óptica con condiciones adversas como el desenfoque, esto con el fin de mantener una congruencia espacial en la posición de los marcadores sin importar que se tengan algunas posiciones erradas o desconocidas. Támbien se utilizan patrones 3D entrenados previamente en los modelos para representar computacionalmente las coordenadas (incluyendo la profundidad) de los marcadores.

<div align="center"> 

![Finger Tracking](https://docs.microsoft.com/es-es/windows/mixed-reality/develop/unreal/images/hand-tracking-img-02.png)  

*Figura 5. Finger tracking y sus seguimientos. Tomado de : [Microsoft](https://docs.microsoft.com/es-es/windows/mixed-reality/develop/unreal/unreal-hand-tracking?tabs=426)* 

</div>

Para el modelo utilizado en ```Handpose``` de M5l.js, se utiliza un seguimiento sin interfaz. Estos seguimientos están construidos con base en estimaciones de secuencias y un modelo de cambio con grados de libertad en las articulaciones conectadas como un cuerpo rígido. Se establece un espacio o grafo de estados con atributos de posición y ángulos para cada dedo funcional, esto con el fin de realizar una estimación. Los procesos comunes en este seguimiento son: 

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

Esta última aplicación junto con la realidad aumentada son con posibilidad las más amplias y ambiciosas pues pretenden facilitar en términos de usabilidad distintos sistemas computacionales mediante la interacción de gestos sin perder precisión en estas así como la creación y masificación de experiencias con mayor inmersividad en sistemas que van desde información y manejo de datos hasta juegos y filtros de la cámara. Empresas como Google [Figura 6], Apple, Microsoft trabajan diariamente en la mejora de precisión y rendimiento en sus sensores. 

<div align="center"> 

![Google](https://lh5.googleusercontent.com/W_b7o3WODGVY-5pa5JA_QUiFm250Dzs_QlrjpeYR5hNWWrWwcXtLTs9ijCzRB3Tle4MCrDzBMzPrPsasUUzYZ6_Q6DhyWL8zWAJTDzrvvItvTdwVePmcUV9ERNAQaccl44G67MPBYo30SwkeNQ)

*Figura 6. Lanzamiento del API de Google. Tomado de : [Twitter](https://twitter.com/GoogleAI/status/1163537878942547968?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1163537878942547968%7Ctwgr%5E%7Ctwcon%5Es1_&ref_url=https%3A%2F%2Femiliusvgs.com%2Fgoogle-ai-realidad-aumentada-hand-finger-tracking%2F)* 

</div>

``` Handpose ``` utiliza este modelo de TensorFlow lanzado por Google en 2019 que le permite reconocer una mano y 21 puntos de interacción en esta.  Este modelo se carga desde ``` const handpose = ml5.handpose(?video, ?options, ?callback); ``` con 3 parámetros opcionales, el HTMLVideoElement para la estimación de secuencias, un objeto de configuraciones donde se encuentran los frames, el valor de confianza para las predicciones, entre otros y por último, una función que se ejecutará cuando el modelo termine de cargarse. Cuenta con funciones muy intuitivas y simples como lo  ``` predict() ``` y ``` on() ```. La mejor manera de entender su uso es con un ejemplo práctico. 

## **III. Resultados**

## **IV. Conclusiones**

Para concluir, podemos resaltar en nuestras investigaciones que el sector de la interacción tridimensional entre usuario y máquina es rotundamente interesante desde la extracción de los datos hasta la manipulación y múltiples resultados posibles con estos. Con respecto al Finger Tracking, encontramos que es un campo que sigue en crecimiento y desarrollo a día hoy y su propuesta en términos de interacción vía gestos es ambiciosa, voraz y el camino a seguir. Por último, resaltar iniciativas con Ml5.js que buscan masificar el uso de Inteligencia Artificial y Machine Learning mediante un API sencilla y fácil de implementar en relación a la computación gráfica.  
Es importante que sigan surgiendo estas iniciativas de código abierto con el fin de educar y avanzar la tecnología para todos.   

## **V. Referencias**

- Wikipedia contributors. (2022, 22 abril). Texture mapping. Wikipedia. https://en.wikipedia.org/wiki/Texture_mapping. [Wikipedia](https://en.wikipedia.org/wiki/Texture_mapping)
- Wikipedia contributors. (2022, mayo 16). Spherical coordinate system. Wikipedia. https://en.wikipedia.org/wiki/Spherical_coordinate_system [Wikipedia](https://en.wikipedia.org/wiki/Spherical_coordinate_system)
- Ml5 - A friendly machine learning library for the web. (2022). M5l Https://Ml5js.Org/. [M5l-Handpose](https://learn.ml5js.org/#/reference/handpose)
- Wikipedia contributors. (2021, 29 agosto). Finger tracking. Wikipedia. https://en.wikipedia.org/wiki/Finger_tracking [Wikipedia](https://en.wikipedia.org/wiki/Finger_tracking)
- Wikipedia contributors. (2022, marzo 19). 3D pose estimation. Wikipedia. https://en.wikipedia.org/wiki/3D_pose_estimation [Wikipedia](https://en.wikipedia.org/wiki/3D_pose_estimation)