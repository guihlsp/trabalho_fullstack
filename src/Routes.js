import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ListarBebidas from './views/Bebidas/Listar';
import AdicionarBebida from './views/Bebidas/Adicionar';
import EditarBebida from './views/Bebidas/Editar';
import VisualizacaoBebida from './components/Bebidas/Visualizacao';
import Layout from "./Layout/index";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        {/* Rotas BEBIDAS */}
        <Route index element={<ListarBebidas />} />
        <Route path="/bebidas" element={<ListarBebidas />} />
        <Route path="/bebidas/adicionar" element={<AdicionarBebida />} />
        <Route path="/bebidas/editar/:id" element={<EditarBebida />} />
        <Route path="/bebidas/visualizar/:id" element={<VisualizacaoBebida />} />
        {/* Rotas CATEGORIAS */}
        <Route path="/categorias" element={<ListarBebidas />} />
        <Route path="/categorias/adicionar" element={<AdicionarBebida />} />
        <Route path="/categorias/editar/:id" element={<EditarBebida />} />
        <Route path="/categorias/visualizar/:id" element={<VisualizacaoBebida />} />
        {/* Rotas CATEGORIAS */}
        <Route path="/fabricantes" element={<ListarBebidas />} />
        <Route path="/fabricantes/adicionar" element={<AdicionarBebida />} />
        <Route path="/fabricantes/editar/:id" element={<EditarBebida />} />
        <Route path="/fabricantes/visualizar/:id" element={<VisualizacaoBebida />} />
        {/* Rotas CATEGORIAS */}
        <Route path="/drinks" element={<ListarBebidas />} />
        <Route path="/drinks/adicionar" element={<AdicionarBebida />} />
        <Route path="/drinks/editar/:id" element={<EditarBebida />} />
        <Route path="/drinks/visualizar/:id" element={<VisualizacaoBebida />} />
      </Route>
    </Routes>
  );
};

export default Router;
