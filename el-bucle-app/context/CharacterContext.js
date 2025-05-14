import React, { createContext, useState, useContext, useEffect } from 'react';

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
    setCharacterData(prevData => ({
      ...prevData,
      ...newData,
      gesta: (() => {
        if (newData.diasBucle === undefined) {
          return newData.gesta !== undefined ? newData.gesta : prevData.gesta;
        }

        const prevDias = prevData.diasBucle;
        const newDias = newData.diasBucle;

        if (prevDias % 7 === 0 && newDias > 7 && newDias > prevDias) {
          return prevData.gesta + 1;
        }

        return newData.gesta !== undefined ? newData.gesta : prevData.gesta;
      })()
    }));
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
      // Ensure money is treated as a number
      if (parsedData.money !== undefined && typeof parsedData.money !== 'number') {
          const numMoney = Number(parsedData.money);
          parsedData.money = !isNaN(numMoney) ? numMoney : 0;
      } else if (parsedData.money === undefined) { parsedData.money = 0; }
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
         // Ensure money is treated as a number
         if (importedData.money !== undefined && typeof importedData.money !== 'number') {
             const numMoney = Number(importedData.money);
             importedData.money = !isNaN(numMoney) ? numMoney : 0;
         } else if (importedData.money === undefined) { importedData.money = 0; }

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

  // Effect to load autosave on mount
  useEffect(() => {
    console.log('Attempting to load autosave...');
    const savedData = localStorage.getItem('autosave_character');
    if (savedData) {
      try {
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
        if (parsedData.money !== undefined && typeof parsedData.money !== 'number') {
            const numMoney = Number(parsedData.money);
            parsedData.money = !isNaN(numMoney) ? numMoney : 0;
        } else if (parsedData.money === undefined) { parsedData.money = 0; }

        setCharacterData(parsedData);
        console.log('Autosave loaded successfully.');
      } catch (error) {
        console.error('Error loading autosave:', error);
      }
    } else {
      console.log('No autosave found.');
    }
  }, []); // Empty dependency array: runs once on mount

  // Effect to save to autosave whenever characterData changes
  useEffect(() => {
    // This effect will run after the initial load effect.
    // Subsequent updates to characterData will trigger this save.
    try {
      // Optionally exclude fields like lastModified if not needed in autosave
      const { lastModified, ...dataToAutosave } = characterData;
      localStorage.setItem('autosave_character', JSON.stringify(dataToAutosave));
    } catch (error) {
      console.error('Error saving autosave:', error);
    }
  }, [characterData]); // Depends on characterData: runs on changes

  return (
    <CharacterContext.Provider value={{ characterData, updateCharacter, saveCharacter, loadCharacter, getSavedCharacters, exportCharacter, importCharacter, deleteCharacter }}>
      {children}
    </CharacterContext.Provider>
  );
};