import React, { createContext, useState, useContext } from 'react';

const CharacterContext = createContext();

export const useCharacter = () => useContext(CharacterContext);

export const CharacterProvider = ({ children }) => {
  const [characterData, setCharacterData] = useState({
    name: '',
    mente: 0,
    cuerpo: 0,
    life: 'Sano',
    gesta: 0, // Changed to number, initialized to 0
    diasBucle: 0, // Added new field
    tiempoHora: 8, // Initialize tiempoHora to 8
    inventory: '',
    money: '',
    pistas: '',
    notes: '',
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
    localStorage.setItem(key, JSON.stringify(characterData));
    console.log(`Character ${characterName} saved successfully.`);
  };

  const loadCharacter = (characterName) => {
    if (characterName === null) { // Handle loading a new character
      setCharacterData({
        name: '',
        mente: 0,
        cuerpo: 0,
        life: 'Sano', // Reset life to 'Sano' for new character
        gesta: 0, // Initialize gesta to 0 for new character
        diasBucle: 0, // Initialize diasBucle to 0 for new character
        tiempoHora: 8, // Initialize tiempoHora to 8 for new character
        inventory: '',
        money: '',
        pistas: '',
        weapons: []
      });
       console.log('Loading new character.');
      console.error('Character name is required to load.');
      return;
    }
    const key = `character_${characterName}`;
    const savedData = localStorage.getItem(key);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      // Ensure life is a string and numerical fields are numbers when loading old data
      if (typeof parsedData.life === 'number') {
          parsedData.life = 'Sano'; // Default to Sano if old data had a number
      } else if (typeof parsedData.life !== 'string') {
           parsedData.life = 'Sano'; // Default to Sano if data is not a string either
      }
      // Ensure numerical fields are numbers, default to 0 if undefined or not a number
      parsedData.gesta = typeof parsedData.gesta === 'number' ? parsedData.gesta : 0;
      parsedData.diasBucle = typeof parsedData.diasBucle === 'number' ? parsedData.diasBucle : 0;
      parsedData.tiempoHora = typeof parsedData.tiempoHora === 'number' ? parsedData.tiempoHora : 0;
      setCharacterData(parsedData);
      console.log(`Character ${characterName} loaded successfully.`);
    } else { // Handle case where saved data is not found
      // Optionally reset to default or show an error to the user, or simply log
      // If you want to load a new character when not found, uncomment the lines below
      // loadCharacter(null);
      console.error(`Character ${characterName} not found.`);
      // Optionally reset to default or show an error to the user
    }
  };

  const getSavedCharacters = () => {
    const characterKeys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('character_')) {
        characterKeys.push(key.replace('character_', ''));
      }
    }
    return characterKeys;
  };

  const exportCharacter = () => {
    return JSON.stringify(characterData, null, 2); // null, 2 for pretty printing
  };

  const importCharacter = (jsonString) => {
    try {
      const importedData = JSON.parse(jsonString);
      // Basic validation (check for required fields)
       if (importedData && typeof importedData === 'object' && importedData.name !== undefined) { // Ensure imported data is an object and has a name
         // Ensure life is a string after import
         if (typeof importedData.life === 'number') {
             importedData.life = 'Sano'; // Default to Sano if imported data had a number
         } else if (typeof importedData.life !== 'string') {
             importedData.life = 'Sano'; // Default to Sano if data is not a string either
         }
         // Ensure numerical fields are numbers after import, default to 0 if undefined or not a number
         importedData.gesta = typeof importedData.gesta === 'number' ? importedData.gesta : 0;
         importedData.diasBucle = typeof importedData.diasBucle === 'number' ? importedData.diasBucle : 0;
         importedData.tiempoHora = typeof importedData.tiempoHora === 'number' ? importedData.tiempoHora : 0;
        setCharacterData(importedData);
        console.log('Character imported successfully.');
       } else {
        console.error('Invalid character data format.');
        // Optionally show an error to the user
      }
    } catch (error) {
      console.error('Failed to parse JSON string:', error);
      // Optionally show an error to the user
    }
  };

  return (
    <CharacterContext.Provider value={{ characterData, updateCharacter, saveCharacter, loadCharacter, getSavedCharacters, exportCharacter, importCharacter }}>
      {children}
    </CharacterContext.Provider>
  );
};