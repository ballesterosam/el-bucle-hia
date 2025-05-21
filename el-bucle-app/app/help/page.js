"use client";

import React from 'react';
import Footer from '../../components/Footer';

const HelpPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="main-content-area p-4 md:p-8 flex-grow text-white">
        <h1 className="main-title text-center">EL BUCLE <span className="subtitle"> Página de Ayuda </span></h1>

        <div className="text-center mt-8">
            <div className="grid-container">
              <div className="card lg:col-span-6">
              <h2 className="card-title">¿Qué es esto?</h2>
                <p className="text-justify mb-4">¿No siempre tienes papel y lapiz a mano cuando te sumerges en las aventuras de "El Bucle", pero nunca te separas de tu móvil?</p>
                <p className="text-justify mb-4">Esta pequeña aplicación es, básicamente, vuestro nuevo mejor amigo para enfrentaros al alucinante (y a veces un poquito enloquecedor) librojuego <a className="custom-link" href="https://www.puntodeheroe.com/elbucle.html">El Bucle</a>, obra del maestro Ramón Merino Collado. Pensad en esta app como la hoja de personaje de toda la vida, pero con un chute de cafeína y esteroides digitales, ¡y sin el peligro de que un derrame de vuestra bebida energética favorita borre para siempre esa pista que os iba a salvar el pellejo! La idea es simple: facilitaros la vida en la gestión del personaje para que podáis concentraros en lo importante: sobrevivir, resolver el misterio y, con suerte, ¡no perder la chaveta en el intento!</p>
                <p className="text-justify mb-4">Pero, esperad un momento... ¿Qué demonios es <a className="custom-link" href="https://www.puntodeheroe.com/elbucle.html">El Bucle</a>?, os preguntaréis algunos. Pues bien, esto no es el típico <em>"Elige tu propia aventura"</em> que leías de crío (a no ser que vuestro abuelo fuera un fanático de los enigmas temporales con un doctorado en física cuántica). <a className="custom-link" href="https://www.puntodeheroe.com/elbucle.html">El Bucle</a> es una experiencia donde, como su propio nombre indica, estáis atrapados en un día que se repite una y otra vez. Sí, sí, al más puro estilo de "la dichosa Marmota de Bill Murray". Te despiertas, vives tu día (que suele incluir momentos de "¡madre mía, qué está pasando!"), probablemente la palmas o fracasas de forma espectacular y... ¡hop!, de vuelta al mismo sótano cutre donde empezó todo.</p>
                <p className="text-justify mb-4">La descripción oficial lo llama un <em>"delirante librojuego de investigación"</em> con <em>"mecánicas exóticas y un febril diseño"</em>, y los valientes que se han adentrado en él lo confirman: es un "puzzle delicioso" y un "rompecabezas narrativo con estructura de viajes en el tiempo que pondrá a prueba tus dotes detectivescas". No es moco de pavo; estamos hablando de unas "660 secciones aproximadamente", y la verdadera miga del asunto está en la cantidad de datos que hay que gestionar y descubrir. Además alguna de las que considero sus "mecánicas estrella" son una auténtica genialidad que añade un montón de chicha al juego. Os pasaréis el tiempo "recolectando pistas explorando todos los rincones de la ciudad, y hazme caso, encontrarás más pistas que en una película de Sherlock Holmes.</p>
                <p className="text-justify mb-4">Llevar la cuenta de todo –objetos, estados del personaje, quién dijo qué antes de que el universo decidiera rebobinar– es una tarea digna de un titán con memoria fotográfica. Hay jugadores que adjuntan fotos de sus cuadernos de notas a las reseñas online, ¡así de intenso es el tema!. La hoja de personaje oficial, que podéis descargar de la web de <a className="custom-link" href="https://www.puntodeheroe.com/elbucle.html">Punto de Héroe</a>, es un buen punto de partida, pero, o la imprimís en un A1, u os aseguro que os va a faltar espacio.</p>
                <p className="text-justify mb-4">Pues bien, esta aplicación aspira a ser esa hoja "bien grande" y con espacio infinito, pero en vuestro móvil o tablet. Para que gestionar vuestro inventario, estadísticas y esas pistas vitales sea pan comido, y no tengáis que contribuir a la deforestación del Amazonas (el de verdad, no la tienda online).</p>
                <p className="text-justify mb-4">Si queréis saber más sobre esta joya literario-lúdica, echadle un ojo a la <a className="custom-link" href="https://www.puntodeheroe.com/elbucle.html">fuente original</a>.</p>
    
              <h2 className="card-title">Cómo Usar la Hoja de Personaje</h2>
                <p className="text-justify mb-4">Esta aplicación te permite gestionar la hoja de tu personaje de manera sencilla e interactiva. El formulario principal presenta diferentes secciones (Características, Vida, Objetos, etc.) donde puedes introducir y actualizar toda la información relevante de tu personaje a medida que avanza tu aventura.</p>
                <p className="text-justify mb-4"><strong>No necesitas registrarte</strong> para utilizar la aplicación. Puedes empezar a crear y modificar a tu personaje inmediatamente.</p>
              <h2 className="card-title">¡Precaución, amigo conductor!</h2>
                <p className="text-justify mb-4">Es importante tener en cuenta que <strong>los datos de tu personaje se almacenan localmente</strong> en el navegador o dispositivo que estás utilizando. Esto significa que tu información permanece privada en tu equipo.</p>
                <p className="text-justify mb-4">Sin embargo, no regalar tus datos personales siempre tiene un riesgo. Debido a este método de almacenamiento local, hay un aspecto crucial a considerar: si cambias de dispositivo, utilizas un navegador diferente, o borras la caché y los datos de navegación de tu navegador actual, <strong>perderás la información de tu personaje</strong> a menos que la hayas guardado explícitamente utilizando la función de exportar.</p>
                <p className="text-justify mb-4">Para evitar la pérdida de datos y poder acceder a tus personajes desde diferentes lugares o como copia de seguridad, <strong>te recomendaría encarecidamente exportar la información de tu personaje de vez en cuando</strong> utilizando la opción de <strong>Exportar a un fichero</strong>, pero claro, ¿quién soy yo para recomendarte nada, si ni siquiera te conozco. Aún así, esto te permitirá importar tu personaje en otro momento o en otro dispositivo si es necesario.</p>
                <p className="text-justify mb-4">Utiliza los botones en la parte inferior del formulario para "Nuevo Personaje", "Cargar Personaje" y "Guardar Personaje" para gestionar tus creaciones.</p>
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

export default HelpPage;