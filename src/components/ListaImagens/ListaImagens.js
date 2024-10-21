import React, { useEffect, useState } from 'react';
import './ListaImagens.css';

const ListaImagens = () => {
  const [images, setImages] = useState([]); // Estado para armazenar as imagens do drive
  const [loading, setLoading] = useState(true); // Estado para mostrar se está carregando
  const [error, setError] = useState(null); // Estado para tratar erros
  const [currentIndex, setCurrentIndex] = useState(0); // Estado para controlar a posição do carrossel

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
                    <img className='imagemFoto' src={`http://localhost:3333/file/${image.id}`} alt={image.name}/>

                    <p className="dataFoto">{new Date(image.createdTime).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
              ))
          ) : (
            <p>Nenhuma imagem encontrada.</p>
          )}
        </div>
        <button className="next" onClick={nextImage}>&gt;</button>
      </div>
    </div>
  );
};

export default ListaImagens;