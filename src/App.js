import './App.css';
import Mapa from './components/Mapa/Mapa';
import Header from './components/Header/Header';
import Foto from './components/Foto/Foto';

function App() {
  return (
    <div>
      <Header/>
      <div className='conteudo'>
        <div className='mapa'>
          <Mapa/>
        </div>
        <div className='dados'>

        </div>
      </div>
    </div>
  );
}

export default App;