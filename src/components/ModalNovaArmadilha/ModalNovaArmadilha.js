import React from 'react';
import './ModalNovaArmadilha.css';

function ModalNovaArmadilha({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="conteudoModal">
        <h2>Nova Armadilha</h2>
        <form>
          <div className="form-group">
            <label htmlFor="nome">Nome da Armadilha:</label>
            <input required placeholder="Digite o nome da armadilha"/>
          </div>

          <div className="form-group">
            <label htmlFor="latitude">Latitude:</label>
            <input type="text" id="latitude" name="latitude" required placeholder="Digite a latitude do dispositivo"/>
          </div>

          <div className="form-group">
            <label htmlFor="longitude">Longitude:</label>
            <input required placeholder="Digite a longitude do dispositivo"/>
          </div>

          <button type="submit" className='adicionar'>Adicionar</button>
          <button onClick={onClose} className='cancelar'>Cancelar</button>
        </form>
      </div>
    </div>
  );
}

export default ModalNovaArmadilha;