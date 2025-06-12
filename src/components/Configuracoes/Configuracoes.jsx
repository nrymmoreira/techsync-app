import React from "react";
import Navbar from "../Navbar/Navbar";

const Configuracoes = () => {
  return (
    <div>
      <Navbar />
      {/* aqui você adiciona o conteúdo da página de configurações */}
      <div style={{ padding: '20px' }}>
        <h1>Configurações</h1>
        <p>Conteúdo das configurações aqui...</p>
      </div>
    </div>
  );
};

export default Configuracoes;