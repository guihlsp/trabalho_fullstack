import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from "./Layout/index";

import ListarBebidas from './views/Bebidas/Listar';
import AdicionarBebida from './views/Bebidas/Adicionar';
import EditarBebida from './views/Bebidas/Editar';
import VisualizarBebida from './views/Bebidas/Visualizar';

import ListarCategorias from './views/Categorias/Listar';
import AdicionarCategoria from './views/Categorias/Adicionar';
import EditarCategoria from './views/Categorias/Editar';
import VisualizarCategoria from './views/Categorias/Visualizar';

import ListarFabricantes from './views/Fabricantes/Listar';
import AdicionarFabricante from './views/Fabricantes/Adicionar';
import EditarFabricante from './views/Fabricantes/Editar';
import VisualizarFabricante from './views/Fabricantes/Visualizar';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        {/* Rotas BEBIDAS */}
        <Route index element={<ListarBebidas />} />
        <Route path="/bebidas" element={<ListarBebidas />} />
        <Route path="/bebidas/adicionar" element={<AdicionarBebida />} />
        <Route path="/bebidas/editar/:id" element={<EditarBebida />} />
        <Route path="/bebidas/visualizar/:id" element={<VisualizarBebida />} />
        {/* Rotas CATEGORIAS */}
        <Route path="/categorias" element={<ListarCategorias />} />
        <Route path="/categorias/adicionar" element={<AdicionarCategoria />} />
        <Route path="/categorias/editar/:id" element={<EditarCategoria />} />
        <Route path="/categorias/visualizar/:id" element={<VisualizarCategoria />} />
        {/* Rotas FABRICANTES */}
        <Route path="/fabricantes" element={<ListarFabricantes />} />
        <Route path="/fabricantes/adicionar" element={<AdicionarFabricante />} />
        <Route path="/fabricantes/editar/:id" element={<EditarFabricante />} />
        <Route path="/fabricantes/visualizar/:id" element={<VisualizarFabricante />} />
      </Route>
    </Routes>
  );
};

export default Router;
