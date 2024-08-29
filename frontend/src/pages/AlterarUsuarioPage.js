import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import usuarioService from '../services/usuarioService';

const AlterarUsuarioPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(location.state?.usuario || {});

    useEffect(() => {
        // Verifica se os dados do usuário foram passados corretamente
        if (!usuario.id) {
            navigate('/localizar-usuario');
        }
    }, [usuario.id, navigate]);

    const handleAlterar = async () => {
        try {
            await usuarioService.alterarUsuario(usuario.id, usuario);
            alert('Usuário alterado com sucesso!');
            navigate('/localizar-usuario');
        } catch (error) {
            alert('Erro ao alterar usuário.');
        }
    };

    const handleExcluir = () => {
        if (window.confirm('Deseja realmente excluir este usuário?')) {
            navigate(`/excluir-usuario`, { state: { usuario } });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario(prevUsuario => ({
            ...prevUsuario,
            [name]: value
        }));
    };

    return (
        <div>
            <h1>Alterar Usuário</h1>
            {Object.keys(usuario).map((coluna) => (
                <div key={coluna}>
                    <label>{coluna}:</label>
                    <input 
                        type="text" 
                        name={coluna}  // Atributo name adicionado para identificar o campo
                        value={usuario[coluna] || ''} // Garante que o valor seja uma string vazia se undefined
                        onChange={handleChange} 
                    />
                </div>
            ))}
            <button onClick={handleAlterar}>Alterar Usuário</button>
            <button onClick={handleExcluir}>Excluir Usuário</button>
        </div>
    );
};

export default AlterarUsuarioPage;
