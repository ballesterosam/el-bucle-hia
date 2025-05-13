import React, { useState } from 'react';
import { useCharacter } from '../context/CharacterContext';

export default function NotasPorZona() {
  const { characterData, updateCharacter } = useCharacter();
  const handleNotesChange = (event) => {
    updateCharacter({ notes: event.target.value });
  };
}