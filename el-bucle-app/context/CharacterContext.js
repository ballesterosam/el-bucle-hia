import React, { createContext, useState, useContext } from 'react';

const CharacterContext = createContext();

export const useCharacter = () => useContext(CharacterContext);

export const CharacterProvider = ({ children }) => {
  const [characterData, setCharacterData] = useState({
    name: '',
    mente: 0,
    cuerpo: 0,
    life: 'Sano',
    gesta: 0,
    diasBucle: 0, 
    tiempoHora: 8, 
    inventory: '',
    money: 0,
    pistasNormales: '', 
    pistasConfidenciales: '',
    pistasTemporales: '', 
    notes: '',
    notasTanis: '',
    otrasNotas: '',
    notasNorte: '',
    notasSur: '',
    notasMalecon: '',
    notasArrabales: '',
    weapons: []
  });

  const updateCharacter = (newData) => {
    setCharacterData(prevData => ({ ...prevData, ...newData }));
  };

  const saveCharacter = (characterName) => {
    if (!characterName) {
      console.error('Character name is required to save.');
      return;
    }
    const key = `character_${characterName}`;
    const dataToSave = {
 ...characterData,
 lastModified: new Date().toISOString(), 
    };
 localStorage.setItem(key, JSON.stringify(dataToSave));
    console.log(`Character ${characterName} saved successfully.`);
  };

  const loadCharacter = (characterName) => {
    if (characterName === null) { 
      console.log('Resetting character state to default values.');
      setCharacterData({
        name: '',
        mente: 0,
        cuerpo: 0,
        life: 'Sano', 
        gesta: 0, 
        diasBucle: 0, 
        tiempoHora: 8,
        inventory: '',
        money: 0,
        pistasNormales: '', 
        pistasConfidenciales: '', 
        pistasTemporales: '', 
        notasTanis: '', 
        notasNorte: '', 
        notasSur: '', 
        notasMalecon: '', 
        notasArrabales: '', 
        weapons: []
      });
      return;
    }
    const key = `character_${characterName}`;
    const savedData = localStorage.getItem(key);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (typeof parsedData.life === 'number') {
          parsedData.life = 'Sano'; 
      } else if (typeof parsedData.life !== 'string') {
           parsedData.life = 'Sano'; 
      }

      parsedData.gesta = typeof parsedData.gesta === 'number' ? parsedData.gesta : 0;
      parsedData.diasBucle = typeof parsedData.diasBucle === 'number' ? parsedData.diasBucle : 0;
      parsedData.tiempoHora = typeof parsedData.tiempoHora === 'number' ? parsedData.tiempoHora : 0;
      parsedData.pistasNormales = parsedData.pistasNormales || '';
      parsedData.pistasConfidenciales = parsedData.pistasConfidenciales || '';
      parsedData.pistasTemporales = parsedData.pistasTemporales || '';
      parsedData.notasTanis = parsedData.notasTanis || '';
      parsedData.notasNorte = parsedData.notasNorte || '';
      parsedData.notasSur = parsedData.notasSur || '';
      parsedData.notasMalecon = parsedData.notasMalecon || '';
      parsedData.money = typeof parsedData.money === 'number' ? parsedData.money : 0;
      setCharacterData(parsedData);
      console.log(`Character ${characterName} loaded successfully.`);
    } else { 
      console.error(`Character ${characterName} not found.`);
    }
  };

  const getSavedCharacters = () => {
    const savedCharactersList = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('character_')) {
        const savedData = localStorage.getItem(key);
        if (savedData) {
          try {
            const parsedData = JSON.parse(savedData);
            const characterName = key.replace('character_', '');
            savedCharactersList.push({ name: characterName, lastModified: parsedData.lastModified || new Date().toISOString() });
          } catch (error) {
            console.error(`Error parsing character data for key ${key}:`, error);
          }
        }
      }
    }
 return savedCharactersList;
  };

  const exportCharacter = () => {
    return JSON.stringify(characterData, null, 2);
  };

  const importCharacter = (jsonString) => {
    try {
      const importedData = JSON.parse(jsonString);  
       if (importedData && typeof importedData === 'object' && importedData.name !== undefined) {
         if (typeof importedData.life === 'number') {
             importedData.life = 'Sano'; 
         } else if (typeof importedData.life !== 'string') {
             importedData.life = 'Sano'; 
         }
         
         importedData.gesta = typeof importedData.gesta === 'number' ? importedData.gesta : 0;
         importedData.diasBucle = typeof importedData.diasBucle === 'number' ? importedData.diasBucle : 0;
         importedData.tiempoHora = typeof importedData.tiempoHora === 'number' ? importedData.tiempoHora : 0;
         importedData.pistasNormales = importedData.pistasNormales || '';
         importedData.pistasConfidenciales = importedData.pistasConfidenciales || '';
         importedData.pistasTemporales = importedData.pistasTemporales || '';
         importedData.notasTanis = importedData.notasTanis || '';
         importedData.notasNorte = importedData.notasNorte || '';
         importedData.notasSur = importedData.notasSur || '';
         importedData.notasMalecon = importedData.notasMalecon || '';
         importedData.money = typeof importedData.money === 'number' ? importedData.money : 0;

        setCharacterData(importedData);
        console.log('Character imported successfully.');
       } else {
        console.error('Invalid character data format.');
      }
    } catch (error) {
      console.error('Failed to parse JSON string:', error);
    }
  };

  const deleteCharacter = (characterName) => {
    if (!characterName) {
      console.error('Character name is required to delete.');
 return;
    }
    const key = `character_${characterName}`;
    localStorage.removeItem(key);
    console.log(`Character ${characterName} deleted successfully.`);
  };

  return (
    <CharacterContext.Provider value={{ characterData, updateCharacter, saveCharacter, loadCharacter, getSavedCharacters, exportCharacter, importCharacter, deleteCharacter }}>
      {children}
    </CharacterContext.Provider>
  );
};