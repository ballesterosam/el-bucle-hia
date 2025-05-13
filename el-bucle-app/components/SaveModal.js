import React, { useState, useEffect } from 'react';
import { useCharacter } from '../context/CharacterContext';

export default function SaveModal({ isVisible, onClose, onSave, onDelete }) {
  const { getSavedCharacters, exportCharacter } = useCharacter();
  const [characterName, setCharacterName] = useState('');
  const [savedCharacters, setSavedCharacters] = useState([]);

  useEffect(() => {
    if (isVisible) {

      const characters = getSavedCharacters();
      characters.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
      setSavedCharacters(characters);
    }
  }, [isVisible, getSavedCharacters]);

  const handleSaveClick = () => {
    if (characterName) {
      onSave(characterName);
      setCharacterName('');
    }
    onClose();
  };

  const handleExportClick = () => {
    const characterJson = exportCharacter();
    const blob = new Blob([characterJson], { type: 'application/json' });
    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(blob);
    const filename = characterName ? `${characterName}.json` : 'character.json';
    anchor.download = filename;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(anchor.href), 1000);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="modal-backdrop" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div className="modal-content border border-cyan-400" style={{ backgroundColor: '#1a202c', padding: '20px', borderRadius: '8px', width: '90%', maxWidth: '400px' }}>
        <h2 className="text-2xl font-bold text-center mb-6 text-cyan-400" style={{ fontFamily: 'ElectroLiterate, sans-serif' }}>Guardar Personaje</h2>

        <div className="mb-4">
          <label className="block text-cyan-400 text-sm font-bold mb-2" style={{ fontFamily: 'ElectroLiterate, sans-serif' }}>Guardar nuevo personaje:</label>
          <input
            type="text"
            placeholder="Escribe un nombre..."
            className="w-full p-2 rounded bg-gray-800 text-white border border-cyan-400 focus:outline-none focus:ring focus:border-cyan-500"
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
          />
        </div>

        {savedCharacters.length > 0 ? (
          <div className="mb-6">
            <label className="block text-cyan-400 text-sm font-bold mb-2" style={{ fontFamily: 'ElectroLiterate, sans-serif' }}>O sobreescribe uno existente:</label>
             <select
               className="w-full p-2 rounded bg-gray-800 text-white border border-cyan-400 focus:outline-none focus:ring focus:border-cyan-500 cursor-pointer" 
               value={characterName}
               onChange={(e) => setCharacterName(e.target.value)}
             >
               <option value="">-- Selecciona para sobreescribir --</option>
               {savedCharacters.map(name => (
                 <option key={name.name} value={name.name}>{name.name}</option> 
               ))}
             </select>
          </div>
         ) : null} 

        <div className="flex flex-col gap-3"> 
          <button onClick={handleSaveClick} className="w-full py-3 rounded bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-bold text-lg">GUARDAR</button>
          <button onClick={handleExportClick} className="w-full py-3 rounded bg-transparent border border-green-600 text-green-600 font-bold text-lg hover:bg-green-600 hover:text-gray-900">EXPORTAR A FICHERO</button> 
          <button onClick={onClose} className="w-full py-3 rounded bg-transparent border border-red-500 text-red-500 font-bold text-lg hover:bg-red-500 hover:text-white">CANCELAR</button>
        </div>
      </div>
    </div>
  );
}