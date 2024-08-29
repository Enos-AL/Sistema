import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AlterarUsuarioPage from '../pages/AlterarUsuarioPage';
import LocalizarUsuarioPage from '../pages/LocalizarUsuarioPage';
import ExcluirUsuarioPage from '../pages/ExcluirUsuarioPage';

const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/alterar-usuario/:id" element={<AlterarUsuarioPage />} />
            <Route path="/localizar-usuario" element={<LocalizarUsuarioPage />} />
            <Route path="/excluir-usuario" element={<ExcluirUsuarioPage />} />
        </Routes>
    </Router>
);

export default AppRoutes;
