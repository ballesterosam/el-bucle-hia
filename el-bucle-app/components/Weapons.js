import React from 'react';
import { useCharacter } from '../context/CharacterContext';

export default function Weapons() {
  const { characterData, updateCharacter } = useCharacter();

  const addWeapon = () => {
    updateCharacter({ weapons: [...characterData.weapons, { name: '', damage: '', notes: '' }] });
  };

  const removeWeapon = (index) => {
    updateCharacter({ weapons: characterData.weapons.filter((_, i) => i !== index) });
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Armas</h3>
      <div id="weaponsList">
        {/* Weapon items will be rendered here */}
        {characterData.weapons.map((weapon, index) => (
          <div key={index} className="weapon-item grid grid-cols-4 gap-2 mb-2">
            <input
              type="text"
              placeholder="Nombre del Arma"
              className="col-span-1 p-1 rounded bg-gray-700 text-white border border-gray-600 text-sm"
              value={weapon.name}
              onChange={(e) => handleWeaponChange(index, 'name', e.target.value)}
            />
            <input
              type="text"
              placeholder="Daño"
              className="col-span-1 p-1 rounded bg-gray-700 text-white border border-gray-600 text-sm"
              value={weapon.damage}
              onChange={(e) => handleWeaponChange(index, 'damage', e.target.value)}
            />
            <input
              type="text"
              placeholder="Notas"
              className="col-span-1 p-1 rounded bg-gray-700 text-white border border-gray-600 text-sm"
              value={weapon.notes}
              onChange={(e) => handleWeaponChange(index, 'notes', e.target.value)}
            />
            <button
              className="remove-weapon-btn col-span-1 p-1 rounded bg-red-600 hover:bg-red-700 text-white text-sm"
              onClick={() => removeWeapon(index)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
      <button id="addWeaponButton" className="mt-4 w-full py-2 rounded bg-blue-600 hover:bg-blue-700" onClick={addWeapon}>Añadir Arma</button>
    </div>
  );
}