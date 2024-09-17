import { useState } from 'react';
import './ModalNovaArmadilha.css';

function ModalNovaArmadilha({ aberto, fechado }) {
  const [formData, setFormData] = useState({
    nome: '',
    latitude: '',
    longitude: '',
  });

  if (!aberto) return null;

  const handleFormEdit = (event, nome) => {
    setFormData({
      ...formData,
      [nome]: event.target.value,
    });
  };

  const handleForm = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3333/armadilhas`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),  
      });

      setFormData({ nome: '', latitude: '', longitude: '' });
      fechado();
      
    } catch (err) {
      console.error("Erro ao enviar os dados:", err);
    }
  };

  return (
    <div className="modalOverlay">
      <div className="conteudoModal">
        <h2>Nova Armadilha</h2>
        <form onSubmit={handleForm}>

          <div className="form-group">
            <label>Nome da Armadilha:</label>
            <input required placeholder="Digite o nome da armadilha" value={formData.nome} onChange={(event) => handleFormEdit(event, 'nome')}/>
          </div>

          <div className="form-group">
            <label>Latitude:</label>
            <input required placeholder="Digite a latitude do dispositivo" value={formData.latitude} onChange={(event) => handleFormEdit(event, 'latitude')}/>
          </div>

          <div className="form-group">
            <label>Longitude:</label>
            <input required placeholder="Digite a longitude do dispositivo" value={formData.longitude} onChange={(event) => handleFormEdit(event, 'longitude')}/>
          </div>

          <button type="submit" className="adicionar">Adicionar</button>
          <button type="button" onClick={fechado} className="cancelar">Cancelar</button>
        </form>
      </div>
    </div>
  );
}

export default ModalNovaArmadilha;