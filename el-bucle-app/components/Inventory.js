import React from 'react';
import { useCharacter } from '../context/CharacterContext';

export default function Inventory() {
  const { characterData, updateCharacter } = useCharacter();

  const handleInventoryChange = (event) => {
    updateCharacter({ inventory: event.target.value });
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Inventario</h3>
      <textarea id="inventory" className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700" rows="4" value={characterData.inventory} onChange={handleInventoryChange}></textarea>
    </div>
  );
}