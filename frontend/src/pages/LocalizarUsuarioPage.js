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
            console.log('Dados recebidos:', dados);

            // Se os dados foram encontrados, definimos o usuário
            setUsuario(dados);
        } catch (error) {
            if (error.message.includes('Por favor, digite o nome completo') || 
                error.message.includes('Esse usuário não consta no Banco de Dados')) {
                console.warn('Erro tratado: ', error.message);
                alert(error.message);
            } else {
                console.error('Erro ao localizar usuário:', error);
                alert('Esse erro pode ocorrer devido à comunicação com o BD.');
            }
        }
    };

    const handleAlterar = () => {
        if (usuario && usuario.id) {
            console.log('Redirecionando para a página de alteração:', usuario.id);
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
