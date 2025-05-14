import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4 px-6 mt-8">
      <div className="container mx-auto flex flex-wrap justify-center gap-6 text-sm">
        <a href="/" className="hover:underline">
          Inicio
        </a>
        <span className="text-gray-600">|</span>
        <a href="/help" className="hover:underline">
          Ayuda
        </a>
        <span className="text-gray-600">|</span>
        <a 
          href="/license"
          className="hover:underline"
        >
          Licencia
        </a>
        <span className="text-gray-600">|</span>
        <a
          href="/about"
          className="hover:underline"
        >
          Sobre mi
        </a>
      </div>
    </footer>
  );
}