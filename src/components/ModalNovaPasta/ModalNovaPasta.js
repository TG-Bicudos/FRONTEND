import { useState, useEffect } from 'react';
import './ModalNovaPasta.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 

function ModalNovaPasta({ aberto, fechado }) {
  const [formData, setFormData] = useState({
    id_dispositivo: '',
    nome_pasta: '',
    id_pasta_drive: '',
  });

  const [showSuccess, setShowSuccess] = useState(false); 
  const [showError, setShowError] = useState(false); 
  const [errorMessage, setErrorMessage] = useState('');
  const [dispositivos, setDispositivos] = useState([]);

  useEffect(() => {
    const fetchDispositivos = async () => {
      if (aberto) {
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
      }
    };

    fetchDispositivos();
  }, [aberto]);

  const handleFormEdit = (event, campo) => {
    setFormData({
      ...formData,
      [campo]: event.target.value,
    });
  };

  const handleForm = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3333/pastas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) { 
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Erro ao cadastrar a pasta.'); 
        setShowError(true); 
        setTimeout(() => {
          setShowError(false);
        }, 2000);
        return;
      }

      setFormData({ id_dispositivo: '', nome_pasta: '', id_pasta_drive: '' });
      setShowSuccess(true); 
      setTimeout(() => {
        setShowSuccess(false);
        fechado();
      }, 2000); 

    } catch (err) {
      console.error('Erro ao enviar os dados:', err);
      setErrorMessage('Erro de conexão com o servidor.'); 
      setShowError(true); 
      setTimeout(() => {
        setShowError(false); 
      }, 2000);
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
            <input
              required
              placeholder="Digite o nome da pasta"
              value={formData.nome_pasta}
              onChange={(event) => handleFormEdit(event, 'nome_pasta')}
            />
          </div>

          <div className="form-group">
            <label>Dispositivo associado</label>
            <select
              required
              className="selecao"
              onChange={(event) => handleFormEdit(event, 'id_dispositivo')}
              value={formData.id_dispositivo}
            >
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
            <input
              required
              placeholder="Exemplo: 'https://docs.google.com/presentation/d/149R4wwAGtXucabe8pwSi1gO1cUpJqJAtdUOa8hOLEeE/edit?usp=sharing'"
              value={formData.id_pasta_drive}
              onChange={(event) => handleFormEdit(event, 'id_pasta_drive')}
            />
          </div>

          <button type="submit" className="adicionar"> Adicionar </button>
          <button type="button" onClick={fechado} className="cancelar"> Cancelar </button>

          {showSuccess && (
            <div className="alert alert-success alert-dismissible fade show mt-3" role="alert">
              Pasta cadastrada com sucesso!
              <button type="button" className="btn-close" onClick={() => setShowSuccess(false)} aria-label="Close"></button>
            </div>
          )}

          {showError && (
            <div className="alert alert-danger alert-dismissible fade show mt-3" role="alert">
              {errorMessage}
              <button type="button" className="btn-close" onClick={() => setShowError(false)} aria-label="Close"></button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalNovaPasta;
