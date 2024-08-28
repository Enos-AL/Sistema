import React, { useState } from 'react';
import usuarioService from '../../services/usuarioService';

const InserirUsuarioForm = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await usuarioService.inserirUsuario({ nome, email, senha });
        alert('Usuário inserido com sucesso!');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" required />
            <button type="submit">Inserir Usuário</button>
        </form>
    );
};

export default InserirUsuarioForm;
