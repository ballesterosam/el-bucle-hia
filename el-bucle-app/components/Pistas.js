import React from 'react';
import { useCharacter } from '../context/CharacterContext';

export default function Pistas() {
  const { characterData, updateCharacter } = useCharacter();

  const handlePistasChange = (event) => {
    updateCharacter({ pistas: event.target.value });
  };

  return (
    <div className="card md:col-span-2 lg:col-span-3">
      <h2 className="card-title">Pistas</h2>
      <textarea id="pistas" className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700" rows="6" value={characterData.pistas} onChange={handlePistasChange}></textarea>
    </div>
  );
}