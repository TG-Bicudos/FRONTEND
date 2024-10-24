import React, { useEffect, useState } from 'react';
import './ListaImagens.css';
import ImagemExpandida from '../ImagemExpandida/ImagemExpandida';

const ListaImagens = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagemAberta, setImagemAberta] = useState(false);
  const [imagemSelecionada, setImagemSelecionada] = useState(null);

  const itemsPerPage = 3;

  const fetchImages = async () => {
    try {
      const response = await fetch('http://localhost:3333/files');
      if (!response.ok) throw new Error('Erro ao buscar as imagens');
      
      const data = await response.json();
      setImages(data);
      setLoading(false);
    } 
    catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const prevImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - itemsPerPage : Math.max(prevIndex - itemsPerPage, 0)
    );
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + itemsPerPage >= images.length ? 0 : prevIndex + itemsPerPage
    );
  };

  const abrirImagem = (image) => {
    setImagemSelecionada(image);
    setImagemAberta(true);
  };

  const fecharImagem = () => setImagemAberta(false);

  if (loading) return <p>Carregando imagens...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      <div className="carrossel-container">
        <button className="prev" onClick={prevImage}>&lt;</button>
        <div className="carrossel">
          {images.length > 0 ? (
            images.slice(currentIndex, currentIndex + itemsPerPage).map((image) => (
              <div key={image.id} className="carrossel-item">
                <div className='foto'>
                  {/* Use uma função anônima para passar a imagem correta */}
                  <img 
                    className='imagemFoto' 
                    src={`http://localhost:3333/file/${image.id}`} 
                    alt={image.name} 
                    onClick={() => abrirImagem(image)} 
                  />
                  <p className="dataFoto">{new Date(image.createdTime).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Nenhuma imagem encontrada.</p>
          )}
        </div>
        <button className="next" onClick={nextImage}>&gt;</button>
        <ImagemExpandida 
          aberto={imagemAberta}
          fechado={fecharImagem}
          image={imagemSelecionada} 
        />
      </div>
    </div>
  );
};

export default ListaImagens;
