import React, { useState } from 'react';
import { Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import usuarioService from '../services/usuarioService';

const LocalizarUsuario = () => {
    const [nome, setNome] = useState('');
    const navigate = useNavigate();

    const handleLocalizar = async () => {
        try {
            const usuarioLocalizado = await usuarioService.localizarUsuario(nome);
            if (usuarioLocalizado) {
                // Redireciona para a página de alteração com o ID do usuário
                navigate(`/alterar-usuario/${usuarioLocalizado.ID}`, { state: usuarioLocalizado });
            } else {
                message.error('Usuário não encontrado.');
            }
        } catch (error) {
            console.error('Erro ao localizar usuário:', error);
            message.error('Erro ao localizar usuário.');
        }
    };

    return (
        <div>
            <h2>Localizar Usuário</h2>
            <Input
                placeholder="Digite o nome do usuário"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />
            <Button type="primary" onClick={handleLocalizar}>
                Localizar Usuário
            </Button>
        </div>
    );
};

export default LocalizarUsuario;
