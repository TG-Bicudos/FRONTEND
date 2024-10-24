import './DadosArmadilha.css'
import ListaImagens from '../ListaImagens/ListaImagens';
import axios from 'axios';
import { useState, useEffect } from 'react';


function DadosArmadilha({ ocultarDados }) {

    const [file, setFile] = useState(null);
    const [fileId, setFileId] = useState('');

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('http://localhost:3333/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setFileId(response.data.fileId); // Guardar o ID do arquivo no estado
      } catch (error) {
        console.error('Erro ao fazer upload:', error);
      }
    };

    const ImageViewer = ({ fileId }) => {
      const [imageUrl, setImageUrl] = useState('');

      useEffect(() => {
        const fetchImage = async () => {
          try {
            const response = await axios.get(`http://localhost:3333/file/${fileId}`, { responseType: 'blob' });
            const url = URL.createObjectURL(response.data);
            setImageUrl(url);
          } catch (error) {
            console.error('Erro ao carregar imagem:', error);
          }
        };

        if (fileId) fetchImage();
      }, [fileId]);

      return imageUrl ? <img src={imageUrl} alt="Imagem carregada" /> : null;
    };

    return( 
       <div className='dadosArmadilha'>
        <div className='dados'>
            <p className='dadosTitulo'>Dados da Armadilha </p>
            <button onClick={ocultarDados} className='botaoFechar'>X</button>
            <p className='dadosTexto'>Armadilha 1</p>
            <p className='dadosTexto'>Latitude: -21.931</p>
            <p className='dadosTexto'>Longitude: -50.521</p>

            <div className='dadosFotos'>
                <ListaImagens/>
            </div>
        </div>
       </div> 
    );
}

export default DadosArmadilha;
