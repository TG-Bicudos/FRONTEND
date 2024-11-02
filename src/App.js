import './App.css';
import Mapa from './components/Mapa/Mapa';
import Header from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

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