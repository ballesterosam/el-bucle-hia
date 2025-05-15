import React from 'react';
import { useCharacter } from '../context/CharacterContext';

export default function Weapons() {
  const { characterData, updateCharacter } = useCharacter();

  const handleWeaponChange = (index, field, value) => {
    const updatedWeapons = characterData.weapons.map((weapon, i) => {
      if (i === index) {
        return { ...weapon, [field]: value };
      }
      return weapon;
    });
    updateCharacter({ weapons: updatedWeapons });
  };

  const addWeapon = () => {
    if (characterData.weapons.length >= 3) {
      alert('You have reached the maximum number of weapons (3).');
      return;
    }

    updateCharacter({ weapons: [...characterData.weapons, { name: '', damage: '', type: 'Cuerpo a Cuerpo' }] });
  };

  const removeWeapon = (index) => {
    updateCharacter({ weapons: characterData.weapons.filter((_, i) => i !== index) });
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Armas <span className="text-xs-custom">(máximo 3)</span></h3>
      <div id="weaponsList">
        {characterData.weapons.map((weapon, index) => (
          <div key={index} className="weapon-item grid grid-cols-1 gap-2 mb-2 p-3 items-center sm:grid-cols-12">
            <input
              type="text"
              placeholder="Nombre del Arma"
              className="sm:col-span-5 rounded bg-gray-700 text-white border border-gray-600 text-sm"
              value={weapon.name}
              onChange={(e) => handleWeaponChange(index, 'name', e.target.value)}
            />

            <input
              type="text"
              placeholder="Daño"
              className="sm:col-span-2 rounded bg-gray-700 text-white border border-gray-600 text-sm"
              value={weapon.damage}
              onChange={(e) => handleWeaponChange(index, 'damage', e.target.value)}
            />

            <select
              className="sm:col-span-4 rounded bg-gray-700 text-white border border-gray-600 text-sm"
              value={weapon.type || 'Cuerpo a Cuerpo'} // Default to Cuerpo a Cuerpo if type is undefined
              onChange={(e) => handleWeaponChange(index, 'type', e.target.value)}
            >
              <option value="Cuerpo a Cuerpo">Cuerpo a Cuerpo</option>
              <option value="A Distancia (Tiroteo)">A Distancia</option>
            </select>

            <button
              className="sm:col-span-1 remove-weapon-btn p-1 rounded bg-red-600 hover:bg-red-700 text-white text-sm flex items-center justify-center w-8 h-10"
              onClick={() => removeWeapon(index)}
            >

              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>

            </button>
          </div>
        ))}
      </div>
      {characterData.weapons.length < 3 && (
        <button id="addWeaponButton" className="mt-4 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700" onClick={addWeapon}>Añadir Arma</button>
      )}
    </div>
  );
}