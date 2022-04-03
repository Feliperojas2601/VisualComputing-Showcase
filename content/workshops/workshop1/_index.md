---
date: 2022-04-02
linktitle: Workshop 1
title: Workshop1
---

# Visual phenomena and Optical Illusions
<div style="text-align: justify">
Las ilusiones ópticas son distorsiones de los sentidos causadas por el sistema visual, caracterizadas por una percepción que parece diferir de la realidad. Estas pueden revelar cómo el cerebro humano organiza e interpreta normalmente la estimulación sensorial y permiten estudiar las limitaciones de la percepcion visual. Este tipo de "fenómenos" son adaptaciones especialmente buenas de nuestro sistema visual a situaciones de visión estandar; estas adaptaciones al depender de nuestro cerebro pueden provocar interpretaciones inadecuadas
de la escena visual y dependen de la representación interna de la realidad una vez nuestros ojos han filtrado la información. 
Michael Bach es un científico alemán que ha investigado ampliamente el campo de la oftalmología y la percepción visual, y su sitio "Optical Illusions & Visual Phenomena" contiene
un amplio repertorio de ilusiones ópticas que son claramente explicadas y su explicación nos acerca a entender un poco mejor de donde viene la interpretación que se da de estos fenómenos. Bach los clasifica en fenómenos de movimiento y tiempo, iluminación y contraste, color, ilusiones geométricas y angulares, entre otros.     
Para este trabajo se han seleccionado tres de los fenómenos/ilusiones propuestas por Bach, las cuales se analizarán en detalle y se presentará su correspondiente implementación en JavaScript utilizando la biblioteca de p5.js 


## Stroboscopic Artifacts
El primer fenómeno visual consiste de una rueda o disco dividida en tres componentes que inicialmente corresponden cada una a un color primario del modelo RGB (rojo, verde y azul). La rueda gira en la dirección de las manecillas del reloj y a medida que incrementa el ángulo de rotación de esta, al igual que el retardo entre actualizaciones dado en fotogramas se pueden observar interesantes cambios en las tonalidades de la misma, además de la "dirección" del movimiento. En este fenómeno, se pueden evidenciar momentos clave, que aparecen en angulos de 60°, y más claramente 120°, donde la rueda toma valores similares al gris, debido a que cada sector alterna rápidamente entre los tres colores principales, cuya mezcla da como resultado el color evidenciado. Además, si se aumenta el ángulo 5°, parece surgir una "hélice" que gira hacia la derecha, donde cada pala está compuesta de los tres colores complementarios de los principales (magenta, cian y amarillo), por otro lado, si se disminuye en 5°, parece que la hélice gira hacia atrás.

Bach explica tal fenómeno desde la perspectiva del movimiento en las pantallas de ordenador, que cuando se trata de un movimiento rápido sufren del efecto estroboscópico o también denominado aliasing temporal. El aliasing se puede explicar bajo el escenario de que cuando se ve una imagen digital, un dispositivo de visualización, los ojos y el cerebro realizan una reconstrucción; si los datos de la imagen se procesan de alguna manera durante el muestreo o la reconstrucción, la imagen reconstruida diferirá de la imagen original, y se verá un alias que suele sobreponer al original (este efecto se evidencia comúnmente en el muestreo de señales). Por su parte, el efecto estroboscópico se produce cuando el movimiento rotativo continuo u otro movimiento cíclico se representa mediante una serie de muestras cortas o instantáneas (en contraposición a una vista continua) a una frecuencia de muestreo cercana al periodo del movimiento. Esta es la causa del "efecto rueda de carreta", que Bach abarca también en su repertorio, llamado así porque en los videos, las ruedas (como las de los carros de caballos) a veces parecen girar hacia atrás. Para que se produzca tal efecto, es necesario que la pantalla se presente de forma discontinua: puede que no sea visible, pero la rueda (o lo que se presente en la pantalla) se mueve a "tirones"; si estas "sacudidas" se producen con suficiente rapidez (por ejemplo, 20 veces por segundo, o similar al caso de nuestro ejemplo), nuestro sistema visual interpola las posiciones que faltan. Esta interpolación se basa en el principio del "vecino más cercano" y si el desplazamiento del radio de la rueda de un fotograma a otro es tan grande que está más cerca del (antiguo) radio siguiente que del (antiguo) original, nuestro sistema visual asume la dirección de movimiento opuesta.

Bach también menciona la importancia de la frecuencia de fotogramas en el movimiento. El disco no gira suavemente, sino que se presenta en cuadros fijos que se suceden rápidamente, cada uno con un ángulo de rotación diferente, lo que produce la percepción de un movimiento suave, también llamado "Fenómeno Phi" de Wertheimer. Sin embargo, este movimiento depende en gran medida de la tasa de fotogramas, que para el caso predeterminado es de 60 cuadros mostrados por segundo y también entra en juego otro aspecto: la tasa de fotogramas del monitor o la pantalla. Según esto, entonces, lo que se puede apreciar exactamente depende de la interacción de las dos tasas de fotogramas y del incremento del ángulo, donde en variados casos según la configuración se puede evidenciar la "mezcla" de los colores, por el solapamiento de las secciones, además de los efectos ya mencionados. 

La implementación utilizando p5.js realizada para el caso anterior se muestra a continuación: 

</div>

{{< details title="p5-instance-div markdown" open=true >}}
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
{{< p5-iframe sketch="/showcase/sketches/optical_illusions/stroboscopic_artifacts.js" width="500" height="500" >}}

<div style="text-align: justify">

## Moiré Patterns
Moiré es una palabra francesa que significa muaré en el español y es una textura o tipo de tejido que genera una visión sobre la seda simulando un entorno acuático y ondulado debido a la manera de su fabricación, que es la superposición de dos textiles húmedos generando un patrón cuando la seda se seca.  
Esta ilusión optica conocida como Moiré patterns o patrones muaré hace referencia a la superposición de dos patrones similares que están compuestos por rayas opacas ó de color junto con un espacio transaparente. Al encontrarse diferencias en los patrones, la colocación de los mismos, movimientos de rotación o desplazamiento y otros aspectos como aceleración o formatura, es posible generar una especie de bandas oscuras móviles conocidas como moirés. Este efecto no es simplemente aludido en el arte y la animación, sino que, tiene aplicaciones científicas en los campos de matemática y física en donde surgen cálculos con respecto a las formas, rotaciones, aceleraciones, desplazamientos, interferencia de ondas, entre otros más.  

La explicación a detalle de esta ilusión consiste en un fenonemo relativo a la luz y la superposición, pues la luz impacta a ambos patrones que permiten que esta pueda pasar o quedar bloqueada según la forma y/o el color o transparencia en el que se encuentre impactando. Esto genera una multiplicación en las razones de transmitancia de luz y dos frecuencias que a la vista parecen distintas.  
 
La implementación utilizando p5.js realizada para el caso anterior se muestra a continuación: 

</div>

{{< details title="p5-instance-div markdown" open=true >}}
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
{{< p5-iframe sketch="/showcase/sketches/optical_illusions/moire_patterns.js" width="500" height="500" >}}

<!-- ---
bookCollapseSection: true
--- -->
<!-- {{<section>}} -->