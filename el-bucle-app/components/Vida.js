import React from 'react';
import { useCharacter } from '../context/CharacterContext';

export default function Vida() {
  const { characterData, updateCharacter } = useCharacter();

  const handleLifeChange = (event) => {
 updateCharacter({ life: event.target.value });
  };

  let cardClass = 'card lg:col-span-1';
  if (characterData.life === 'Herido') {
 cardClass += ' vida-herido';
  } else if (characterData.life === 'Grave') {
 cardClass += ' vida-grave';
  } else { // Sano
 cardClass += ' vida-sano';
  }

  return (
 <div className={cardClass}>
      <h2 className="card-title">Vida</h2>
 <div className="radio-group">
 <label>
 <input
 type="radio"
 name="lifeStatus"
 value="Sano"
 checked={characterData.life === 'Sano'}
 onChange={handleLifeChange}
 />
 Sano
 </label>
 <label>
 <input
 type="radio"
 name="lifeStatus"
 value="Herido"
 checked={characterData.life === 'Herido'}
 onChange={handleLifeChange}
 />
 Herido
 </label>
 <label>
 <input
 type="radio"
 name="lifeStatus"
 value="Grave"
 checked={characterData.life === 'Grave'}
 onChange={handleLifeChange}
 />
 Grave
          <span className="ml-2 text-sm text-red-400 text-xs-custom"> &nbsp; (-1 Cuerpo y mente)</span>
 </label>
      </div>
      <p className="text-sm text-gray-400 mt-2  text-xs-custom">Si la vida llega a 0, estás muerto (pasa al 14).</p>
    </div>
  );
}