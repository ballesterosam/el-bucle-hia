"use client";

import React, { useState } from 'react'; 
import Characteristics from '../components/Characteristics'; 
import Vida from '../components/Vida'; 
import GestaTiempo from '../components/GestaTiempo';
import Objetos from '../components/Objetos'; 
import Pistas from '../components/Pistas';
import NotasPorZona from '../components/NotasPorZona'; 
import SaveModal from '../components/SaveModal';
import { CharacterProvider, useCharacter } from '../context/CharacterContext'; 
import LoadModal from '../components/LoadModal';

export default function Home() {
  const CharacterSheetContent = () => {
    const { characterData, saveCharacter, loadCharacter } = useCharacter();

    const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);
    const [isLoadModalVisible, setIsLoadModalVisible] = useState(false);

    const openSaveModal = () => setIsSaveModalVisible(true);
    const closeSaveModal = () => setIsSaveModalVisible(false);
    const openLoadModal = () => setIsLoadModalVisible(true);

  const handleLoadCharacter = (characterName) => {
    if (characterName) {
      loadCharacter(characterName);
    } else {
      loadCharacter(null);
    }
  };
  
  const handleNewCharacter = () => {
    loadCharacter(null);
  };
    const closeLoadModal = () => {
        setIsLoadModalVisible(false);
    };
    
 return (
    <div className="flex flex-col min-h-screen">
      <div className="main-content-area p-4 md:p-8">
        <h1 className="main-title text-center">EL BUCLE <span className="subtitle"> Hoja de Personaje </span></h1>
        
        <div className="grid-container">
          <Characteristics />
          <Vida />
          <GestaTiempo />
          <Objetos />
          <Pistas />
          <NotasPorZona />
        </div>
      </div>
      <div className="footer-actions flex flex-wrap justify-center items-center gap-4">
        <div className="md:col-span-3 flex justify-center space-x-4 mt-4">
          <button onClick={handleNewCharacter} className="btn">Nuevo Personaje</button>
          <button onClick={openLoadModal} className="btn">Cargar Personaje</button>
          <button onClick={openSaveModal} className="btn">Guardar Personaje</button> 
        </div>
      </div>

      <SaveModal isVisible={isSaveModalVisible} onClose={closeSaveModal} onSave={saveCharacter} />
      <LoadModal isVisible={isLoadModalVisible} onClose={closeLoadModal} onLoad={handleLoadCharacter} />
    </div>
 );
  };

 return (
    <CharacterProvider>
      <CharacterSheetContent />
    </CharacterProvider>
 );
}