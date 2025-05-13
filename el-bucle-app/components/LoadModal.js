import React, { useState, useEffect } from 'react';
import { useCharacter } from '../context/CharacterContext';

export default function LoadModal({ isVisible, onClose, onLoad, onImport }) {
  const { getSavedCharacters, deleteCharacter, importCharacter } = useCharacter();
  const [savedCharacters, setSavedCharacters] = useState([]);

  useEffect(() => {
    if (isVisible) {
      const characters = getSavedCharacters();
      setSavedCharacters(characters.sort((a, b) => b.lastModified.localeCompare(a.lastModified)));
    }
  }, [isVisible, getSavedCharacters]);

  const handleDeleteClick = (characterName) => {
    if (window.confirm(`¿Estás seguro de que quieres borrar a ${characterName}?`)) {
      deleteCharacter(characterName);
      setSavedCharacters(getSavedCharacters());
    }
  }

  const handleImportClick = () => {
    document.getElementById('importFile').click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          importCharacter(e.target.result);
          onClose(); 
        } catch (error) {
          console.error('Error importing character:', error);
        }
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };
      reader.readAsText(file); 
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="modal-backdrop" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div className="modal-content" style={{ backgroundColor: '#1f2937', padding: '20px', borderRadius: '8px', width: '90%', maxWidth: '400px' }}>
        <h2 className="text-xl font-bold mb-4">Cargar Personaje</h2>
        {savedCharacters.length > 0 ? (
          <ul>
            {savedCharacters.map(name => (
              <li key={name.name} className="py-2 bg-gray-800 border-b border-cyan-400"> 
                <div className="flex justify-between items-center cursor-pointer px-4" onClick={() => { onLoad(name.name); onClose(); }}>
                  <span className="text-white font-bold">{name.name}</span> 
                  <button onClick={(e) => { e.stopPropagation(); handleDeleteClick(name.name); }} className="text-red-500 hover:text-red-700 ml-4 cursor-pointer">&times;</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay personajes guardados.</p>
        )}

        <input type="file" id="importFile" className="hidden" onChange={handleFileChange} accept=".json" />

        <div className="flex flex-col gap-3 mt-4">      
          <button onClick={handleImportClick} className="w-full py-3 rounded bg-transparent border border-green-600 text-green-600 font-bold text-lg hover:bg-green-600 hover:text-gray-900">IMPORTAR DESDE FICHERO</button> 
          <button onClick={onClose} className="w-full py-3 rounded bg-transparent border border-red-500 text-red-500 font-bold text-lg hover:bg-red-500 hover:text-white">CANCELAR</button>
        </div>
      </div>
    </div>
  );
}