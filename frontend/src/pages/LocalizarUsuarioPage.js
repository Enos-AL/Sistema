import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usuarioService from '../services/usuarioService';

const LocalizarUsuarioPage = () => {
    const [usuario, setUsuario] = useState(null);
    const [nome, setNome] = useState('');
    const navigate = useNavigate();

    const handleLocalizar = async () => {
        try {
            const dados = await usuarioService.localizarUsuario(nome);

            if (dados.message) {
                // Quando o backend retorna uma mensagem, exiba-a como um alerta
                alert(dados.message);
                setUsuario(null); // Limpa os dados do usuário caso haja uma mensagem
            } else {
                // Quando o backend retorna os dados do usuário completo
                setUsuario(dados);
            }
        } catch (error) {
            // Suprime o erro no console e exibe apenas mensagens de erro específicas
            if (error.message.includes('Esse usuário não consta no Banco de Dados') ||
                error.message.includes('Usuário encontrado, mas é necessário digitar o nome completo para localizar todos os dados.')) {
                // // console.warn('Erro tratado: ', error.message);
            } else {
                console.error('Erro ao localizar usuário:', error);
            }
            alert('Erro ao localizar usuário. Tente novamente mais tarde.');
        }
    };

    const handleAlterar = () => {
        if (usuario && usuario.id) {
            navigate(`/alterar-usuario/${usuario.id}`, { state: { usuario } });
        } else {
            console.error('Usuário não encontrado ou ID ausente.');
        }
    };

    return (
        <div>
            <h1>Localizar Usuário</h1>
            <input 
                type="text" 
                placeholder="Nome completo" 
                value={nome} 
                onChange={(e) => setNome(e.target.value)} 
            />
            <button onClick={handleLocalizar}>Localizar</button>

            {usuario && (
                <div>
                    {Object.keys(usuario).map((coluna) => (
                        <div key={coluna}>
                            <label>{coluna}:</label>
                            <span>{usuario[coluna]}</span>
                        </div>
                    ))}
                    <button onClick={handleAlterar}>Página do Usuário</button>
                </div>
            )}
        </div>
    );
};

export default LocalizarUsuarioPage;
