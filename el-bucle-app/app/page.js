"use client";

import React, { useState } from 'react'; // Import React and useState
import Characteristics from '../components/Characteristics'; // Import Characteristics component
import Vida from '../components/Vida'; // Import Vida component
import GestaTiempo from '../components/GestaTiempo'; // Import GestaTiempo component
import Objetos from '../components/Objetos'; // Import Objetos component
import Pistas from '../components/Pistas'; // Import Pistas component
import NotasPorZona from '../components/NotasPorZona'; // Import NotasPorZona component
import SaveModal from '../components/SaveModal'; // Import SaveModal
import LoadModal from '../components/LoadModal'; // Import LoadModal
import ExportModal from '../components/ExportModal'; // Import ExportModal
import ImportModal from '../components/ImportModal'; // Import ImportModal
import { CharacterProvider, useCharacter } from '../context/CharacterContext'; // Import CharacterProvider and useCharacter

export default function Home() {
  const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);
  const [isLoadModalVisible, setIsLoadModalVisible] = useState(false);
  const [isExportModalVisible, setIsExportModalVisible] = useState(false);
  const [isImportModalVisible, setIsImportModalVisible] = useState(false);
  const [exportedJsonData, setExportedJsonData] = useState('');

  const openSaveModal = () => setIsSaveModalVisible(true);
  const closeSaveModal = () => setIsSaveModalVisible(false);

  const openLoadModal = () => setIsLoadModalVisible(true);
  const closeLoadModal = () => setIsLoadModalVisible(false);

  // Define context access and modal logic inside a client component
  // that is rendered within CharacterProvider
  const CharacterSheetContent = () => {
    const { saveCharacter, loadCharacter, exportCharacter, importCharacter } = useCharacter();

    // ... (move modal state and handlers here)
  const openExportModal = () => {
    setExportedJsonData(exportCharacter());
    setIsExportModalVisible(true);
  };
  const closeExportModal = () => setIsExportModalVisible(false);


  const openImportModal = () => setIsImportModalVisible(true);
  const closeImportModal = () => setIsImportModalVisible(false);


  const handleLoadCharacter = (characterName) => {
    if (characterName) {
      loadCharacter(characterName);
    } else {
      // Handle loading a new character (reset state to default)
      loadCharacter(null); // Context loadCharacter should handle null to reset
    }
  };

 return (
    // Move the main content JSX here
    <div className="flex flex-col min-h-screen">
      <div className="main-content-area p-4 md:p-8">
        <h1 className="main-title text-center">EL BUCLE - H.I.A.</h1>
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
        <button onClick={openSaveModal} className="py-2 px-4 rounded bg-blue-600 hover:bg-blue-700 text-white">GUARDAR</button>
        <button onClick={openLoadModal} className="py-2 px-4 rounded bg-blue-600 hover:bg-blue-700 text-white">CARGAR</button>
        <button onClick={openExportModal} className="py-2 px-4 rounded bg-blue-600 hover:bg-blue-700 text-white">EXPORTAR</button>
        <button onClick={openImportModal} className="py-2 px-4 rounded bg-blue-600 hover:bg-blue-700 text-white">IMPORTAR</button>
      </div>

      {/* Modales */}
      <SaveModal isVisible={isSaveModalVisible} onClose={closeSaveModal} onSave={saveCharacter} />
      <LoadModal isVisible={isLoadModalVisible} onClose={closeLoadModal} onLoad={handleLoadCharacter} />
      <ExportModal isVisible={isExportModalVisible} onClose={closeExportModal} jsonData={exportedJsonData} />
      <ImportModal isVisible={isImportModalVisible} onClose={closeImportModal} onImport={importCharacter} />
    </div>
  );
  };

 // In the main Home component, just render the provider wrapping the client content
 return (
    <CharacterProvider>
      <CharacterSheetContent />
    </CharacterProvider>
 );
}