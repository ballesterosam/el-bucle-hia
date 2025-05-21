"use client";

import React from 'react';
import Footer from '../../components/Footer';

const LicensePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="main-content-area p-4 md:p-8 flex-grow text-white">
        <h1 className="main-title text-center">EL BUCLE <span className="subtitle"> Licencia </span></h1>

        <div className="text-center mt-8">
            <div className="grid-container">
              <div className="card lg:col-span-6">
                <h2 className="card-title">GPL ¿qué?</h2>
                  <p className="text-justify mb-4">Vale, llegamos a esa parte que suele tener más letra pequeña que un prospecto de medicamento experimental: la licencia. Pero ¡que no cunda el pánico! Voy a intentar resumíroslo en plan cuñado, sin que a nadie le explote la cabeza con palabrejas legales.</p>
                  <p className="text-justify mb-4">Esta humilde pero apañada aplicación se distribuye bajo la <strong>Licencia Pública General de GNU, versión 3</strong>, o como la llamamos los que estamos en el ajo, la <strong>GNU GPL v3</strong>. <em>"¿Y a esto lo llamas tú sin palabrejas?"</em>, me preguntaréis con los ojos entrecerrados. Pues significa, ni más ni menos, que sois libres como los pájaros (o casi) para hacer un montón de cosas con ella:</p>
                  <ul className="text-justify mb-4 list-disc">
                    <li className="list-inside"><strong>Usarla a tope:</strong> Descargadla, ejecutadla en vuestros dispositivos, ¡dadle toda la caña que queráis! No hay truco.</li>
                    <li className="list-inside"><strong>Cotillear sus entrañas:</strong> ¿Sois de los que les gusta ver cómo están hechas las cosas por dentro? ¡Adelante, valientes! El código fuente está ahí, a vuestra disposición, por si queréis echarle un vistazo. También tengo que reconocer que he usado esto para experimentar y la IA tiene gran parte del mérito y de las chapuzas que podéis encontrar.</li>
                    <li className="list-inside"><strong>Tunearla a vuestro gusto:</strong> Si se os ocurre alguna forma de mejorarla, adaptarla a vuestros maquiavélicos planes lúdicos o simplemente cambiarle el color de los botones porque os apetece, ¡tenéis permiso para modificarla!.</li>
                    <li className="list-inside"><strong>Compartirla con el mundo (o con vuestro gato):</strong> Pásadsela a vuestros amigos, a vuestro primo el de Cuenca que también está enganchado a <a className="custom-link" href="https://www.puntodeheroe.com/elbucle.html">El Bucle</a>, ¡a quien os dé la real gana!.</li>
                  </ul>
                  
                  <p className="text-justify mb-4"><em>"Suena demasiado bonito para ser verdad"</em>, estaréis pensando. Y sí, hay un "pero", aunque es un "pero" bastante enrollado. Es la magia del <strong>"copyleft"</strong>: si modificáis la aplicación y decidís distribuir vuestra tuneada obra de arte, tenéis que hacerlo bajo esta misma licencia GPL v3. Es como una cadena de favores: lo que es libre, se mantiene libre para todos los que vengan después. Así nos aseguramos de que la comunidad se beneficie, nadie se apropie del trabajo de los demás para convertirlo en algo cerrado y privativo, y el software siga siendo un lugar feliz, colorido y colaborativo.</p>
                  <p className="text-justify mb-4">Como bien dice la gente de la Free Software Foundation, esto va de <strong>"libertad, no de precio"</strong>. Aunque, oye, que esta app sea como un regalo caído del cielo tampoco está nada mal. ¡A disfrutarla!</p>
                  <p className="text-justify mb-4">Si sois de esa extraña especie de humanos que se leen los términos y condiciones hasta del champú, o simplemente os va el masoquismo legal y queréis empaparos del texto completo y oficial (y mucho menos divertido, todo sea dicho), aquí tenéis el pergamino sagrado: <a className="custom-link" href="https://www.gnu.org/licenses/gpl-3.0.html">Licencia GNU GPL v3</a>. ¡Que la Fuerza (y una buena dosis de paciencia) os acompañen en su lectura!</p>
          
              </div>
            </div>
        </div>
        <div className="mt-6">
          <a href="/" className="text-[#00f9ff] hover:underline" style={{textShadow: '0 0 3px #00f9ff'}}>
            ← Volver al inicio
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LicensePage;