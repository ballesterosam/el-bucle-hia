"use client";

import React from 'react';
import Footer from '../../components/Footer';

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="main-content-area p-4 md:p-8 flex-grow text-white">
        <h1 className="main-title text-center">EL BUCLE <span className="subtitle"> Yo soy aquel </span></h1>

        <div className="text-center mt-8">
            <div className="grid-container">
              <div className="card lg:col-span-6">
              <h2 className="card-title">Alberto Martínez Ballesteros</h2>
                <p className="text-justify mb-4">¡Muy buenas, intrépidos viajeros del tiempo y descifradores de enigmas! Soy <a className="custom-link" href="https://www.linkedin.com/in/alberto-mart%C3%ADnez-ballesteros-1995642b/">Alberto Martínez Ballesteros</a>, y sí, confieso: soy el tipo que ha perpetrado esta aplicación. Así que, si algo funciona de maravilla y os salva de un bucle infinito de desesperación, ¡ya sabéis a quién enviarle una caja de bombones! Y si algo falla... bueno, digamos que  he usado todo esto para aprender alguna cosilla nueva y me he apoyado más de lo que me gustaría reconocer en la IA, así que la culpa es de una de esas inteligencias artificiales que algún día nos dominarán.</p>
                <p className="text-justify mb-4">Mi romance con los ordenadores y todo lo que lleva cables empezó cuando aún llevaba pantalones cortos y creía que los monstruos se escondían debajo de la cama. Todo comenzó con un legendario <strong>"libro gordo de Basic"</strong> que acompañaba a un viejo Spectrum que llegó a mi poder a la tierna edad de 8 añitos y que todavía atesoro como si fuera una reliquia familiar de valor incalculable (el libro, por desgrcia, el ordenador ya no). Desde ese flechazo inicial, me convertí en ese bicho raro que se queda embobado mirando cualquier cosa con lucecitas y que siente una atracción fatal por cualquier cacharro que lleve una batería de litio. Si parpadea, se carga o hace ruiditos extraños, podeís estar seguros de que tiene toda mi atención.</p>
                <p className="text-justify mb-4">Cuando no estoy intentando desentrañar paradojas temporales (o creando aplicaciones para ayudar a otros a hacerlo), me gano el pan de cada día como <strong>Arquitecto de Software</strong>. Llevo ya más de dos décadas dedicándome a esto, lo que en años de informático es casi como la edad de Matusalén. Tampoco me disgusta subirme de vez en cuando a un escenario, ya sea para dar la chapa con temas tecnológicos, o para bailar una salsa (en esta vida hay que ser polivalente). No obstante, tengo otros hobbies más allá de los cacharritos: me encanta <a className="custom-link" href="https://www.strava.com/athletes/3256248">practicar deporte</a>, especialmente triatlón y, cada vez más, los juegos de mesa y todos sus derivados.</p>
                <p className="text-justify mb-4">¿Y por qué esta app para <a className="custom-link" href="https://www.puntodeheroe.com/elbucle.html">El Bucle</a>, os preguntaréis? Pues porque, además de ser un devorador confeso del librojuego, soy un <strong>"beta-tester" por vocación</strong> para cualquier tecnología nueva que se cruce en mi camino... y después de llevar muchos años en esto, no he podido resistirme a jugar con algo de IA para ver hasta dónde podía sacarle partido. La idea surgió de forma natural: estaba leyendo <a className="custom-link" href="https://www.puntodeheroe.com/elbucle.html">El Bucle</a> en el sofá y no tenía un lápiz a mano. Me daba mucha pereza levantarme, así que, cogí el móvil, y empezé a trastear con Gemini hasta tener algo funcional que me permitiera llevar el control de mi personaje. Suena a chiste, y, pensándolo ahora, habría ahorrado tiempo levantándome a por el lápiz, pero la verdad es que todo empezó así. Y, ya que estaba metido en faena, pensé: "¿Por qué no compartir esta pequeña herramienta con otros sufridores... digo, valientes aventureros?" Seguro que más de uno también se ha sentado sin lápiz ni papel pensando que esto era un "Elige tu propia aventura" y ahora también le da pereza levantarse. Si con esto puedo ahorrarle a alguien un dolor de cabeza o evitar que una hoja de personaje acabe hecha una bola de papel por la frustración, ¡misión cumplida!</p>
                <p className="text-justify mb-4">Si después de este rollo todavía os pica la curiosidad sobre mi vida profesional (o simplemente queréis cotillear mi foto de perfil de LinkedIn), podéis encontrarme <a className="custom-link" href="https://www.linkedin.com/in/alberto-mart%C3%ADnez-ballesteros-1995642b/">aquí</a>.</p>
           
              </div>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;