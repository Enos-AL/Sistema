import React, { useState } from 'react';
import usuarioService from '../../services/usuarioService';

const AlterarUsuarioForm = ({ usuario }) => {
    const [nome, setNome] = useState(usuario.Nome);
    const [email, setEmail] = useState(usuario.Email);
    const [senha, setSenha] = useState(usuario.Senha);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await usuarioService.alterarUsuario(usuario.ID, { nome, email, senha });
        alert('Usuário alterado com sucesso!');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
            <button type="submit">Alterar Usuário</button>
        </form>
    );
};

export default AlterarUsuarioForm;
