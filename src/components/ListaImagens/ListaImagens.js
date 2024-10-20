import React, { useEffect, useState } from 'react';

const ListaImagens = () => {
  const [images, setImages] = useState([]); // Estado para armazenar a lista de imagens
  const [loading, setLoading] = useState(true); // Estado para mostrar se está carregando
  const [error, setError] = useState(null); // Estado para tratar erros

  // Função para buscar as imagens da API
  const fetchImages = async () => {
    try {
      const response = await fetch('http://localhost:3333/files'); // Rota que lista as imagens
      if (!response.ok) throw new Error('Erro ao buscar as imagens');
      
      const data = await response.json(); // Converter a resposta para JSON
      setImages(data); // Atualizar o estado com as imagens
      setLoading(false); // Parar o loading
    } catch (err) {
      setError(err.message); // Guardar o erro no estado
      setLoading(false); // Parar o loading em caso de erro
    }
  };

  // useEffect para buscar as imagens quando o componente montar
  useEffect(() => {
    fetchImages();
  }, []);

  if (loading) return <p>Carregando imagens...</p>; 
  if (error) return <p>Erro: {error}</p>; 

  return (
    <div>
      <h2>Lista de Imagens</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images.length > 0 ? (
          images.map((image) => (
            <div key={image.id} style={{ margin: '10px' }}>
              <img
                src={`http://localhost:3333/file/${image.id}`} // URL da imagem
                alt={image.name}
                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
              />
              <p>{image.name}</p>
              <p>{new Date(image.uploadedAt).toLocaleDateString()}</p> 

            </div>
          ))
        ) : (
          <p>Nenhuma imagem encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default ListaImagens;
