import React, { useState } from 'react';

export default function ImportModal({ isVisible, onClose, onImport }) {
  const [jsonString, setJsonString] = useState('');

  const handleImportClick = () => {
    if (jsonString) {
      onImport(jsonString);
      setJsonString(''); 
    }
    onClose();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="modal-backdrop" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div className="modal-content" style={{ backgroundColor: '#1f2937', padding: '20px', borderRadius: '8px', width: '90%', maxWidth: '600px' }}>
        <h2 className="text-xl font-bold mb-4">Importar Personaje</h2>
        <textarea
          placeholder="Pega el JSON del personaje aquí..."
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 mb-4"
          rows="10"
          value={jsonString}
          onChange={(e) => setJsonString(e.target.value)}
        ></textarea>
        <div className="flex justify-end gap-4">
           <button onClick={onClose} className="py-2 px-4 rounded bg-gray-600 hover:bg-gray-700 text-white">Cancelar</button>
          <button onClick={handleImportClick} className="py-2 px-4 rounded bg-green-600 hover:bg-green-700 text-white">Importar</button>
        </div>
      </div>
    </div>
  );
}