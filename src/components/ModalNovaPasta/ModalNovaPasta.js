import { useState, useEffect } from 'react';
import './ModalNovaPasta.css';

function ModalNovaPasta({ aberto, fechado }) {
  const [formData, setFormData] = useState({
    id_dispositivo: '',
    nome_pasta: '',
    id_pasta_drive: '',
  });

  const [dispositivos, setDispositivos] = useState([]); 

  const handleFormEdit = (event, campo) => {
    setFormData({
      ...formData,
      [campo]: event.target.value,
    });
  };

  useEffect(() => {
    const fetchDispositivos = async () => {
      try {
        const response = await fetch('http://localhost:3333/armadilhas');
        const data = await response.json();
  
        if (data.armadilhas && Array.isArray(data.armadilhas)) {
          setDispositivos(data.armadilhas); 
        } else {
          console.error('Formato inesperado dos dados:', data);
        }
      } catch (error) {
        console.error('Erro ao buscar dispositivos:', error);
      }
    };
  
    fetchDispositivos();
  }, []);

  const handleForm = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3333/pastas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      setFormData({ id_dispositivo: '', nome_pasta: '', id_pasta_drive: '' });
      fechado();
    } catch (err) {
      console.error('Erro ao enviar os dados:', err);
    }
  };

  if (!aberto) return null;

  return (
    <div className="modalOverlay">
      <div className="conteudoModal">
        <h2>Nova Pasta</h2>
        <form onSubmit={handleForm}>
          <div className="form-group">
            <label>Nome da Pasta</label>
            <input required placeholder="Digite o nome da pasta" value={formData.nome_pasta} onChange={(event) => handleFormEdit(event, 'nome_pasta')}/>
          </div>

          <div className="form-group">
            <label>Dispositivo associado</label>
            <select required onChange={(event) => handleFormEdit(event, 'id_dispositivo')} value={formData.id_dispositivo}>
              <option value="">Selecione um dispositivo</option>
              {dispositivos.map((dispositivo) => (
                <option key={dispositivo.id} value={dispositivo.id}>
                  {dispositivo.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Link da pasta drive</label>
            <input required placeholder="Exemplo: 'https://docs.google.com/presentation/d/149R4wwAGtXucabe8pwSi1gO1cUpJqJAtdUOa8hOLEeE/edit?usp=sharing'" value={formData.id_pasta_drive} onChange={(event) => handleFormEdit(event, 'id_pasta_drive')}/>
          </div>

          <button type="submit" className="adicionar"> Adicionar </button>
          <button onClick={fechado} className="cancelar"> Cancelar </button>
        </form>
      </div>
    </div>
  );
}

export default ModalNovaPasta;
