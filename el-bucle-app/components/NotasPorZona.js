import { useCharacter } from '../context/CharacterContext';

export default function NotasPorZona() {
  const { characterData, updateCharacter } = useCharacter();

  const handleNoteChange = (fieldName, value) => {
    updateCharacter({ [fieldName]: value });
  };

  return (
    <div id="notasCard" className="card md:col-span-2 lg:col-span-3">
      <h2 className="card-title">Notas por Zona</h2>
      <div className="notes-grid-container">
        <div>
          <label htmlFor="notasTanis">CENTRO DE TANIS:</label>
          <textarea
            id="notasTanis"
            rows="5"
            value={characterData.notasTanis || ''}
            onChange={(e) => handleNoteChange('notasTanis', e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="notasNorte">DISTRITO NORTE:</label>
          <textarea
            id="notasNorte"
            rows="5"
            value={characterData.notasNorte || ''}
            onChange={(e) => handleNoteChange('notasNorte', e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="notasSur">DISTRITO SUR:</label>
          <textarea
            id="notasSur"
            rows="5"
            value={characterData.notasSur || ''}
            onChange={(e) => handleNoteChange('notasSur', e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="notasMalecon">BARRIO DEL MALECÓN:</label>
          <textarea
            id="notasMalecon"
            rows="5"
            value={characterData.notasMalecon || ''}
            onChange={(e) => handleNoteChange('notasMalecon', e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="notasArrabales">ARRABALES OCCIDENTALES:</label>
          <textarea
            id="notasArrabales"
            rows="5"
            value={characterData.notasArrabales || ''}
            onChange={(e) => handleNoteChange('notasArrabales', e.target.value)}
          ></textarea>
        </div>
        <div className="md:col-span-2 lg:col-span-3">
          <label htmlFor="otrasNotas">OTRAS NOTAS GENERALES:</label>
          <textarea
            id="otrasNotas"
            rows="5"
            value={characterData.otrasNotas || ''}
            onChange={(e) => handleNoteChange('otrasNotas', e.target.value)}
          ></textarea>
        </div>
      </div>
    </div>
  );
}