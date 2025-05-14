import React from 'react';
import { useCharacter } from '../context/CharacterContext';

function GestaTiempo() {
  const { characterData, updateCharacter } = useCharacter();

  const adjustGesta = (amount) => {
    const newGesta = characterData.gesta + amount;
    if (newGesta >= 0) {
      updateCharacter({ gesta: newGesta });
    }
  };

  const adjustDiasBucle = (amount) => {
    const oldDiasBucle = characterData.diasBucle;
    const newDiasBucle = characterData.diasBucle + amount;
    if (newDiasBucle >= 0) {
      if (newDiasBucle === oldDiasBucle + 1) {
        updateCharacter({ pistasTemporales: '' });
      }

      updateCharacter({ diasBucle: newDiasBucle });
    }
  };

  const adjustTiempoHora = (amount) => {
    let newTiempoHora = characterData.tiempoHora + amount;
    let newDiasBucle = characterData.diasBucle;
    let newGesta = characterData.gesta;

    if (newTiempoHora > 23) {
      newTiempoHora = 8;
      newDiasBucle += 1;

    } else if (newTiempoHora < 8) {
       if (newDiasBucle > 0) {
          newTiempoHora = 23;
          newDiasBucle -= 1;
       } else {
         newTiempoHora = 8;
       }
    }

     const updates = { tiempoHora: newTiempoHora };
     if (newDiasBucle !== characterData.diasBucle) {
         updates.diasBucle = newDiasBucle;
     }

      updateCharacter(updates);
  }
  return (
    <div className="card lg:col-span-1">
      <h2 className="card-title">Gesta y Tiempo</h2>

      {/* Gesta */}
      <div className="mb-4 control">
        <label>Gesta:</label>
        <div className="flex items-center justify-center gap-4 stat-control">
          <button onClick={() => adjustGesta(-1)} disabled={characterData.gesta <= 0}>-</button>
          <span className="stat-value">{characterData.gesta}</span>
          <button onClick={() => adjustGesta(1)}>+</button>
        </div>
      </div>

      <div className="mb-4 control">
        <label>Días en el bucle:</label>
        <div className="flex items-center justify-center gap-4 stat-control">
          <button onClick={() => adjustDiasBucle(-1)} disabled={characterData.diasBucle <= 0}>-</button>
          <span className="stat-value">{characterData.diasBucle}</span>
          <button onClick={() => adjustDiasBucle(1)}>+</button>
        </div>
        <p className="text-sm text-gray-400 mt-2 text-center text-xs-custom">Suma 1 GESTA por semana (7 días).</p>
      </div>
      <div className="mb-4 control">
        <label>Tiempo (hora):</label>
        <div className="flex items-center justify-center gap-4 stat-control">
          <button onClick={() => adjustTiempoHora(-1)}>-</button>
          <span className="stat-value">{characterData.tiempoHora}</span>
          <button onClick={() => adjustTiempoHora(1)}>+</button>
        </div>
        <p className="text-sm text-gray-400 mt-2 text-center text-xs-custom">De 8 a 23. Al llegar a 24, reinicia el día.</p>
      </div>
    </div>
  );
}

export default GestaTiempo;