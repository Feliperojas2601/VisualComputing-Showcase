---
date: 2022-04-02
linktitle: Workshop 1
title: Workshop1
---

# **Visual phenomena and Optical Illusions**
<div style="text-align: justify">

## **I. Introducción** 

Las ilusiones ópticas son distorsiones de los sentidos causadas por el sistema visual, caracterizadas por una percepción que parece diferir de la realidad. Estas pueden revelar cómo el cerebro humano organiza e interpreta normalmente la estimulación sensorial y permiten estudiar las limitaciones de la percepción visual. Este tipo de "fenómenos" son adaptaciones especialmente buenas de nuestro sistema visual a situaciones de visión estándar; estas adaptaciones al depender de nuestro cerebro pueden provocar interpretaciones inadecuadas de la escena visual y dependen de la representación interna de la realidad una vez nuestros ojos han filtrado la información. Michael Bach es un científico alemán que ha investigado ampliamente el campo de la oftalmología y la percepción visual, y su sitio "Optical Illusions & Visual Phenomena" contiene un amplio repertorio de ilusiones ópticas que son claramente explicadas y su explicación nos acerca a entender un poco mejor de donde viene la interpretación que se da de estos fenómenos. Bach los clasifica en fenómenos de movimiento y tiempo, iluminación y contraste, color, ilusiones geométricas y angulares, entre otros. Para este trabajo se han seleccionado tres de los fenómenos/ilusiones propuestas por Bach, las cuales se analizarán en detalle y se presentará su correspondiente implementación en JavaScript utilizando la biblioteca de p5.js

## **II. Contextualización**  

### **Stereokinetic Effect**
El primer informe del fenómeno estereo cinético fue publicado en 1924 por Mussati, atribuyendo su descubrimiento a su maestro, Vittorio Benussi. Establecía que todas las percepciones de profundidad se basan en información de movimiento como fenómeno estereo cinético, y que entre los eventos que consideraba ejemplos de este efecto, estaban:  

- Percibir la profundidad desde el paralaje de movimiento. Se refiere al hecho de que los objetos que se mueven a velocidad constante a lo largo del fotograma parecerán moverse en mayor proporción si se encuentran más cerca al observador.
- El efecto cinético de profundidad, que se refiere a la percepción tridimensional al observar las proyecciones de objetos rotando.
- Patrones bidimensionales que al rotar sobre el plano de una imagen evocan impresiones de profundidad.

El patrón más comúnmente estudiado del efecto estéreo cinético, referido como SKE cone, consiste en patrones circulares anidados que rotan sobre una plataforma circular. Estos círculos, al rotar alrededor de algún eje distinto de la línea de visión de quien los observa, permiten extraer la configuración tridimensional del patrón, debido a varias transformaciones ópticas que se producen. Al hacer rotar varios círculos externos sobre el eje de la plataforma circular, y círculos internos sobre un círculo interno intermedio, en sentido contrario, se puede apreciar una ilusión de un objeto tridimensional cónico, y apreciar profundidad mediante los círculos internos [Figura 2]. Si la rotación se mantiene en un solo sentido para todos los círculos internos, se tiene la impresión de un cono que apunta hacia el observador, o visto desde otra perspectiva, el interior de un cono que apunta hacia el sentido opuesto al observador [Figura 1].

<div align="center"> 

![StereoKinetic Effect](https://lh6.googleusercontent.com/Hy-5aOu7gIlbEsempub9R27O3rXD4fmSomF69HcqQUNOTOd1CTpF-6D86B6fDrhFwj1sm-agWxubsBqcbJ-XmvRuB0tIY63r_HKNqqoeQUBhVdzfPHHAMd88m3yZkGpbW4R2ozla)  

*Figura 1. Efecto estereo cinético de cono, donde todos los círculos internos rotan respecto a un círculo externo, dando la impresión de un cono apuntando hacia o en sentido contrario del observador.* 

</div>

<div align="center"> 

![StereoKinetic Effect 2](https://lh4.googleusercontent.com/4RYipPoW4EIMbmJH7io8d_ZEfpwtUmkBPENdlsCaS3tVWhwG23MWLolWuoe_wvl8tmbxMmWMqTVLmKO-_1xfNuaxO5BjI5-X6-73uV-by9LZhQen-3NtSHFKNtAL0mpPyetjfrJ5)  

*Figura 2. Efecto estereo cinético de cono, donde algunos los círculos internos rotan respecto a otro círculo interno, pudiendo obtener la percepción de profundidad de un cono abierto.* 

</div>

Cuando el movimiento a lo largo de los contornos de los círculos no es detectado, el patrón alcanza lo que Musatti llamó estabilidad de orientación, por lo parece que los contornos se mueven relativos a otros, lo cual a su vez evoca la percepción de una forma tridimensional, inclinada en profundidad en un ángulo consistente con su excentricidad y altura aparente y moviéndose alrededor de la línea de visión (el eje z) con componentes oscilatorios iguales en los ejes x e y.

### **Stroboscopic Artifacts**
El segundo fenómeno visual consiste de una rueda o disco dividida en tres componentes que inicialmente corresponden cada una a un color primario del modelo RGB (rojo, verde y azul). La rueda gira en la dirección de las manecillas del reloj y a medida que incrementa el ángulo de rotación de ésta, al igual que el retardo entre actualizaciones dado en fotogramas se pueden observar interesantes cambios en las tonalidades de la misma, además de la "dirección" del movimiento. En este fenómeno, se pueden evidenciar momentos clave, que aparecen en ángulos de 60°, y más claramente 120°, donde la rueda toma valores similares al gris, debido a que cada sector alterna rápidamente entre los tres colores principales, cuya mezcla da como resultado el color evidenciado. Además, si se aumenta el ángulo 5°, parece surgir una "hélice" que gira hacia la derecha, donde cada pala está compuesta de los tres colores complementarios de los principales (magenta, cian y amarillo), por otro lado, si se disminuye en 5°, parece que la hélice gira hacia atrás.  
Bach explica tal fenómeno desde la perspectiva del movimiento en las pantallas de ordenador, que cuando se trata de un movimiento rápido sufren del efecto estroboscópico o también denominado aliasing temporal. El aliasing se puede explicar bajo el escenario de que cuando se ve una imagen digital, un dispositivo de visualización, los ojos y el cerebro realizan una reconstrucción; si los datos de la imagen se procesan de alguna manera durante el muestreo o la reconstrucción, la imagen reconstruida diferirá de la imagen original, y se verá un alias que suele superponer al original (este efecto se evidencia comúnmente en el muestreo de señales). Por su parte, el efecto estroboscópico se produce cuando el movimiento rotativo continuo u otro movimiento cíclico se representa mediante una serie de muestras cortas o instantáneas (en contraposición a una vista continua) a una frecuencia de muestreo cercana al periodo del movimiento. Esta es la causa del "efecto rueda de carreta", que Bach abarca también en su repertorio, llamado así porque en los videos, las ruedas (como las de los carros de caballos) a veces parecen girar hacia atrás. Para que se produzca tal efecto, es necesario que la pantalla se presente de forma discontinua: puede que no sea visible, pero la rueda (o lo que se presente en la pantalla) se mueve a "tirones"; si estas "sacudidas" se producen con suficiente rapidez (por ejemplo, 20 veces por segundo, o similar al caso de nuestro ejemplo), nuestro sistema visual interpola las posiciones que faltan. Esta interpolación se basa en el principio del "vecino más cercano" y si el desplazamiento del radio de la rueda de un fotograma a otro es tan grande que está más cerca del (antiguo) radio siguiente que del (antiguo) original, nuestro sistema visual asume la dirección de movimiento opuesta.  
Bach también menciona la importancia de la frecuencia de fotogramas en el movimiento. El disco no gira suavemente, sino que se presenta en cuadros fijos que se suceden rápidamente, cada uno con un ángulo de rotación diferente, lo que produce la percepción de un movimiento suave, también llamado "Fenómeno Phi" de Wertheimer. Sin embargo, este movimiento depende en gran medida de la tasa de fotogramas, que para el caso predeterminado es de 60 cuadros mostrados por segundo y también entra en juego otro aspecto: la tasa de fotogramas del monitor o la pantalla. Según esto, entonces, lo que se puede apreciar exactamente depende de la interacción de las dos tasas de fotogramas y del incremento del ángulo, donde en variados casos según la configuración se puede evidenciar la "mezcla" de los colores, por el solapamiento de las secciones, además de los efectos ya mencionados.

### **Moiré Patterns**
Moiré es una palabra francesa que significa muaré en el español y es una textura o tipo de tejido que genera una visión sobre la seda simulando un entorno acuático y ondulado debido a la manera de su fabricación, que es la superposición de dos textiles húmedos generando un patrón cuando la seda se seca.   
Esta ilusión optica conocida como Moiré patterns o patrones muaré hace referencia a la superposición de dos patrones similares que están compuestos por rayas opacas ó de color junto con un espacio transaparente. Al encontrarse diferencias en los patrones, la colocación de los mismos, movimientos de rotación o desplazamiento y otros aspectos como aceleración o formatura, es posible generar una especie de bandas oscuras móviles conocidas como moirés. Este efecto no es simplemente aludido en el arte y la animación, sino que, tiene aplicaciones científicas en los campos de matemática y física en donde surgen cálculos con respecto a las formas, rotaciones, aceleraciones, desplazamientos, interferencia de ondas, entre otros más.  

<div align="center"> 

![Moiré Patterns](https://lh5.googleusercontent.com/-0ouLdip4LKgPQi9TnM64yQOUDWa1Y3AOJentysAThbBbcsZMMvdun2PPqhwxNkgihuruP4fF2URSGLVJb24DUJWNQrU2m4akpuSS2JvHa4KO0lS72GyLBO0vk0dZRe4PYXMY7Hx)  

*Figura 4. Moirés generados por la rotación de uno de dos patrones de líneas paralelas negras. Imagen extraída de: [Wikipedia](https://en.wikipedia.org/wiki/Moir%C3%A9_pattern)*

</div>

La explicación a detalle de esta ilusión consiste en un fenómeno relativo a la luz y la superposición, pues la luz impacta a ambos patrones que permiten que esta pueda pasar o quedar bloqueada según la forma y/o el color o transparencia en el que se encuentre impactando. Esto genera una multiplicación en las razones de transmitancia de luz y dos frecuencias que a la vista parecen distintas. 

<div align="center"> 

![Moiré Patterns 2](https://lh5.googleusercontent.com/dEFqap-1r8k_cHwUOggy47i_t81QVpSNVq6RnpN_F42Pd47DngSpjFJMyD-zVQn_pBj32nqpH3fwmM0bEqs6M8th9WpuDJ-zfhxTO31XUKELS0T0FKFXvy7snSztB5HjQPH_XdSN)  

*Figura 5. Moirés generados el movimiento horizontal de un patron de círculos concéntricos.*
  
</div>

## **III. Resultados**

La implementación utilizando p5.js realizada para los casos anteriores se muestra a continuación: 

{{< details title="p5-instance-div markdown" open=false >}}
```js
  const frame_rate = 60;

  let show_crater_cb;
  let show_crater = true;
  let slider_label;

  function setup() {
    createCanvas(500, 500);
    show_crater_cb = createCheckbox('show crater', show_crater);
    show_crater_cb.changed(() => {
      show_crater = show_crater_cb.checked();
    });
    frames_slider = createSlider(0.5, 5, 1, 0.25);
    frames_slider.position(180, 515);
    frames_slider.style('width', '80px');
    slider_label = createSpan('speed');
    slider_label.position(135, 513);
    frameRate(frame_rate);
  }

  function draw() {
    background(220);
    
    let difference = 40;
    let inner_diameter = 40;
    
    const outer_circles = 11;
    const start = inner_diameter + outer_circles * difference;
    const end = inner_diameter;
    
    noStroke();
    
    let posX = 0, posY = 0;
    let referenceX = width / 2;
    let referenceY = height / 2;

    let t, outer_coeff, inner_coef;

    for (let diameter = start, index = 0; diameter >= end; diameter -= difference, index++) {
      fill(index % 2 === 0 ? color('blue') : color('yellow'));
      let orientation = index > 6 && show_crater ? -1 : 1;
      outer_coeff = orientation * index * difference / 2;
      t = frameCount * frames_slider.value() / frame_rate;
      posX = referenceX + outer_coeff * cos(t);
      posY = referenceY + outer_coeff * sin(t);
      if (index == 6 && show_crater) {
        inner_coef = diameter / 2 + difference;
        referenceX = posX + inner_coef * cos(t);
        referenceY = posY + inner_coef * sin(t);
      }
      circle(posX, posY, diameter);
    }
  }
```
{{< /details >}}
<br/>
<!-- {{< p5-iframe sketch="/showcase/sketches/optical_illusions/stereokinetic_effect.js" width="520" height="550" >}}--> 
  
{{< p5-global-iframe id="stereo" width="520" height="550" >}}
  const frame_rate = 60;

  let show_crater_cb;
  let show_crater = true;
  let slider_label;

  function setup() {
    createCanvas(500, 500);
    show_crater_cb = createCheckbox('show crater', show_crater);
    show_crater_cb.changed(() => {
      show_crater = show_crater_cb.checked();
    });
    frames_slider = createSlider(0.5, 5, 1, 0.25);
    frames_slider.position(180, 515);
    frames_slider.style('width', '80px');
    slider_label = createSpan('speed');
    slider_label.position(135, 513);
    frameRate(frame_rate);
  }

  function draw() {
    background(220);
    
    let difference = 40;
    let inner_diameter = 40;
    
    const outer_circles = 11;
    const start = inner_diameter + outer_circles * difference;
    const end = inner_diameter;
    
    noStroke();
    
    let posX = 0, posY = 0;
    let referenceX = width / 2;
    let referenceY = height / 2;

    let t, outer_coeff, inner_coef;

    for (let diameter = start, index = 0; diameter >= end; diameter -= difference, index++) {
      fill(index % 2 === 0 ? color('blue') : color('yellow'));
      let orientation = index > 6 && show_crater ? -1 : 1;
      outer_coeff = orientation * index * difference / 2;
      t = frameCount * frames_slider.value() / frame_rate;
      posX = referenceX + outer_coeff * cos(t);
      posY = referenceY + outer_coeff * sin(t);
      if (index == 6 && show_crater) {
        inner_coef = diameter / 2 + difference;
        referenceX = posX + inner_coef * cos(t);
        referenceY = posY + inner_coef * sin(t);
      }
      circle(posX, posY, diameter);
    }
  }
{{< /p5-global-iframe >}}

{{< details title="p5-instance-div markdown" open=false >}}
```js
let angle = 0;
let frames;
let colorp1, colorp2, colorp3;
let rotation_angle;
function setup() {
  createCanvas(500, 500);
  frames_slider = createSlider(5, 120, 60, 5);
  frames_slider.position(180, 40);
  frames_slider.style('width', '80px');
  ellipseMode(CENTER);
  rotation_angle = createP().position(25, 5);
  frames = createP().position(180, 5);
  slider = createSlider(0, 360, 0, 5);
  slider.position(20, 40);
  slider.style('width', '80px');
  createP('Colors:').position(25, 55).style('font-size: 15px');
  colorp1 = createColorPicker([0, 255, 0]).position(20, 95);
  colorp2 = createColorPicker([0, 0, 255]).position(20, 135);
  colorp3 = createColorPicker([255, 0, 0]).position(20, 175);
}


function draw() {
  background(200);
  noStroke();
  translate(width/2, height/2);
  rotate(angle);
  fill(colorp1.color());
  arc(0, 0, width/2, height/2, 0, 2*PI/3);    
  fill(colorp2.color());
  arc(0, 0, width/2, height/2, 2*PI/3, 4*PI/3); 
  fill(colorp3.color());
  arc(0, 0, width/2, height/2, 4*PI/3, 2*PI);

  angle += radians(slider.value());
  frameRate(frames_slider.value());
  rotation_angle.html('Rotation angle: ' + slider.value());
  frames.html('Frame rate: ' + frames_slider.value());
}
```
{{< /details >}}
<br/>
<!--{{< p5-iframe sketch="/showcase/sketches/optical_illusions/stroboscopic_artifacts.js" width="500" height="500">}} -->

{{< p5-global-iframe id="stobostopic" width="500" height="500" >}}
  let angle = 0;
  let frames;
  let colorp1, colorp2, colorp3;
  let rotation_angle;
  function setup() {
    createCanvas(500, 500);
    frames_slider = createSlider(5, 120, 60, 5);
    frames_slider.position(180, 40);
    frames_slider.style('width', '80px');
    ellipseMode(CENTER);
    rotation_angle = createP().position(25, 5);
    frames = createP().position(180, 5);
    slider = createSlider(0, 360, 0, 5);
    slider.position(20, 40);
    slider.style('width', '80px');
    createP('Colors:').position(25, 55).style('font-size: 15px');
    colorp1 = createColorPicker([0, 255, 0]).position(20, 95);
    colorp2 = createColorPicker([0, 0, 255]).position(20, 135);
    colorp3 = createColorPicker([255, 0, 0]).position(20, 175);
  }


  function draw() {
    background(200);
    noStroke();
    translate(width/2, height/2);
    rotate(angle);
    fill(colorp1.color());
    arc(0, 0, width/2, height/2, 0, 2*PI/3);    
    fill(colorp2.color());
    arc(0, 0, width/2, height/2, 2*PI/3, 4*PI/3); 
    fill(colorp3.color());
    arc(0, 0, width/2, height/2, 4*PI/3, 2*PI);

    angle += radians(slider.value());
    frameRate(frames_slider.value());
    rotation_angle.html('Rotation angle: ' + slider.value());
    frames.html('Frame rate: ' + frames_slider.value());
  }
{{< /p5-global-iframe >}}

{{< details title="p5-instance-div markdown" open=false >}}
```js
let x = 0;
let colorp1, colorp2;
let increase = 0;

function setup() {

    createCanvas(500, 500);
    rectMode(CENTER);
    colorp1 = createColorPicker([32, 162, 32]).position(20, 25);
    colorp2 = createColorPicker([0, 0, 255]).position(75, 25);
    slider = createSlider(0, 2, 0, 0.25);
    slider.position(150, 25);
    slider.style('width', '80px');

}

function draw() {

    background(220);

    increase = slider.value();

    for (let i = 0; i < 400; i += 20) {

        stroke(colorp2.color());
        strokeWeight(4);
        ellipse(x, 250, i - 380, i - 380);

        noFill();
        stroke(colorp1.color());
        strokeWeight(4);
        ellipse(250, 250, i, i);

    }
    if (x > width) {

        x = 0;

    } else {

        x = x + increase;
    }
}
```
{{< /details >}}
<br/>
</div>
<!--{{< p5-iframe sketch="/showcase/sketches/optical_illusions/moire_patterns.js" width="500" height="500" >}}-->

{{< p5-global-iframe id="moire" width="500" height="500" >}}
  let x = 0;
  let colorp1, colorp2;
  let increase = 0;

  function setup() {

      createCanvas(500, 500);
      rectMode(CENTER);
      colorp1 = createColorPicker([32, 162, 32]).position(20, 25);
      colorp2 = createColorPicker([0, 0, 255]).position(75, 25);
      slider = createSlider(0, 2, 0, 0.25);
      slider.position(150, 25);
      slider.style('width', '80px');

  }

  function draw() {

      background(220);

      increase = slider.value();

      for (let i = 0; i < 400; i += 20) {

          stroke(colorp2.color());
          strokeWeight(4);
          ellipse(x, 250, i - 380, i - 380);

          noFill();
          stroke(colorp1.color());
          strokeWeight(4);
          ellipse(250, 250, i, i);

      }
      if (x > width) {

          x = 0;

      } else {

          x = x + increase;
      }
  }
{{< /p5-global-iframe >}}

<!-- ---
bookCollapseSection: true
--- -->
<!-- {{<section>}} -->

## **IV. Conclusiones**

Para concluir, podemos resaltar en nuestras investigaciones que el campo de ilusiones ópticas es sumamente extenso y rico en información. Los límites en la generación de ilusiones son inexistentes y este informe presenta solo 3 tipos de ilusiones que pueden ser replicadas y visualizadas en una infinidad de experimentos distintos.  

Como trabajo futuro podemos resaltar aplicaciones interesantes de las anteriores ilusiones ópticas, como la impresión de imágenes con color, procesamiento y medición de deformaciones en imágenes y visualización de imágenes en pantallas y dispositivos electrónicos.

## **IV. Referencias**

- Bach, M. (2022). 148 Visual Phenomena & Optical Illusions. [Michael Bach](https://michaelbach.de/ot/index.html)
- Bach & Poloschek (2006) Optical Illusions Primer. [Michael Bach](https://michaelbach.de/ot/-misc/BachPolo2006ACNR%20illusions.pdf)
- Proffitt DR, Rock I, Hecht H, Schubert J. Stereokinetic effect and its relation to the kinetic depth effect. J Exp Psychol Hum Percept Perform. 1992 Feb;18(1):3-21. doi: 10.1037//0096-1523.18.1.3. PMID: 1532192.