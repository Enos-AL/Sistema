import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import usuarioService from '../services/usuarioService';

const ExcluirUsuarioPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { usuario } = location.state;

    const handleExcluir = async () => {
        await usuarioService.excluirUsuario(usuario.id, usuario.nome);
        alert('Usuário excluído com sucesso!');
        navigate('/localizar-usuario');
    };

    const handleCancelar = () => {
        navigate('/localizar-usuario');
    };

    return (
        <div>
            <h1>Excluir Usuário</h1>
            <p>Tem certeza que deseja excluir o usuário {usuario.nome}? Esta ação não pode ser desfeita.</p>
            <button onClick={handleExcluir}>Sim, excluir</button>
            <button onClick={handleCancelar}>Não, cancelar</button>
        </div>
    );
};

export default ExcluirUsuarioPage;
