import './ImagemExpandida.css';

function ImagemExpandida({ aberto, fechado, image }) {
  if (!aberto || !image) return null;

  return (
    <div className="modalOverlay">
      <div className="conteudoModal">
        <button onClick={fechado} className='botaoFecharImagem'>X</button>
        <h2 className="dataFoto">{new Date(image.createdTime).toLocaleDateString('pt-BR')}</h2>
        <img className='imagemFotoExpandida' src={`http://localhost:3333/file/${image.id}`} alt={image.name}/>
      </div>
    </div>
  );
};

export default ImagemExpandida;