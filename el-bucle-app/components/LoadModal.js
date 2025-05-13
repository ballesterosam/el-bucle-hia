import React, { useState, useEffect } from 'react';
import { useCharacter } from '../context/CharacterContext';

export default function LoadModal({ isVisible, onClose, onLoad }) {
  const { getSavedCharacters } = useCharacter();
  const [savedCharacters, setSavedCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    if (isVisible) {
      setSavedCharacters(getSavedCharacters());
    }
  }, [isVisible, getSavedCharacters]);

  const handleLoadClick = () => {
    if (selectedCharacter) {
      onLoad(selectedCharacter);
    }
    onClose();
  };

  const handleNewCharacterClick = () => {
    onLoad(null); // Indicate loading a new character
    onClose();
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
              <li key={name} className={`p-2 cursor-pointer ${selectedCharacter === name ? 'bg-gray-700' : 'hover:bg-gray-700'}`} onClick={() => setSelectedCharacter(name)}>
                {name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay personajes guardados.</p>
        )}

        <div className="flex justify-end gap-4 mt-4">
          <button onClick={handleNewCharacterClick} className="py-2 px-4 rounded bg-blue-600 hover:bg-blue-700 text-white">Nuevo Personaje</button>
          <button onClick={handleLoadClick} disabled={!selectedCharacter} className={`py-2 px-4 rounded ${selectedCharacter ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-500 cursor-not-allowed'} text-white`}>Cargar</button>
           <button onClick={onClose} className="py-2 px-4 rounded bg-gray-600 hover:bg-gray-700 text-white">Cancelar</button>
        </div>
      </div>
    </div>
  );
}