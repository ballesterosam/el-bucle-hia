import React from 'react';
import { useCharacter } from '../context/CharacterContext';

export default function Pistas() {
  const { characterData, updateCharacter } = useCharacter();

  const handlePistasChange = (field, value) => {
    updateCharacter({ [field]: value });
  };

  return (
    <div className="card md:col-span-2 lg:col-span-3">
      <h2 className="card-title">Pistas</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="pistasNormales">PISTAS NORMALES:</label>
          <textarea
            id="pistasNormales"
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
            rows="8"
            value={characterData.pistasNormales || ''}
            onChange={(e) => handlePistasChange('pistasNormales', e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="pistasConfidenciales">PISTAS CONFIDENCIALES:</label>
          <textarea
            id="pistasConfidenciales"
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
            rows="8"
            value={characterData.pistasConfidenciales || ''}
            onChange={(e) => handlePistasChange('pistasConfidenciales', e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="pistasTemporales">PISTAS TEMPORALES:</label>
          <textarea
            id="pistasTemporales"
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
            rows="8"
            value={characterData.pistasTemporales || ''}
            onChange={(e) => handlePistasChange('pistasTemporales', e.target.value)}
          ></textarea>
          <p className="text-xs text-gray-400 mt-1">Borrar al pasar por la sección 1 / Nuevo día.</p>
        </div>
      </div>
    </div>
  );
}