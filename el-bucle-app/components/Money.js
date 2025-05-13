import React from 'react';
import { useCharacter } from '../context/CharacterContext';

export default function Money() {
  const { characterData, updateCharacter } = useCharacter();

  const handleMoneyChange = (event) => {
    updateCharacter({ money: event.target.value });
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Dinero</h3>
      <input type="number" id="money" className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700" value={characterData.money} onChange={handleMoneyChange} />
    </div>
  );
}