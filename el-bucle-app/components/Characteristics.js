import React, { useState } from 'react';
import { useCharacter } from '../context/CharacterContext';

const MAX_TOTAL_POINTS = 7;
const MAX_STAT_POINTS = 5;

export default function Characteristics() {
  const { characterData, updateCharacter } = useCharacter();
  const [diceResult, setDiceResult] = useState(null);
  const [showDiceResult, setShowDiceResult] = useState(false);
  const [pointsError, setPointsError] = useState('');

  const totalPoints = characterData.mente + characterData.cuerpo;
  const remainingPoints = MAX_TOTAL_POINTS - totalPoints;

  const adjustCharacteristics = (stat, amount) => {
    let newMente = characterData.mente;
    let newCuerpo = characterData.cuerpo;

    if (stat === 'mente') {
      newMente = characterData.mente + amount;
    } else if (stat === 'cuerpo') {
      newCuerpo = characterData.cuerpo + amount;
    }

    const newTotalPoints = newMente + newCuerpo;

    if (newMente < 0 || newCuerpo < 0) {
        return;
    }

    if (newMente > MAX_STAT_POINTS) {
        setPointsError('Máximo 5 puntos en MENTE.');
        return;
    }

    if (newCuerpo > MAX_STAT_POINTS) {
        setPointsError('Máximo 5 puntos en CUERPO.');
        return;
    }

    if (newTotalPoints > MAX_TOTAL_POINTS) {
        setPointsError(`Has usado ${newTotalPoints} puntos. Máximo ${MAX_TOTAL_POINTS}.`);
        return;
    }

    updateCharacter({ mente: newMente, cuerpo: newCuerpo });
    setPointsError('');
  };

  const rollDice = () => {
    const result = Math.floor(Math.random() * 6) + 1;
    setDiceResult(result);
    setShowDiceResult(true);
  };


  return (
    <div className="card lg:col-span-1">
      <h2 className="card-title">Características</h2>
      <p className="text-sm text-gray-400 mb-4 text-xs-custom">A repartir <span id="totalPoints" className="font-bold text-white">{remainingPoints}</span> puntos (máx 5 en cada una).</p>
      <div className="mb-4 control">
        <label>MENTE:</label>
        <div className="flex items-center justify-center gap-4 stat-control">
          <button onClick={() => adjustCharacteristics('mente', -1)} disabled={characterData.mente <= 0} aria-label="Restar Mente">-</button>
          <span id="menteValue" className="stat-value">{characterData.mente}</span>
          <button onClick={() => adjustCharacteristics('mente', 1)} disabled={characterData.mente >= MAX_STAT_POINTS || totalPoints >= MAX_TOTAL_POINTS} aria-label="Sumar Mente">+</button>
        </div>
      </div>
      <div className="mb-6 control">
        <label>CUERPO:</label>
        <div className="flex items-center justify-center gap-4 stat-control">
          <button onClick={() => adjustCharacteristics('cuerpo', -1)} disabled={characterData.cuerpo <= 0} aria-label="Restar Cuerpo">-</button>
          <span id="cuerpoValue" className="stat-value">{characterData.cuerpo}</span>
          <button onClick={() => adjustCharacteristics('cuerpo', 1)} disabled={characterData.cuerpo >= MAX_STAT_POINTS || totalPoints >= MAX_TOTAL_POINTS} aria-label="Sumar Cuerpo">+</button>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-gray-700">
        <div className="flex flex-col items-center gap-3">
          <button id="diceButton" onClick={rollDice}>LANZAR DADO</button>
          {showDiceResult && <div id="diceResult" className="dice-result" style={{ display: 'flex' }}>{diceResult}</div>}
        </div>
      </div>
      {pointsError && <p id="pointsError" className="text-red-500 text-sm mt-4 text-center font-semibold">{pointsError}</p>}
    </div>
  );
}