import React from 'react';
import './ModalNovaPasta.css'; 

function ModalNovaPasta({ aberto, fechado }) {
  if (!aberto) return null;

  return (
    <div className="modalOverlay">
      <div className="conteudoModal">
        <h2>Nova Pasta</h2>
        <form>   
          <div className="form-group">
            <label>Nome da Pasta</label>
            <input required placeholder="Digite o nome da pasta"/>
          </div>

          <div className="form-group">
            <label>Dispositivo associado</label>
            <select required>
              <option value="Dispositivo1">Dispositivo 1</option>
              <option value="Dispositivo2">Dispositivo 2</option>
              <option value="Dispositivo3">Dispositivo 3</option>
            </select>
          </div>

          <div className="form-group">
            <label>Link da pasta drive</label>
            <input required placeholder="Exemplo: 'https://docs.google.com/presentation/d/149R4wwAGtXucabe8pwSi1gO1cUpJqJAtdUOa8hOLEeE/edit?usp=sharing'"/>
          </div>

          <button type="submit" className='adicionar'>Adicionar</button>
          <button onClick={fechado} className='cancelar'>Cancelar</button>
        </form>
      </div>
    </div>
  );
}

export default ModalNovaPasta;
