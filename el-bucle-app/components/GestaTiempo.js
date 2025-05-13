import React from 'react';
import { useCharacter } from '../context/CharacterContext';

function GestaTiempo() {
  const { characterData, updateCharacter } = useCharacter();

  // Helper function to update gesta based on days
  const updateGestaBasedOnDays = (currentGesta, newDiasBucle) => {
      // Calculate the expected gesta based on the new days. Integer division by 7.
      const expectedGesta = Math.floor(newDiasBucle / 7);
      // Only update gesta if the calculated expected gesta is higher than current.
      // This prevents gesta from decreasing if days are manually decreased below a multiple of 7.
      // If manual decrease of gesta is needed, it should be handled by its own button.
      return Math.max(currentGesta, expectedGesta);
  };


  const adjustGesta = (amount) => {
    const newGesta = characterData.gesta + amount;
    if (newGesta >= 0) {
      updateCharacter({ gesta: newGesta });
    }
  };

  const adjustDiasBucle = (amount) => {
    const newDiasBucle = characterData.diasBucle + amount;
    if (newDiasBucle >= 0) {
      // Update diasBucle
      updateCharacter({ diasBucle: newDiasBucle });

      // Check if gesta should increase based on new days
      const newGesta = updateGestaBasedOnDays(characterData.gesta, newDiasBucle);
       if (newGesta !== characterData.gesta) {
          updateCharacter({ gesta: newGesta });
       }
    }
  };

  const adjustTiempoHora = (amount) => {
    let newTiempoHora = characterData.tiempoHora + amount;
    let newDiasBucle = characterData.diasBucle;
    let newGesta = characterData.gesta;

    if (newTiempoHora > 23) {
      newTiempoHora = 8; // Reset time to 8
      newDiasBucle += 1; // Increment days
       // Check if gesta should increase based on new days
       newGesta = updateGestaBasedOnDays(characterData.gesta, newDiasBucle);

    } else if (newTiempoHora < 8) {
       // Handle decrementing below 8
       if (newDiasBucle > 0) {
          newTiempoHora = 23; // Go back to 23
          newDiasBucle -= 1; // Decrement days
          // Note: Decrementing days doesn't automatically decrease gesta with this logic.
          // This might be a desired behavior or need further refinement.
       } else {
         // Cannot go below 0 days, so time stays at 8 if already 0 days
         newTiempoHora = 8;
       }
        // Recalculate gesta based on potentially decremented days
       newGesta = updateGestaBasedOnDays(characterData.gesta, newDiasBucle); // Recalculate gesta, ensures it doesn't drop below expected based on new days
    }

    // Only update the state once with all changed values
     const updates = { tiempoHora: newTiempoHora };
     if (newDiasBucle !== characterData.diasBucle) {
         updates.diasBucle = newDiasBucle;
     }
      if (newGesta !== characterData.gesta) {
         updates.gesta = newGesta;
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