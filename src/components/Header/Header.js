// Header.js
import React, { useState } from 'react';
import ModalNovaArmadilha from '../ModalNovaArmadilha/ModalNovaArmadilha';
import ModalNovaPasta from '../ModalNovaPasta/ModalNovaPasta';
import './Header.css';

function Header() {
  const [isModalArmadilhaOpen, setIsModalArmadilhaOpen] = useState(false);
  const [isModalPastaOpen, setIsModalPastaOpen] = useState(false);

  const openModalArmadilha = () => setIsModalArmadilhaOpen(true);
  const closeModalArmadilha = () => setIsModalArmadilhaOpen(false);

  const openModalPasta = () => setIsModalPastaOpen(true);
  const closeModalPasta = () => setIsModalPastaOpen(false);

  return (
    <>
      <div className="header">
        <div className='botoes'>
          <button className='botao' onClick={openModalArmadilha}>+ Nova Armadilha</button>
          <button className='botao' onClick={openModalPasta}>+ Nova Pasta</button>
        </div>
      </div>

      <ModalNovaArmadilha 
        isOpen={isModalArmadilhaOpen} 
        onClose={closeModalArmadilha} 
      />
      <ModalNovaPasta 
        isOpen={isModalPastaOpen} 
        onClose={closeModalPasta} 
      />
    </>
  );
}

export default Header;
