import React from 'react';
import Weapons from './Weapons'; // Import Weapons component
import Inventory from './Inventory'; // Import Inventory component
import Money from './Money'; // Import Money component

export default function Objetos() {
  return (
    <div className="card md:col-span-2 lg:col-span-3">
      <h2 className="card-title">Objetos</h2>
      <Weapons /> {/* Render Weapons Component */}
      <Inventory /> {/* Render Inventory Component */}
      <Money /> {/* Render Money Component */}
    </div>
  );
}