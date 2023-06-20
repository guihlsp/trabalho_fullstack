import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ListarBebidas from './views/Bebidas/Listar';
import AdicionarBebida from './views/Bebidas/Adicionar';
import EditarBebida from './views/Bebidas/Editar';
import VisualizacaoBebida from './components/Bebidas/Visualizacao';

const Router = () => {
  return (
    <Routes>
      <Route path="/bebidas" component={ListarBebidas} />
      <Route path="/bebidas/adicionar" component={AdicionarBebida} />
      <Route path="/bebidas/editar/:id" component={EditarBebida} />
      <Route path="/bebidas/visualizar/:id" component={VisualizacaoBebida} />
    </Routes>
  );
};

export default Router;
