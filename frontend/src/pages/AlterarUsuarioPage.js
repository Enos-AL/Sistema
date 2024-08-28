import React, { useState, useEffect } from 'react';
import { Input, Button, Form, message } from 'antd';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import usuarioService from '../services/usuarioService';

const AlterarUsuario = () => {
    const { id } = useParams(); // Pega o ID da URL
    const navigate = useNavigate();
    const location = useLocation(); // Acessa o estado passado na navegação
    const [usuario, setUsuario] = useState({ nome: '', email: '', senha: '' });

    useEffect(() => {
        if (location.state) {
            setUsuario({
                nome: location.state.Nome,
                email: location.state.Email,
                senha: location.state.Senha,
            });
        } else {
            const fetchUsuario = async () => {
                try {
                    const usuarioLocalizado = await usuarioService.localizarUsuario(id);
                    setUsuario({
                        nome: usuarioLocalizado.Nome,
                        email: usuarioLocalizado.Email,
                        senha: usuarioLocalizado.Senha,
                    });
                } catch (error) {
                    console.error('Erro ao buscar usuário:', error);
                    message.error('Erro ao buscar dados do usuário.');
                }
            };

            fetchUsuario();
        }
    }, [id, location.state]);

    // Esse código está diferente do que a IA me mostrou pro último, verificar a manhã dia 29
    const handleAlterar = async () => {
        try {
            await usuarioService.alterarUsuario(id, usuario);
            message.success('Usuário alterado com sucesso!');
        } catch (error) {
            console.error('Erro ao alterar usuário:', error);
            message.error('Erro ao alterar usuário.');
        }
    };

    const handleExcluir = async () => {
        try {
            await usuarioService.excluirUsuario(id, usuario.nome);
            message.success('Usuário excluído com sucesso!');
            navigate('/buscar-usuarios');
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            message.error('Erro ao excluir usuário.');
        }
    };

    return (
        <div>
            <h2>Alterar Usuário</h2>
            <Form onFinish={handleAlterar}>
                <Form.Item label="Nome">
                    <Input
                        value={usuario.nome}
                        onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })}
                    />
                </Form.Item>
                <Form.Item label="Email">
                    <Input
                        value={usuario.email}
                        onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
                    />
                </Form.Item>
                <Form.Item label="Senha">
                    <Input
                        type="password"
                        value={usuario.senha}
                        onChange={(e) => setUsuario({ ...usuario, senha: e.target.value })}
                    />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Alterar Usuário
                </Button>
                <Button type="danger" onClick={handleExcluir} style={{ marginLeft: '10px' }}>
                    Excluir Usuário
                </Button>
            </Form>
        </div>
    );
};

export default AlterarUsuario;
