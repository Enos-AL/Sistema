import React from 'react';
import usuarioService from '../../services/usuarioService';

const ExcluirUsuarioButton = ({ id, nome }) => {
    const handleDelete = async () => {
        if (window.confirm(`Deseja excluir o usuário ${nome}?`)) {
            await usuarioService.excluirUsuario(id, nome);
            alert('Usuário excluído com sucesso!');
        }
    };

    return <button onClick={handleDelete}>Excluir Usuário</button>;
};

export default ExcluirUsuarioButton;
