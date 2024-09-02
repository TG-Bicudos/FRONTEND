import React, { useState } from 'react';
import ModalNovaArmadilha from '../ModalNovaArmadilha/ModalNovaArmadilha';
import ModalNovaPasta from '../ModalNovaPasta/ModalNovaPasta';
import './Header.css';

function Header() {
  const [verModalArmadilhaAberto, setModalArmadilhaAberto] = useState(false);
  const [verModalPastaAberto, setModalPastaAberto] = useState(false);

  const abrirModalArmadilha = () => setModalArmadilhaAberto(true);
  const fecharModalArmadilha = () => setModalArmadilhaAberto(false);

  const abrirModalPasta = () => setModalPastaAberto(true);
  const fecharModalPasta = () => setModalPastaAberto(false);

  return (
    <>
      <div className="header">
        <div className='botoes'>
          <button className='botao' onClick={abrirModalArmadilha}>+ Nova Armadilha</button>
          <button className='botao' onClick={abrirModalPasta}>+ Nova Pasta</button>
        </div>
      </div>

      <ModalNovaArmadilha 
        aberto={verModalArmadilhaAberto} 
        fechado={fecharModalArmadilha} 
      />
      <ModalNovaPasta 
        aberto={verModalPastaAberto} 
        fechado={fecharModalPasta} 
      />
    </>
  );
}

export default Header;
