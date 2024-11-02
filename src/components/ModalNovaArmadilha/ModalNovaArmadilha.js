import { useState } from 'react';
import './ModalNovaArmadilha.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 

function ModalNovaArmadilha({ aberto, fechado }) {
  const [formData, setFormData] = useState({
    nome: '',
    latitude: '',
    longitude: '',
  });
  
  const [showSuccess, setShowSuccess] = useState(false); 
  const [showError, setShowError] = useState(false); 
  const [errorMessage, setErrorMessage] = useState('');

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) { 
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Erro ao cadastrar a armadilha.');
        setShowError(true);
        setTimeout(() => {
          setShowError(false); 
        }, 2000);
        return;
      }

      setFormData({ nome: '', latitude: '', longitude: '' });
      
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

          {showSuccess && (
            <div className="alert alert-success alert-dismissible fade show mt-3" role="alert">
              Armadilha cadastrada com sucesso!
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

export default ModalNovaArmadilha;
