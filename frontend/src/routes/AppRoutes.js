import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InserirUsuarioPage from '../pages/InserirUsuarioPage';
import ExcluirUsuarioPage from '../pages/ExcluirUsuarioPage';
import BuscarUsuariosPage from '../pages/BuscarUsuariosPage';
import AlterarUsuarioPage from '../pages/AlterarUsuarioPage';
import LocalizarUsuarioPage from '../pages/LocalizarUsuarioPage';

const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/inserir-usuario" element={<InserirUsuarioPage />} />
            <Route path="/excluir-usuario" element={<ExcluirUsuarioPage />} />
            <Route path="/buscar-usuarios" element={<BuscarUsuariosPage />} />
            <Route path="/alterar-usuario/:id" element={<AlterarUsuarioPage />} />
            <Route path="/localizar-usuario" element={<LocalizarUsuarioPage />} />
            <Route path="/" element={<InserirUsuarioPage />} />
        </Routes>
    </Router>
);

export default AppRoutes;

