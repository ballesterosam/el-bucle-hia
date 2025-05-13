import React, { useState, useEffect, useRef } from 'react';

export default function ExportModal({ isVisible, onClose, jsonData }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (isVisible && textareaRef.current) {
      textareaRef.current.select();
    }
  }, [isVisible]);

  const handleCopyClick = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
      document.execCommand('copy');
      // Optionally provide user feedback (e.g., a tooltip or message)
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="modal-backdrop" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div className="modal-content" style={{ backgroundColor: '#1f2937', padding: '20px', borderRadius: '8px', width: '90%', maxWidth: '600px' }}>
        <h2 className="text-xl font-bold mb-4">Exportar Personaje</h2>
        <textarea
          ref={textareaRef}
          readOnly
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 mb-4"
          rows="10"
          value={jsonData}
        ></textarea>
        <div className="flex justify-end gap-4">
          <button onClick={handleCopyClick} className="py-2 px-4 rounded bg-blue-600 hover:bg-blue-700 text-white">Copiar</button>
          <button onClick={onClose} className="py-2 px-4 rounded bg-gray-600 hover:bg-gray-700 text-white">Cerrar</button>
        </div>
      </div>
    </div>
  );
}