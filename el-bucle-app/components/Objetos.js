import React from 'react';
import Weapons from './Weapons'; 
import Inventory from './Inventory'; 
import Money from './Money'; 

export default function Objetos() {
  return (
    <div className="card lg:col-span-3 md:col-span-2 ">
      <h2 className="card-title">Objetos</h2>

      <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
        <div>
          <Weapons />
        </div>

        <div>
          <Inventory />
          <Money /> 
        </div>
      </div>
    </div>
  );
}