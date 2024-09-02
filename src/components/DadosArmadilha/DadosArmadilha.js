import Foto from '../Foto/Foto';
import './DadosArmadilha.css'

function DadosArmadilha({ ocultarDados }) {
    return( 
       <div className='dadosArmadilha'>
        <div className='dados'>
            <p className='dadosTitulo'> Dados da Armadilha </p>
            <p className='dadosTexto'>Nome da armadilha: </p>
            <p className='dadosTexto'>Latitude: </p>
            <p className='dadosTexto'>Longitude: </p>

            <div className='dadosFotos'>
                <Foto/>
                <Foto/>
                <Foto/>
                <Foto/>
            </div>

            <button onClick={ocultarDados} className='botaoFechar'>Fechar</button>
        </div>
       </div> 
    );
}

export default DadosArmadilha;