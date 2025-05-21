'use client';
import { useState } from 'react';

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMapaModal, setShowMapaModal] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const openMapaModal = (e) => {
    e.preventDefault();
    setShowMapaModal(true);
    setIsOpen(false); // Cerramos el menú al abrir el modal
  };

  const closeMapaModal = () => {
    setShowMapaModal(false);
  };

  return (
    <div className="relative">
      {/* Botón de hamburguesa */}
      <button 
        onClick={toggleMenu} 
        className="flex flex-col justify-center items-center w-10 h-10 p-2 rounded-md focus:outline-none"
        aria-label="Menú"
      >
        <span className={`block w-6 h-0.5 bg-[#00f9ff] mb-1.5 transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`} style={{boxShadow: '0 0 5px #00f9ff, 0 0 10px #00f9ff'}}></span>
        <span className={`block w-6 h-0.5 bg-[#00f9ff] mb-1.5 transition-opacity ${isOpen ? 'opacity-0' : ''}`} style={{boxShadow: '0 0 5px #00f9ff, 0 0 10px #00f9ff'}}></span>
        <span className={`block w-6 h-0.5 bg-[#00f9ff] transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{boxShadow: '0 0 5px #00f9ff, 0 0 10px #00f9ff'}}></span>
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="absolute top-12 right-0 w-48 bg-[#0a192f] border border-[#00f9ff] shadow-lg rounded-md py-2 z-50" style={{boxShadow: '0 0 15px rgba(0, 249, 255, 0.3)'}}>
          <a href="/" className="block px-4 py-2 text-[#e0e0e0] hover:bg-[rgba(0,249,255,0.1)]">
            Inicio
          </a>
          <a 
            href="/mapa-mental" 
            className="block px-4 py-2 text-[#e0e0e0] hover:bg-[rgba(0,249,255,0.1)]">
              Mapa Mental
          </a>
          <button 
            onClick={openMapaModal} 
            className="w-full text-left px-4 py-2 text-[#e0e0e0] hover:bg-[rgba(0,249,255,0.1)]"
          >
            Mapa de Tanis
          </button>
          <a
            href="/help"
            className="block px-4 py-2 text-[#e0e0e0] hover:bg-[rgba(0,249,255,0.1)]"
          >
            Ayuda
          </a>
          <a 
            href="/license"
            className="block px-4 py-2 text-[#e0e0e0] hover:bg-[rgba(0,249,255,0.1)]"
            >
            Licencia
          </a>
          <a
            href="/about"
            className="block px-4 py-2 text-[#e0e0e0] hover:bg-[rgba(0,249,255,0.1)]"
          >
            Sobre mi
          </a>
        </div>
      )}

      {/* Modal para el Mapa de Tanis */}
      {showMapaModal && (
        <div className="modal-backdrop" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div className="relative bg-[#0a192f] p-4 rounded-lg border border-[#00f9ff]" style={{boxShadow: '0 0 20px rgba(0, 249, 255, 0.5)'}}>
            <button 
              onClick={closeMapaModal}
              className="absolute top-2 right-2 text-[#00f9ff] hover:text-white"
              style={{textShadow: '0 0 5px #00f9ff'}}
            >
              ✕
            </button>
            <h2 className="text-xl text-[#00f9ff] mb-4 font-bold" style={{textShadow: '0 0 5px #00f9ff'}}>Mapa de Tanis</h2>
            <div className="relative">
              <img 
                src="/imgs/MapaTanis.jpg" 
                alt="Mapa de Tanis" 
                className="max-w-full max-h-[80vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}